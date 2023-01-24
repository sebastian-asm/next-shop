import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!session) {
    // obteniendo la página que estaba solicitando el usuario
    const requestedPage = req.nextUrl.pathname
    const url = req.nextUrl.clone()
    url.pathname = `/auth/login`
    url.search = `page=${requestedPage}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

// middleware se aplica a las páginas especificadas
export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
}
