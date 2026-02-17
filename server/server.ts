import path from "node:path";

import type { CookieSerializeOptions } from "@fastify/cookie";
import "dotenv/config";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import { renderPage, createDevMiddleware } from "vike/server";

import { CONFIG } from "./config.js";
import { directoryRoot } from "./directory-root.js";

export async function createServer(isProduction: boolean) {
  const app = fastify({
    trustProxy: true,
    logger: isProduction
      ? true
      : {
        level: "warn",
        transport: {
          target: "pino-pretty",
        },
      },
  });

  await app.register(import("@fastify/compress"), { global: true });

  await app.register(import("@fastify/early-hints"), {
    warn: true,
  });

  // Vite integration
  if (isProduction) {
    await app.register(import("@fastify/cors"), {
      origin: CONFIG.PUBLIC_HOST,
      methods: ["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"],
    });

    await app.register(import("@fastify/accepts"));

    await app.register(import("@fastify/cookie"));

    await app.register(import("@fastify/helmet"), { contentSecurityPolicy: false });

    // In production, we need to serve our static assets ourselves.
    await app.register(import("@fastify/static"), {
      root: path.join(directoryRoot, "client", "assets"),
      prefix: "/assets/",
    });

    await app.register(import("@fastify/rate-limit"), {
      max: 100,
      timeWindow: "1 minute",
    });
  } else {
    const { devMiddleware } = await createDevMiddleware({ root: directoryRoot });

    app.addHook("onRequest", async (request, reply) => {
      const next = () =>
        new Promise<void>((resolve) => {
          devMiddleware(request.raw, reply.raw, () => resolve());
        });
      await next();
    });
  }

  // API proxy for development and production
  // Proxy /strapi/* requests to the backend (Strapi admin, API, uploads)
  app.all("/strapi/*", async (request, reply) => {
    // Keep /strapi prefix - backend expects requests at /strapi/api/*
    const targetUrl = CONFIG.VITE_API_URL + request.url;

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers as HeadersInit,
        body: request.method !== "GET" && request.method !== "HEAD" ? JSON.stringify(request.body) : undefined,
      });

      const data = await response.text();

      // Forward cookies from backend
      const setCookie = response.headers.get("set-cookie");
      if (setCookie) {
        reply.header("set-cookie", setCookie);
      }

      reply.status(response.status).send(data);
    } catch (error) {
      app.log.error({ error }, "API proxy error");
      reply.status(500).send({ error: "Proxy error" });
    }
  });

  // Vike middleware. It should always be our last middleware
  app.get("*", async (request, reply) => {
    const cookies = createCookiesAccessor(request, reply);

    const pageContextInit = {
      urlOriginal: `${request.protocol}://${request.hostname}${request.url}`,
      headersOriginal: request.headers,
      cookies,
    };

    const pageContext = await renderPage(pageContextInit);

    if (pageContext.errorWhileRendering) {
      app.log.error({ errorWhileRendering: pageContext.errorWhileRendering }, "Error while rendering page");
      return reply.status(500).send("Error while rendering page");
    }

    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return reply.callNotFound();
    }

    const { statusCode, headers, earlyHints } = httpResponse;

    await reply.writeEarlyHints({ Link: earlyHints.map((hint) => hint.earlyHintLink) });

    // biome-ignore lint/suspicious/useIterableCallbackReturn: <explanation>
    headers.forEach(([name, value]) => reply.header(name, value));

    reply.status(statusCode).send(httpResponse.body);

    return reply;
  });

  return app;
}

function createCookiesAccessor(request: FastifyRequest, reply: FastifyReply) {
  console.log("[createCookiesAccessor] request.cookies:", request.cookies);
  return {
    get(name: string): string | undefined {
      const value = request.cookies[name];
      console.log(`[cookies.get] ${name} =`, value);
      return value;
    },
    set(name: string, value: string, options: CookieSerializeOptions) {
      reply.setCookie(name, value, options);
    },
    remove(name: string, options: CookieSerializeOptions) {
      reply.clearCookie(name, options);
    },
  };
}
