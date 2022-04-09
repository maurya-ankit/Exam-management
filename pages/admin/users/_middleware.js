import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });
  if (!token) {
    return NextResponse.redirect(new URL('/error/loginRequired', request.url));
  }
  if (token.role !== 'admin') {
    return NextResponse.rewrite(new URL('/error/onlyAdmin', request.url));
  }
  console.log({ user: token.email, role: token.role, url: request.url });
}
