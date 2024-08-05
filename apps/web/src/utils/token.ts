import { deleteCookie } from "cookies-next";

export function deleteClientTokens() {
  deleteCookie("access_token", {
    sameSite: "strict",
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  });
  deleteCookie("refresh_token", {
    sameSite: "strict",
    secure: true,
    domain: process.env.COOKIE_DOMAIN,
  });
}
