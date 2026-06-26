import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePrefixes = ['/dashboard', '/admin', '/patient', '/me', '/clinical-anamnesis', '/onboarding', '/portal'];
export function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get('ph_session')?.value);
  const pathname = request.nextUrl.pathname;
  const isPrivate = privatePrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  if (isPrivate && !hasSession) return NextResponse.redirect(new URL('/login', request.url));
  if (pathname.startsWith('/login') && hasSession) return NextResponse.redirect(new URL('/dashboard', request.url));
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
