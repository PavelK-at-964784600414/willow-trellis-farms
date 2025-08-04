import { Navigation } from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-farm-cream-50">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-farm-green-600 via-farm-green-700 to-farm-sage-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <div className="mb-6">
                <span className="text-6xl md:text-8xl">🌿</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-rustic font-bold mb-6 text-farm-cream-100">
                Farm Fresh to Your Table
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-farm-cream-200 max-w-3xl mx-auto leading-relaxed">
                Hand-picked produce from our local farm. Order online, pickup fresh. 
                Supporting our community with the finest fruits and vegetables grown with care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="inline-block bg-farm-cream-500 text-farm-green-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-farm-cream-400 transition-colors shadow-lg transform hover:scale-105"
                >
                  🥕 Browse Fresh Produce
                </Link>
                <Link
                  href="#about"
                  className="inline-block border-2 border-farm-cream-200 text-farm-cream-100 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-farm-cream-200 hover:text-farm-green-800 transition-colors"
                >
                  Learn About Our Farm
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Info Banner */}
        <div className="bg-farm-brown-100 border-y-4 border-farm-brown-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h3 className="text-2xl font-rustic font-bold text-farm-brown-800 mb-2">
                🚜 Farm Pickup Only - No Delivery
              </h3>
              <p className="text-farm-brown-700 text-lg">
                Visit our farm stand to collect your fresh produce order. Open Tuesday-Sunday, 8AM-6PM
              </p>
              <p className="text-farm-brown-600 mt-2">
                📍 <strong>Location:</strong> 1234 Willow Lane, Farmville Valley • <strong>Phone:</strong> (555) 123-FARM
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="about">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-rustic font-bold text-farm-green-800 mb-6">
              Why Choose Willow Trellis Farms?
            </h2>
            <p className="text-xl text-farm-sage-700 max-w-3xl mx-auto">
              Three generations of farming expertise bringing you the freshest, most flavorful produce 
              grown with sustainable practices and genuine care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-farm-green-200 hover:shadow-xl transition-shadow">
              <div className="bg-farm-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-2xl font-rustic font-bold mb-4 text-farm-green-800">Grown with Love</h3>
              <p className="text-farm-sage-700 leading-relaxed">
                Every plant is tended with care using sustainable, organic practices. 
                No harmful chemicals, just pure farm goodness.
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-farm-green-200 hover:shadow-xl transition-shadow">
              <div className="bg-farm-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">�</span>
              </div>
              <h3 className="text-2xl font-rustic font-bold mb-4 text-farm-green-800">Farm Fresh Pickup</h3>
              <p className="text-farm-sage-700 leading-relaxed">
                Skip the delivery fees and experience our farm firsthand. 
                Pick up your order and see where your food comes from.
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-farm-green-200 hover:shadow-xl transition-shadow">
              <div className="bg-farm-cream-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-rustic font-bold mb-4 text-farm-green-800">Community Focused</h3>
              <p className="text-farm-sage-700 leading-relaxed">
                Supporting local families with affordable, nutritious produce 
                while building lasting relationships in our community.
              </p>
            </div>
          </div>
        </div>

        {/* Seasonal Highlights */}
        <div className="bg-farm-sage-50 border-y-4 border-farm-sage-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-rustic font-bold text-farm-sage-800 mb-4">
                🍂 What's Fresh This Season
              </h2>
              <p className="text-lg text-farm-sage-700">
                Our seasonal selection changes with nature's rhythm
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['🥕 Carrots', '🥬 Lettuce', '🍅 Tomatoes', '🌽 Sweet Corn', '🥒 Cucumbers', '🫑 Peppers', '🥔 Potatoes', '🧅 Onions'].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md border border-farm-sage-200">
                  <span className="text-2xl font-rustic font-semibold text-farm-sage-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-farm-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-4xl font-rustic font-bold text-farm-green-800 mb-6">
              Ready to Taste the Difference?
            </h2>
            <p className="text-xl text-farm-sage-700 mb-10 max-w-2xl mx-auto">
              Join our farm family and discover what truly fresh produce tastes like. 
              Order online, pickup at the farm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-block bg-farm-green-600 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-farm-green-700 transition-colors shadow-lg transform hover:scale-105"
              >
                🌾 Join Our Farm Family
              </Link>
              <Link
                href="/products"
                className="inline-block border-2 border-farm-green-600 text-farm-green-700 font-bold px-10 py-4 rounded-xl text-lg hover:bg-farm-green-600 hover:text-white transition-colors"
              >
                🛒 Shop Fresh Produce
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-farm-brown-800 text-farm-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <span className="text-2xl">🌿</span>
                <span className="text-xl font-rustic font-bold">Willow Trellis Farms</span>
              </div>
              <p className="text-farm-cream-200">
                Three generations of farming excellence, bringing you the freshest produce with love and care.
              </p>
            </div>
            <div>
              <h4 className="font-rustic font-bold text-lg mb-4">Farm Hours</h4>
              <p className="text-farm-cream-200">Tuesday - Sunday</p>
              <p className="text-farm-cream-200">8:00 AM - 6:00 PM</p>
              <p className="text-farm-cream-200 mt-2">Closed Mondays</p>
            </div>
            <div>
              <h4 className="font-rustic font-bold text-lg mb-4">Contact Us</h4>
              <p className="text-farm-cream-200">📍 1234 Willow Lane</p>
              <p className="text-farm-cream-200">Farmville Valley</p>
              <p className="text-farm-cream-200">📞 (555) 123-FARM</p>
            </div>
          </div>
          <div className="border-t border-farm-brown-600 mt-8 pt-8 text-center">
            <p className="text-farm-cream-300">&copy; 2025 Willow Trellis Farms. Grown with love, served with pride.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
