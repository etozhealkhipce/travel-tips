// Cookie utilities for SSR-compatible storage
const COOKIE_PREFIX = "TT-SSKD-";

export const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${COOKIE_PREFIX}${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookieName = `${COOKIE_PREFIX}${name}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(cookieName)) {
      return decodeURIComponent(cookie.substring(cookieName.length));
    }
  }

  return null;
};

export const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_PREFIX}${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};
