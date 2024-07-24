import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./utils/action/user.middleware";
import { searchParams } from "./models/search.params";

const requiredLogin = ["/account/setting"];
const adminBaseRoute = "/dashboard/admin";
const adminRoutes = [`${adminBaseRoute}/users`, `${adminBaseRoute}/products`, `${adminBaseRoute}/categories`];

export async function middleware(request: NextRequest) {
  try {
    console.log("hello");

    const refresh_token = request.cookies.get("refresh_token")?.value || "";
    const access_token = request.cookies.get("access_token")?.value || "";
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();
    const user = await getUserSession(response, refresh_token);

    const isRequiredLogin = requiredLogin.includes(pathname);

    if (isRequiredLogin && !user) return NextResponse.redirect(new URL("/", request.url));
    if (!user && pathname.includes("login")) return response;

    if (!user || (user?.role === "customer" && pathname.startsWith("/dashboard"))) return NextResponse.redirect(new URL("/", request.url));

    return response;
  } catch (error) {
    console.log("ini error guys");
    console.log(request.url);

    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config: MiddlewareConfig = {
  matcher: ["/dashboard/admin/:path*"],
};
