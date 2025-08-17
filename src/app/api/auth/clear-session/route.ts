import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Session cleared' })
  
  // Clear all NextAuth cookies
  response.cookies.delete('next-auth.session-token')
  response.cookies.delete('__Secure-next-auth.session-token')
  response.cookies.delete('next-auth.csrf-token')
  response.cookies.delete('__Host-next-auth.csrf-token')
  response.cookies.delete('next-auth.callback-url')
  response.cookies.delete('__Secure-next-auth.callback-url')
  
  return response
}
