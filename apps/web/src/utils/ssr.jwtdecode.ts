import { TUser } from "@/models/user.model";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getAccTokenServer(): Promise<TUser> {
  const token = cookies();
  return jwtDecode(token.get("access_token")?.value || "");
}
