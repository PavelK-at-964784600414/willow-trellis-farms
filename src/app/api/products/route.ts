import { NextRequest, NextResponse } from 'next/server'
import { getProductsFromSheet } from '@/lib/google-sheets'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get products from Google Sheets
    const sheetProducts = await getProductsFromSheet()
    
    // Get current sheet product names for comparison
    const sheetProductNames = new Set(sheetProducts.map(p => p.name))
    
    // Get all existing products from database
    const existingProducts = await prisma.product.findMany()
    
    // Handle products that are no longer in the sheet
    const productsToUpdate = existingProducts.filter(dbProduct => 
      !sheetProductNames.has(dbProduct.name)
    )
    
    if (productsToUpdate.length > 0) {
      // Debug logging removed for production
      
      // Set quantity to 0 instead of deleting to preserve order history
      await prisma.product.updateMany({
        where: {
          id: {
            in: productsToUpdate.map(p => p.id)
          }
        },
        data: {
          quantity: 0
        }
      })
    }
    
    // Sync with database (add/update products from sheet)
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
        // Debug logging removed for production
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
