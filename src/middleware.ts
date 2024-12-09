import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  apiSearchPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("path: ", nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isSearchRoute = nextUrl.pathname.startsWith(apiSearchPrefix);

  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/products") ||
    nextUrl.pathname.startsWith("/cart") ||
    nextUrl.pathname.startsWith("/category");
  const isauthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute || isSearchRoute) {
    return;
  }
  if (isauthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isPublicRoute) {
    return;
  }

  if (!isLoggedIn && !publicRoutes.includes(nextUrl.pathname)) {
    const callbackURL = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${callbackURL}`, nextUrl)
    );
  }

  return;
});
// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
