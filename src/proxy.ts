import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/userdata(.*)",
  "/admin(.*)",
  "/cart(.*)",
  "/create-custompiece(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Set pathname header
  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  const response = NextResponse.next({ request: { headers } });

  // Protect all specified routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Check role for admin routes
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    const userRole = (sessionClaims?.metadata as { role?: string })?.role;

    if (userRole !== "admin" && userRole !== "moderator") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
