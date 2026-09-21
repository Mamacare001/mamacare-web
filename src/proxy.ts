import { auth } from "@/auth";

/** Next.js 16 "proxy" (formerly middleware): protects /dashboard via Auth.js `authorized` callback. */
export default auth;

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/family/:path*", "/chw/:path*", "/supervisor/:path*", "/clinic/:path*", "/insights/:path*", "/care/:path*", "/portal/:path*"],
};
