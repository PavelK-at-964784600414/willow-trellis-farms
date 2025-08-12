'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
  category: string
  description?: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addItem } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(products.map(product => product.category))]
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    })
    showToast(`🛒 ${product.name} added to cart!`, 'success')
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#D9D7D3'}}>
        <Navigation />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-green-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#D9D7D3'}}>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#D9D7D3'}}>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{color: '#000000'}}>Fresh Produce</h1>
          <p className="text-lg" style={{color: '#000000'}}>
            Handpicked fruits and vegetables
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-farm-green-600 text-white shadow-md'
                    : 'bg-white hover:bg-farm-green-100 border border-farm-green-300'
                }`}
                style={selectedCategory !== category ? {color: '#000000'} : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all">
              <div className="relative h-48">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1" style={{color: '#000000'}}>
                  {product.name}
                </h3>
                
                {product.description && (
                  <p className="text-sm mb-2" style={{color: '#000000'}}>
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold bg-gray-200 px-2 py-1 rounded" style={{color: '#000000'}}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium" style={{color: '#000000'}}>
                    {product.quantity} in stock
                  </span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity === 0}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 active:bg-green-800 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {product.quantity === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{color: '#000000'}}>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
