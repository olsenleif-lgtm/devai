import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
    ? `${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}(.*)`
    : "/sign-in(.*)",
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL
    ? `${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}(.*)`
    : "/sign-up(.*)",
]);

export const proxy = clerkMiddleware(async (auth, request) => {
  // Allow Next's internal RSC/data fetches to proceed so RSC payload
  // requests are not interrupted by auth redirects. These fetches
  // use the Accept header `text/x-component`.
  const accept = request.headers.get("accept") || "";
  const isRscFetch = accept.includes("text/x-component");

  // Also allow Next's internal data requests or static asset requests
  // to proceed (e.g. requests with `x-nextjs-data` header or paths
  // under `/_next`) so navigation/data prefetches are not blocked.
  const hasNextDataHeader = Boolean(request.headers.get("x-nextjs-data"));
  const pathname = request.nextUrl?.pathname || new URL(request.url).pathname;
  const isNextInternal = pathname.startsWith("/_next") || pathname.startsWith("/_next/data");

  if (!isPublicRoute(request) && !(isRscFetch || hasNextDataHeader || isNextInternal)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
