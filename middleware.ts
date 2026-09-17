import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROUTES = ["/admin/dashboard", "/admin/courses", "/admin/testimonials", "/admin/posts", "/admin/faqs", "/admin/settings"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminProtected = ADMIN_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isAdminLogin = pathname === "/admin/login";

  if (isAdminProtected || isAdminLogin) {
    const token = req.cookies.get("ntg_admin_token")?.value;
    let valid = false;
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.ADMIN_JWT_SECRET || "dev-secret"
        );
        await jwtVerify(token, secret);
        valid = true;
      } catch {
        valid = false;
      }
    }

    if (isAdminProtected && !valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (isAdminLogin && valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
