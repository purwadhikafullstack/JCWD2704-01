import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const NEXT_PUBLIC_BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

export const cookiesOpt: Partial<ResponseCookie> = {
  sameSite: "strict",
  secure: true,
  domain: ".purwadhikabootcamp.com",
};
