import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });
  if (!token) {
    return NextResponse.redirect(new URL('/error/loginRequired', request.url));
  }
  if (token.role !== 'student') {
    return NextResponse.redirect(new URL('/error/studentOnly', request.url));
  }
  console.log({ user: token.email, role: token.role, url: request.url });
}
