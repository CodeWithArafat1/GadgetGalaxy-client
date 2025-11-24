// middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/products/:path*", "/dashboard/:path*", "/profile"],
};
