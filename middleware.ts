import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/reading'];
const AUTH_ROUTES = ['/login', '/register'];
const DEFAULT_REDIRECT_URL = '/';

const getAuthToken = (request: NextRequest) => request.cookies.get('authToken')?.value;

const isMatchingRoute = (pathname: string, routes: string[]) => {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getAuthToken(request);

  if (isMatchingRoute(pathname, PROTECTED_ROUTES)) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (isMatchingRoute(pathname, AUTH_ROUTES) && token) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_REDIRECT_URL;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...PROTECTED_ROUTES.map((p) => `${p}/:path*`), ...AUTH_ROUTES],
};
