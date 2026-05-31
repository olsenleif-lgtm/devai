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
  const pathname = request.nextUrl?.pathname || new URL(request.url).pathname;
  const isNextInternal = pathname.startsWith("/_next");

  if (!isPublicRoute(request) && !isNextInternal) {
    await auth.protect();
  }
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
