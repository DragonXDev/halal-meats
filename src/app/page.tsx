"use client";

import { useState } from 'react';
import Image from "next/image";
import { LocationSearch } from '@/components/LocationSearch';
import { ResultsList } from '@/components/ResultsList';
import { useHalalSearch } from '@/hooks/useHalalSearch';
import { MapPin, Compass, Search, MapIcon, Star, Navigation, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const { results, loading, error, searchByAddress, searchByCurrentLocation } = useHalalSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (address: string) => {
    await searchByAddress(address);
    setHasSearched(true);
  };

  const handleUseCurrentLocation = async () => {
    await searchByCurrentLocation();
    setHasSearched(true);
  };

  const handleNewSearch = () => {
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500">Halal Meats</h1>
          </div>
          <div>
            <Badge variant="outline" className="gap-1.5 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors border-emerald-200/50">
              <Compass className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">Find halal meat shops near you</span>
            </Badge>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Background */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent opacity-100" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 transition-colors">
                <MapIcon className="h-3 w-3 mr-1" /> 100% Halal Verified
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500">
                Find Halal Meat Shops Near You
              </h1>
              
              <p className="text-lg md:text-xl text-emerald-900/70 mb-8">
                Discover nearby halal meat shops, markets, and restaurants with our easy-to-use location-based search.
              </p>
              
              {!hasSearched && (
                <LocationSearch
                  onSearch={handleSearch}
                  onUseCurrentLocation={handleUseCurrentLocation}
                  loading={loading}
                  error={error}
                />
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        {!hasSearched && (
          <section className="py-16 bg-gradient-to-b from-white to-emerald-50/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500">Why Use Halal Meats Finder?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-emerald-100/50 hover:border-emerald-200/50">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-emerald-900">Easy Location Search</h3>
                  <p className="text-emerald-900/70">Find halal options near your current location or any address you enter.</p>
                </div>
                
                <div className="bg-white hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-emerald-100/50 hover:border-emerald-200/50">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-emerald-900">Verified Halal Shops</h3>
                  <p className="text-emerald-900/70">All listed shops are verified to ensure they offer genuine halal products.</p>
                </div>
                
                <div className="bg-white hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-emerald-100/50 hover:border-emerald-200/50">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Navigation className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-emerald-900">Instant Directions</h3>
                  <p className="text-emerald-900/70">Get immediate directions to any shop with a single click.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {hasSearched && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {results.length > 0 ? `Found ${results.length} halal meat shops` : 'No results found'}
                </h2>
                <Button variant="outline" onClick={handleNewSearch} className="gap-1">
                  <Search className="h-4 w-4" />
                  New Search
                </Button>
              </div>
              
              <Separator className="mb-8" />
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                      <div className="relative h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Spinner className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                    <p className="text-emerald-900/70 text-lg">Searching for halal meat shops...</p>
                  </div>
                </div>
              ) : (
                <ResultsList results={results} />
                )}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gradient-to-b from-emerald-50/50 to-white border-t border-emerald-100/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-emerald-900">Halal Meats</h3>
              </div>
              <p className="text-emerald-900/70 mb-4">
                Helping Muslims find quality halal meat shops, markets, and restaurants in their area.
              </p>
              <p className="text-sm text-emerald-900/60">
                © {new Date().getFullYear()} Halal Meats. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-emerald-900">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> About Us
                </a>
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> Privacy Policy
                </a>
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> Terms of Service
                </a>
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> Contact Us
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-emerald-900">Connect With Us</h3>
              <p className="text-emerald-900/70 mb-4">
                Follow us on social media for updates on new halal shops and features.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-emerald-900/70 hover:text-emerald-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
