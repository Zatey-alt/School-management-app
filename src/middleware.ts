import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log("Route matchers:", matchers);

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();

  // Log session claims for debugging
  console.log("Session claims:", sessionClaims);

  // Extract role from user_public_metadata
  const role = sessionClaims?.user_public_metadata?.role;

  if (!role) {
    console.warn(
      "Role is missing or undefined. Please ensure it is properly configured in Clerk."
    );
  }

  console.log("User role:", role);

  // Access control logic
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && (!role || !allowedRoles.includes(role))) {
      console.warn(`Access denied for role: ${role} on route: ${req.url}`);
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to an error page
    }
  }
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
