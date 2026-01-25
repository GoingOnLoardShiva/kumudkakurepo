// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const token = request.cookies.get("admin_token")?.value;
//   const { pathname } = request.nextUrl;

//   // 1. Define public paths (don't redirect these)
//   if (pathname === '/login' || pathname.startsWith('/_next') || pathname === '/favicon.ico') {
//     return NextResponse.next();
//   }

//   // 2. If no token, redirect to login
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // 3. (Optional) You can't easily run verifyToken here if it uses Node-only libraries 
//   // like 'crypto' or 'jsonwebtoken'. Most people check for the cookie's existence 
//   // in middleware and verify the contents in the Page component.

//   return NextResponse.next();
// }

// // Ensure this only runs on your admin routes to save performance
// export const config = {
//   matcher: ['/admin/:path*', '/dashboard/:path*'],
// };