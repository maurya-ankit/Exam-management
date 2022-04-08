import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
    const token = await getToken({ req, secret })
    if(!token) {
        return NextResponse.redirect(new URL('/error/loginRequired', req.url))
    }
    if(token.role!=='student') {
        return NextResponse.redirect(new URL('/error/studentOnly', req.url))
    }
    console.log({user: token.email, role: token.role, url: req.url})
}