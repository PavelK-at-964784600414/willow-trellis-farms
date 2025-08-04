import { NextRequest, NextResponse } from 'next/server'
import { getProductsFromSheet } from '@/lib/google-sheets'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get products from Google Sheets
    const sheetProducts = await getProductsFromSheet()
    
    // Sync with database
    for (const product of sheetProducts) {
      const existingProduct = await prisma.product.findFirst({
        where: { name: product.name }
      })

      if (existingProduct) {
        await prisma.product.update({
          where: { id: existingProduct.id },
          data: {
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            description: product.description,
          }
        })
      } else {
        await prisma.product.create({
          data: {
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: product.quantity,
            category: product.category,
            description: product.description,
          }
        })
      }
    }

    // Get all products from database
    const products = await prisma.product.findMany({
      where: {
        quantity: {
          gt: 0
        }
      },
      orderBy: {
        category: 'asc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
