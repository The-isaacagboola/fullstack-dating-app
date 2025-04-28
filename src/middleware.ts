/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authRoutes, publicRoutes } from "./routes";

const secret = process.env.AUTH_SECRET;

export async function middleware(req: any) {
  const token = await getToken({ req, secret });
  const { nextUrl } = req;

  const isLoggedIn = !!token;

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
