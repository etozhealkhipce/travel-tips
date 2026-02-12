export const CONFIG = {
  get NODE_ENV() {
    return globalThis.process.env.NODE_ENV;
  },

  get SERVER_PORT() {
    return Number.parseInt(globalThis.process.env.SERVER_PORT ?? "3000", 10);
  },

  get PUBLIC_HOST() {
    return globalThis.process.env.PUBLIC_HOST ?? `http://localhost:${CONFIG.SERVER_PORT}`;
  },

  get VITE_API_URL() {
    return globalThis.process.env.VITE_API_URL ?? "http://localhost:8080";
  },
};
