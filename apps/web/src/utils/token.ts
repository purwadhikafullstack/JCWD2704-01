import { deleteCookie } from "cookies-next";

export function deleteClientTokens() {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
}
