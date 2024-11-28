import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// Middleware 처리
export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  })
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}

// 핸들러 정의
export const handlers = {
  GET: async (req: NextRequest) => {
    // GET 요청 처리 로직
    return NextResponse.json({ message: 'GET request to /auth' })
  },
  POST: async (req: NextRequest) => {
    // POST 요청 처리 로직
    return NextResponse.json({ message: 'POST request to /auth' })
  },
}

export const config = {
  matcher: ['/auth/:path*'],
}
