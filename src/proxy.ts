import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/userdata(.*)",
  "/admin(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all specified routes (requires authentication)
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Check role for admin routes
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    const userRole = (sessionClaims?.metadata as { role?: string })?.role;

    // Redirect non-admin users away from admin routes
    if (userRole !== "admin" && userRole !== "moderator") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
