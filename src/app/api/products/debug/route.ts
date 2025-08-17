import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Products debug endpoint - coming soon' })
}