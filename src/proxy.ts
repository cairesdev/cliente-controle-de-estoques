import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/constants/auth.config";
import NextAuth, { Session } from "next-auth";

const { auth } = NextAuth(authConfig);

interface AuthenticatedRequest extends NextRequest {
  auth: Session | null;
}

export default auth((req: AuthenticatedRequest) => {
  const isLoggedIn = !!req.auth;

  if (!req.nextUrl.pathname.startsWith("/log-in") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
