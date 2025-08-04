import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow access to public routes
        if (pathname.startsWith('/auth') || pathname === '/' || pathname.startsWith('/products')) {
          return true
        }
        
        // Require authentication for protected routes
        if (pathname.startsWith('/cart') || pathname.startsWith('/checkout') || pathname.startsWith('/orders')) {
          return !!token
        }
        
        // Require admin role for admin routes
        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }
        
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/admin/:path*',
  ]
}
