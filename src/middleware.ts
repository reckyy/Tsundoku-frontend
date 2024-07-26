export { auth as middleware } from '@/auth';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth|$|terms|privacy|api/auth/callback/google|users/\\d+).*)',
  ],
};
