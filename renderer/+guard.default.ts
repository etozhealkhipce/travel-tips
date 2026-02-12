import cookie from "cookie"
import { redirect } from "vike/abort";
import type { GuardAsync } from "vike/types";
import { getCookie } from "~/shared/lib/cookies";

// Guard для защищенной страницы /example
export const guard: GuardAsync = async (pageContext) => {
  // let hasToken = false;
  // // Check for token in cookies
  // const isClient = (pageContext as { isClientSide?: boolean }).isClientSide;

  // if (isClient) {
  //   // Client-side: use document.cookie
  //   const token = getCookie("token");
  //   hasToken = !!token && token.length > 0;
  // } else {
  //   // Server-side: use pageContext.cookies from Fastify
  //   const cookieHeader = pageContext.headers?.cookie || ''
  //   const cookies = cookie.parse(cookieHeader)

  //   if (cookies) {
  //     const token = cookies["TT-SSKD-token"]
  //     hasToken = !!token && token.length > 0;
  //   }
  // }

  // // Redirect to login if not authenticated
  // if (!hasToken) {
  //   throw redirect("/login");
  // }
};
