import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./utils/action/user.middleware";

const requiredLogin = ["/account/setting"];

export async function middleware(request: NextRequest) {
  const refresh_token = request.cookies.get("refresh_token")?.value || "";
  const access_token = request.cookies.get("access_token")?.value || "";
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const user = await getUserSession(response, refresh_token);
  const isRequiredLogin = requiredLogin.includes(pathname);

  if (isRequiredLogin && !user) return NextResponse.redirect(new URL("/", request.url));

  return response;
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
