import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Order details endpoint - coming soon' })
}

export async function PUT() {
  return NextResponse.json({ message: 'Update order endpoint - coming soon' })
}

export async function DELETE() {
  return NextResponse.json({ message: 'Delete order endpoint - coming soon' })
}