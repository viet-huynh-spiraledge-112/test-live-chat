import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle trailing slash for POST requests to API routes
  // Rewrite preserves method and body automatically
  if (
    request.method === 'POST' &&
    pathname.startsWith('/api/widget/') &&
    pathname.endsWith('/') &&
    pathname !== '/api/widget/'
  ) {
    // Remove trailing slash and rewrite (preserves POST method and body)
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/widget/:path*',
};
