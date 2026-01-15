import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle trailing slash for POST requests to API routes
  // This prevents Next.js from redirecting POST to GET
  if (
    request.method === 'POST' &&
    pathname.startsWith('/api/') &&
    pathname.endsWith('/') &&
    pathname !== '/api/'
  ) {
    // Remove trailing slash and redirect, but preserve POST method
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    
    // Create a new request with the same method and body
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
