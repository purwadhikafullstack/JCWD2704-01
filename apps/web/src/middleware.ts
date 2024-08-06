import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getUserSession } from "./utils/action/user.middleware";
import { Role } from "./models/user.model";
import { searchParams } from "./models/search.params";

const requiredLogin = ["/account/setting", "/account/address", "/account/cart"];
const adminBaseRoute = "/dashboard/admin";
const adminRoutes = [
  `${adminBaseRoute}/users`,
  `${adminBaseRoute}/products`,
  `${adminBaseRoute}/categories`,
  `${adminBaseRoute}/inventories`,
  `${adminBaseRoute}/promotions`,
  `${adminBaseRoute}/reports`,
  `${adminBaseRoute}/stores`,
  `${adminBaseRoute}/orders`,
];

export async function middleware(request: NextRequest) {
  try {
    const refresh_token = request.cookies.get("refresh_token")?.value || "";
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();
    const user = await getUserSession(response, refresh_token);
    const isRequiredLogin = requiredLogin.includes(pathname);
    const isRequiredAdminLogin = adminRoutes.includes(pathname);

    // TODO: User protection routes
    if (user && pathname.startsWith("/auth")) return NextResponse.redirect(new URL("/", request.url));
    if (user && !user?.addresses.length && pathname.startsWith("/cart"))
      return NextResponse.redirect(new URL("/account/address", request.url));
    if (!user && isRequiredLogin) return NextResponse.redirect(new URL("/auth", request.url));

    // Super & Store admin protection routes
    if (user?.role === Role.customer && isRequiredAdminLogin) return NextResponse.redirect(new URL("/", request.url));
    if (!user && isRequiredAdminLogin) return NextResponse.redirect(new URL("/dashboard/admin/login", request.url));
    if (!user && pathname.includes("login")) return response;
    if (user?.role === "store_admin" && pathname.endsWith("login"))
      return NextResponse.redirect(new URL("/dashboard/admin/products" + searchParams, request.url));
    if (user?.role === "store_admin" && (pathname.endsWith("users") || pathname.endsWith("stores")))
      return NextResponse.redirect(new URL("/dashboard/admin/products" + searchParams, request.url));
    if (user?.role === "super_admin" && pathname.endsWith("login"))
      return NextResponse.redirect(new URL("/dashboard/admin/users" + searchParams, request.url));

    return response;
  } catch (error) {
    console.log(error);
    // return NextResponse.redirect(new URL("/", request.url)s);
  }
}

export const config: MiddlewareConfig = {
  matcher: ["/dashboard/admin/:path*", "/auth:path*", "/account/:path*", "/categories/:path*", "/product/:path*"],
};
