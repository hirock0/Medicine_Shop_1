import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token: any = await getToken({ req: request });

  const customToken: any = (await request.cookies.get("token")?.value) || "";
  const customTokendecoded: any = Jwt.decode(customToken);

  const url = request.nextUrl;
  if (
    (token || customToken) &&
    (url.pathname.startsWith("/user/login") ||
      url.pathname.startsWith("/user/signup"))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (
    (token?.email || customTokendecoded?.email) !== "hirockdutta0@gmail.com" &&
    url.pathname.startsWith("/admin")
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  if (
    (!token || !customToken) &&
    (url.pathname.startsWith("/user/profile") ||
      url.pathname.startsWith("/user/informations"))
  ) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/user/login/:path*",
    "/user/signup/:path*",
    "/admin/:path*",
    "/user/profile/:path*",
    "/user/informations/:path*",
  ],
};
