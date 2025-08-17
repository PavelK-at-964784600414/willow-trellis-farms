import { Navigation } from '@/components/Navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#D9D7D3'}}>
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{backgroundColor: '#D9D7D3', color: '#000000'}}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <div className="mb-8">
                <Image
                  src="/Joey2.png"
                  alt="Willow Trellis Farms Logo"
                  width={200}
                  height={200}
                  className="mx-auto mb-4 rounded-full shadow-lg"
                  priority
                />
                <span className="text-6xl md:text-8xl">🌿</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-rustic font-bold mb-6" style={{color: '#000000'}}>
                Farm Fresh to Your Table
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{color: '#000000'}}>
                Hand-picked produce from our local farm. Order online, pickup fresh. 
                Supporting our community with the finest fruits and vegetables grown with care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="inline-block bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-700 transition-colors shadow-lg transform hover:scale-105"
                >
                  🥕 Browse Fresh Produce
                </Link>
                <Link
                  href="#about"
                  className="inline-block border-2 border-gray-400 text-light-text font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white hover:text-light-text transition-colors" style={{color: '#000000'}}
                >
                  Learn About Our Farm
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Info Banner */}
        <div className="bg-light-bg border-y-4 border-gray-300" style={{backgroundColor: '#D9D7D3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h3 className="text-2xl font-rustic font-bold text-light-text mb-2" style={{color: '#000000'}}>
                🚜 Farm Pickup Only - No Delivery
              </h3>
              <p className="text-light-text text-lg" style={{color: '#000000'}}>
                Visit our farm stand to collect your fresh produce order. Open Tuesday-Sunday, 8AM-6PM
              </p>
              <p className="text-light-text mt-2" style={{color: '#000000'}}>
                📍 <strong>Location:</strong> 3013 Upper Otterson, Ottawa, ON • <strong>Phone:</strong> (613) 581-9303
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-light-bg" style={{backgroundColor: '#D9D7D3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="about">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-rustic font-bold text-light-text mb-6" style={{color: '#000000'}}>
                Why Choose Willow Trellis Farms?
              </h2>
              <p className="text-xl text-light-text max-w-3xl mx-auto" style={{color: '#000000'}}>
                A farming expert bringing you the freshest, most flavorful produce 
                grown with sustainable practices and genuine care.
              </p>
            </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-2xl font-rustic font-bold mb-4 text-light-text" style={{color: '#000000'}}>Grown with Love</h3>
              <p className="text-light-text leading-relaxed" style={{color: '#000000'}}>
                Every plant is tended with care using sustainable, organic practices. 
                No harmful chemicals, just pure farm goodness.
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🚜</span>
              </div>
              <h3 className="text-2xl font-rustic font-bold mb-4 text-light-text" style={{color: '#000000'}}>Farm Fresh Pickup</h3>
              <p className="text-light-text leading-relaxed" style={{color: '#000000'}}>
                Skip the delivery fees and experience our farm firsthand. 
                Pick up your order and see where your food comes from.
              </p>
            </div>

            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-2xl font-rustic font-bold mb-4 text-light-text" style={{color: '#000000'}}>Community Focused</h3>
              <p className="text-light-text leading-relaxed" style={{color: '#000000'}}>
                Supporting local families with affordable, nutritious produce 
                while building lasting relationships in our community.
              </p>
            </div>
          </div>
        </div>
        </div>

        {/* Seasonal Highlights */}
        <div className="bg-light-bg border-y-4 border-gray-200" style={{backgroundColor: '#D9D7D3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-rustic font-bold text-light-text mb-4" style={{color: '#000000'}}>
                🍂 What&apos;s Fresh This Season
              </h2>
              <p className="text-lg text-light-text" style={{color: '#000000'}}>
                Our seasonal selection changes with nature&apos;s rhythm
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['🥕 Carrots', '🥬 Lettuce', '🍅 Tomatoes', '🌽 Sweet Corn', '🥒 Cucumbers', '🫑 Peppers', '🥔 Potatoes', '🧅 Onions'].map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md border border-gray-200">
                  <span className="text-2xl font-rustic font-semibold text-light-text" style={{color: '#000000'}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seeds Section */}
        <div className="bg-light-bg" style={{backgroundColor: '#D9D7D3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-rustic font-bold text-light-text mb-6" style={{color: '#000000'}}>
                  🌱 Grow Your Own Garden
                </h2>
                <p className="text-xl text-light-text mb-6 leading-relaxed" style={{color: '#000000'}}>
                  Start your own farm at home with our premium heirloom seeds. 
                  Hand-selected varieties that thrive in our local climate.
                </p>
                <ul className="text-light-text space-y-3 mb-8" style={{color: '#000000'}}>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    Heirloom & organic varieties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    High germination rates
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    Growing guides included
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-3">✓</span>
                    Perfect for Ontario gardens
                  </li>
                </ul>
                <Link
                  href="/seeds"
                  className="inline-block bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-green-700 transition-colors shadow-lg transform hover:scale-105"
                >
                  🌱 Browse Seeds Collection
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {['🌾 Herbs', '🥕 Vegetables', '🌻 Flowers', '🍅 Tomatoes'].map((seed, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{seed.split(' ')[0]}</span>
                    </div>
                    <h4 className="font-rustic font-bold text-lg text-light-text" style={{color: '#000000'}}>
                      {seed.split(' ')[1]} Seeds
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-light-bg" style={{backgroundColor: '#D9D7D3'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-4xl font-rustic font-bold text-light-text mb-6" style={{color: '#000000'}}>
              Ready to Taste the Difference?
            </h2>
            <p className="text-xl text-light-text mb-10 max-w-2xl mx-auto" style={{color: '#000000'}}>
              Join our farm family and discover what truly fresh produce tastes like. 
              Order online, pickup at the farm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-block bg-green-600 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-green-700 transition-colors shadow-lg transform hover:scale-105"
              >
                🌾 Join Our Farm Family
              </Link>
              <Link
                href="/products"
                className="inline-block border-2 border-green-600 text-green-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-green-600 hover:text-white transition-colors"
              >
                🛒 Shop Fresh Produce
              </Link>
              <Link
                href="/seeds"
                className="inline-block border-2 border-green-500 text-green-500 font-bold px-10 py-4 rounded-xl text-lg hover:bg-green-500 hover:text-white transition-colors"
              >
                🌱 Browse Seeds
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <span className="text-2xl">🌿</span>
                <span className="text-xl font-rustic font-bold">Willow Trellis Farms</span>
              </div>
              <p className="text-gray-300">
                Bringing you the freshest produce with love and care.
              </p>
            </div>
            <div>
              <h4 className="font-rustic font-bold text-lg mb-4">Farm Hours</h4>
              <p className="text-gray-300">Tuesday - Sunday</p>
              <p className="text-gray-300">8:00 AM - 6:00 PM</p>
              <p className="text-gray-300 mt-2">Closed Mondays</p>
            </div>
            <div>
              <h4 className="font-rustic font-bold text-lg mb-4">Contact Us</h4>
              <p className="text-gray-300">📍 3013 Upper Otterson</p>
              <p className="text-gray-300">Ottawa, ON</p>
              <p className="text-gray-300">📞 (613) 581-9303</p>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Willow Trellis Farms. Grown with love, served with pride.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
