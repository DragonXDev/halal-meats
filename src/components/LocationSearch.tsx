import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Search, MapPin } from 'lucide-react';

interface LocationSearchProps {
  onSearch: (address: string) => Promise<void>;
  onUseCurrentLocation: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function LocationSearch({
  onSearch,
  onUseCurrentLocation,
  loading,
  error
}: LocationSearchProps) {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(address);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-emerald-100/50 rounded-2xl shadow-xl shadow-emerald-500/10 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-emerald-900">
              Enter your location
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
              <Input
                id="location"
                type="text"
                placeholder="City, ZIP code, or address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-100/50 bg-white/90 focus:border-emerald-500/30 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder:text-emerald-900/40"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              type="submit" 
              disabled={loading || !address.trim()} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 group"
            >
              {loading ? (
                <Spinner className="mr-2 h-4 w-4" />
              ) : (
                <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              )}
              Search Halal Shops
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onUseCurrentLocation} 
              disabled={loading}
              className="w-full bg-white hover:bg-emerald-50 border-emerald-100/50 hover:border-emerald-200/50 text-emerald-900 group"
            >
              {loading ? (
                <Spinner className="mr-2 h-4 w-4 text-emerald-600" />
              ) : (
                <MapPin className="h-4 w-4 mr-2 text-emerald-600 group-hover:scale-110 transition-transform" />
              )}
              Use Current Location
            </Button>
          </div>
          
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
          )}
        </div>
      </form>
    </div>
  );
}
