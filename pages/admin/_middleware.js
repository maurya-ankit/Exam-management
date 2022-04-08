import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
  const token = await getToken({ req: request, secret });
  if (!token) {
    console.log(new URL('/error/loginRequired', request.url));
    return NextResponse.redirect(new URL('/error/loginRequired', request.url));
  }
  if (!(token.role === 'faculty' || token.role === 'admin')) {
    console.log(new URL('/error/adminAndFaculty', request.url));
    return NextResponse.redirect(
      new URL('/error/adminAndFaculty', request.url)
    );
  }
  console.log({ user: token.email, role: token.role, url: request.url });
}
