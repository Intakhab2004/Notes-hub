import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"


export const middleware = async(request: NextRequest) => {
    const token = await getToken({req: request});

    const path = request.nextUrl.pathname;
    const isPublicPath = (path === "/sign-up") || (path === "/sign-in") || path.startsWith("/verify");

    if(token && isPublicPath){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if(!token && !isPublicPath){
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/sign-up",
        "/sign-in",
        "/verify/:path*",
        "/dashboard"
    ]
}