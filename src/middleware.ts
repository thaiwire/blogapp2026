import { NextResponse, NextRequest } from "next/server";
import { startsWith } from "zod";

export function middleware(request: NextRequest) {
  try {
    //
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("user_token")?.value;

    // If no token is found and the user is trying to access a protected route, redirect to login
    if (!token && pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // If a token is found and the user is trying to access the login page, redirect to home
    if (token && !pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
