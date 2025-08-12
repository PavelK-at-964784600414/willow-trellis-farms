import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Require authentication for checkout and orders
        if (pathname.startsWith('/checkout') || pathname.startsWith('/orders')) {
          return !!token
        }
        
        // For all other matched routes, allow access
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/checkout/:path*',
    '/orders/:path*',
  ]
}
