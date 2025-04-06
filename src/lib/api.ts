// API service for halal meat shops search
// We'll use Google Places API for this example

export interface PlaceResult {
  id: string;
  name: string;
  address: string;
  distance: number; // in meters
  rating?: number;
  totalRatings?: number;
  photoUrl?: string;
  vicinity?: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface SearchResponse {
  results: PlaceResult[];
  status: 'success' | 'error';
  message?: string;
}

export async function searchHalalShops(
  location: { lat: number; lng: number } | string,
  radius: number = 5000
): Promise<SearchResponse> {
  try {
    const response = await fetch(
      `/api/places?location=${encodeURIComponent(JSON.stringify(location))}&radius=${radius}&keyword=halal+meat`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching halal shops:', error);
    return {
      results: [],
      status: 'error',
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

// Function to get user's current location
export function getCurrentLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// In a real application, you would implement actual API calls like this:
/*
export async function searchHalalShops(
  location: { lat: number; lng: number } | string,
  radius: number = 5000
): Promise<SearchResponse> {
  try {
    // You would need to set up a backend proxy to protect your API key
    const response = await fetch(`/api/places?location=${encodeURIComponent(JSON.stringify(location))}&radius=${radius}&keyword=halal+meat`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return {
      results: data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address || place.vicinity,
        distance: place.distance || 0,
        rating: place.rating,
        totalRatings: place.user_ratings_total,
        photoUrl: place.photos?.[0]?.photo_reference,
        vicinity: place.vicinity,
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        }
      })),
      status: 'success'
    };
  } catch (error) {
    console.error('Error fetching halal shops:', error);
    return {
      results: [],
      status: 'error',
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
*/
