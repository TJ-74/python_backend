'use client';

import Link from 'next/link';
import { ArrowRight, Search, DollarSign, Building2, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navbar from '../components/NavBar';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Find Affordable Healthcare
              <span className="block text-blue-500">Compare Prices Easily</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Compare healthcare costs across different providers and make informed decisions about your medical procedures.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/searchform" className="flex items-center gap-2">
                  Start Searching <Search size={20} />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-gray-400">Discover the benefits of our healthcare cost comparison platform</p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/70 transition-all">
                <div className="text-blue-500 mb-4">
                  <DollarSign size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Cost Transparency</h3>
                <p className="text-gray-400">Compare procedure costs across different healthcare providers to make informed decisions.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/70 transition-all">
                <div className="text-blue-500 mb-4">
                  <Building2 size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Multiple Providers</h3>
                <p className="text-gray-400">Access a wide network of healthcare providers and compare their services easily.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/70 transition-all">
                <div className="text-blue-500 mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Insurance Coverage</h3>
                <p className="text-gray-400">See which insurance plans are accepted by different healthcare providers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Ready to find the best healthcare options?
          </h2>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/searchform" className="flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
