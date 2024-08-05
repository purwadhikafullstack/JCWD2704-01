import { COOKIE_DOMAIN, cookiesOpt } from "@/config/config";
import { deleteCookie } from "cookies-next";

export function deleteClientTokens() {
  deleteCookie("access_token", {
    sameSite: "strict",
    secure: true,
    domain: COOKIE_DOMAIN,
  }),
    deleteCookie("refresh_token", {
      domain: COOKIE_DOMAIN,
      sameSite: "strict",
      secure: true,
    });
}
