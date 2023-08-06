import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    !request.cookies.has("access_token") &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/favicon")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    return NextResponse.redirect(url);
  }
}
