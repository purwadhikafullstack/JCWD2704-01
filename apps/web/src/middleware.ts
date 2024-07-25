import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./utils/action/user.middleware";

const requiredLogin = ["/account/setting", "/account/address", "/account/address/detail"];

export async function middleware(request: NextRequest) {
  const refresh_token = request.cookies.get("refresh_token")?.value || "";
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const user = await getUserSession(response, refresh_token);
  const isRequiredLogin = requiredLogin.includes(pathname);

  if (isRequiredLogin && !user) return NextResponse.redirect(new URL("/auth", request.url));
  if (isRequiredLogin && user?.role !== "customer") return NextResponse.redirect(new URL("/", request.url));

  return response;
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
