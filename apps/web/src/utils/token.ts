import { cookiesOpt } from "@/config/config";
import { deleteCookie } from "cookies-next";

export function deleteClientTokens() {
  deleteCookie("access_token", {
    domain: ".purwadhikabootcamp.com",
    sameSite: "strict",
    secure: true,
  });
  deleteCookie("refresh_token", {
    domain: ".purwadhikabootcamp.com",
    sameSite: "strict",
    secure: true,
  });
}
