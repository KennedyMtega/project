import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MapPin, MessageCircle, Package, User as UserIcon, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Product, User } from './types';

// Mock data - replace with Supabase data in production
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Fresh Organic Vegetables',
    description: 'Locally sourced organic vegetables',
    price: 25.99,
    images: ['https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80'],
    category: 'Groceries',
    condition: 'new',
    location: {
      latitude: -1.2921,
      longitude: 36.8219,
      address: 'Nairobi, Kenya'
    },
    seller: {
      id: '1',
      name: 'Sarah Kimani',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      rating: 4.9
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Handmade Leather Bags',
    description: 'Authentic leather bags made by local artisans',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80'],
    category: 'Fashion',
    condition: 'new',
    location: {
      latitude: -1.2864,
      longitude: 36.8172,
      address: 'Westlands, Nairobi'
    },
    seller: {
      id: '2',
      name: 'John Mwangi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      rating: 4.7
    },
    createdAt: new Date().toISOString()
  }
];

function App() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Nairobi coordinates if location access is denied
          setUserLocation([-1.2921, 36.8219]);
        }
      );
    }
  }, []);

  const filteredProducts = mockProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-emerald-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Mai Market</h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-emerald-700 rounded-full">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="p-2 hover:bg-emerald-700 rounded-full">
                  <UserIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="h-[calc(100vh-180px)] bg-white rounded-lg shadow-md overflow-hidden">
            {userLocation && (
              <MapContainer
                center={userLocation}
                zoom={13}
                className="h-full w-full z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* User Location Marker */}
                <Marker position={userLocation}>
                  <Popup>You are here</Popup>
                </Marker>
                {/* Product Markers */}
                {filteredProducts.map(product => (
                  <Marker
                    key={product.id}
                    position={[product.location.latitude, product.location.longitude]}
                    eventHandlers={{
                      click: () => setSelectedProduct(product)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Products List */}
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-32 h-32 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{product.title}</h2>
                        <p className="text-lg font-bold text-emerald-600">${product.price}</p>
                      </div>
                      <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                        {product.condition}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={product.seller.avatar}
                          alt={product.seller.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-600">{product.seller.name}</span>
                      </div>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Navigation Bar */}
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-around py-3">
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600">
                <MapPin className="h-6 w-6" />
                <span className="text-xs mt-1">Explore</span>
              </button>
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600">
                <MessageCircle className="h-6 w-6" />
                <span className="text-xs mt-1">Messages</span>
              </button>
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600">
                <Package className="h-6 w-6" />
                <span className="text-xs mt-1">Sell</span>
              </button>
              <button className="flex flex-col items-center text-gray-600 hover:text-emerald-600">
                <UserIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </Router>
  );
}

export default App;