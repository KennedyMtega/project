'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck, Search, BarChart3, Shield, MapPin, Star, Users } from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-600">Mazao</span>
            <span className="text-2xl font-bold text-amber-500">Link</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-green-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-green-600 transition">Testimonials</a>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition">
              Login
            </Link>
            <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Connecting Tanzania's <span className="text-green-600">Farmers</span> and <span className="text-amber-500">Buyers</span> Directly
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              MazaoLink revolutionizes agricultural trade with our proximity-based marketplace that connects crop buyers with verified wholesalers across Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/register?type=buyer" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-center">
                I'm a Buyer
              </Link>
              <Link href="/register?type=seller" className="px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition text-center">
                I'm a Seller
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-amber-400 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
                Agricultural Marketplace Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose MazaoLink?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Search className="h-10 w-10 text-green-600" />}
              title="Smart Crop Search"
              description="Find exactly what you need with powerful filtering by crop type, price, quality, and location."
            />
            <FeatureCard 
              icon={<MapPin className="h-10 w-10 text-green-600" />}
              title="Proximity-Based Matching"
              description="Connect with nearby sellers to reduce delivery time and transportation costs."
            />
            <FeatureCard 
              icon={<Truck className="h-10 w-10 text-green-600" />}
              title="Real-Time Tracking"
              description="Monitor your orders from acceptance to delivery with live updates."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-green-600" />}
              title="Dynamic Pricing"
              description="Transparent pricing that adapts to distance, volume, and market conditions."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How MazaoLink Works</h2>
          
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-center text-green-600 mb-12">For Buyers</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard 
                number="1"
                title="Search & Discover"
                description="Browse crops from verified sellers or search with specific criteria including location and price."
              />
              <StepCard 
                number="2"
                title="Order & Pay"
                description="Place your order with secure payment options and clear pricing breakdown."
              />
              <StepCard 
                number="3"
                title="Track & Receive"
                description="Monitor your delivery in real-time and rate your experience after receiving your crops."
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-center text-amber-500 mb-12">For Sellers</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <StepCard 
                number="1"
                title="List Your Crops"
                description="Create detailed listings with prices, quantities, and quality information."
                color="amber"
              />
              <StepCard 
                number="2"
                title="Manage Orders"
                description="Receive and fulfill orders with our streamlined order management system."
                color="amber"
              />
              <StepCard 
                number="3"
                title="Grow Your Business"
                description="Access analytics, build your reputation, and expand your customer base."
                color="amber"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Maria Joseph"
              role="Crop Buyer, Dar es Salaam"
              quote="MazaoLink has transformed how I source produce for my restaurant. I now get fresher crops at better prices, delivered right to my doorstep."
            />
            <TestimonialCard 
              name="Emmanuel Mkinga"
              role="Wholesaler, Morogoro"
              quote="Since joining MazaoLink, I've expanded my customer base beyond my local area. The platform makes it easy to manage inventory and fulfill orders."
            />
            <TestimonialCard 
              name="Grace Mwakasege"
              role="Market Vendor, Mwanza"
              quote="The transparency in pricing and quality ratings helps me make better purchasing decisions. I can now reliably source crops even during seasonal shortages."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" text="Registered Users" />
            <StatCard number="5,000+" text="Successful Trades" />
            <StatCard number="200+" text="Crop Varieties" />
            <StatCard number="25+" text="Regions Covered" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Agricultural Business?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Join MazaoLink today and experience the future of agricultural trade in Tanzania.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/register" className="px-8 py-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-lg font-semibold">
              Get Started Now <ArrowRight className="inline ml-2" />
            </Link>
            <Link href="#how-it-works" className="px-8 py-4 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition text-lg font-semibold">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-400">Mazao</span>
                <span className="text-2xl font-bold text-amber-400">Link</span>
              </div>
              <p className="text-gray-400">
                Connecting Tanzania's agricultural ecosystem through technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dar es Salaam, Tanzania</li>
                <li>info@mazaolink.co.tz</li>
                <li>+255 123 456 789</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MazaoLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for feature cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Component for step cards
function StepCard({ number, title, description, color = 'green' }: { number: string; title: string; description: string; color?: 'green' | 'amber' }) {
  const bgColor = color === 'amber' ? 'bg-amber-500' : 'bg-green-600';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-100 relative pt-12">
      <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 ${bgColor} text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold`}>
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

// Component for testimonial cards
function TestimonialCard({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-100">
      <div className="flex items-center mb-4">
        <Star className="text-amber-400 h-5 w-5" />
        <Star className="text-amber-400 h-5 w-5" />
        <Star className="text-amber-400 h-5 w-5" />
        <Star className="text-amber-400 h-5 w-5" />
        <Star className="text-amber-400 h-5 w-5" />
      </div>
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
}

// Component for stat cards
function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold mb-2">{number}</p>
      <p className="text-sm md:text-base">{text}</p>
    </div>
  );
}