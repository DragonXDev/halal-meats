import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const radius = searchParams.get('radius') || '5000';
  const keyword = searchParams.get('keyword') || 'halal+meat';
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  if (!location) {
    return NextResponse.json(
      { error: 'Location is required' },
      { status: 400 }
    );
  }

  try {
    let locationString;
    if (typeof location === 'string') {
      // If location is an address, geocode it first
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
      const geocodeRes = await fetch(geocodeUrl);
      const geocodeData = await geocodeRes.json();

      if (geocodeData.status !== 'OK') {
        throw new Error('Failed to geocode address');
      }

      const { lat, lng } = geocodeData.results[0].geometry.location;
      locationString = `${lat},${lng}`;
    } else {
      // If location is already lat/lng
      const parsedLocation = JSON.parse(location);
      locationString = `${parsedLocation.lat},${parsedLocation.lng}`;
    }

    // Search for places
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationString}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;
    const placesRes = await fetch(placesUrl);
    const placesData = await placesRes.json();

    if (placesData.status !== 'OK') {
      throw new Error('Failed to fetch places');
    }

    // Get details for each place
    const detailedPlaces = await Promise.all(
      placesData.results.map(async (place: any) => {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=formatted_address,photos,rating,user_ratings_total&key=${apiKey}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        if (detailsData.status !== 'OK') {
          return null;
        }

        const details = detailsData.result;
        const photoReference = details.photos?.[0]?.photo_reference;
        const photoUrl = photoReference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`
          : null;

        return {
          id: place.place_id,
          name: place.name,
          address: details.formatted_address || place.vicinity,
          distance: place.distance || 0,
          rating: place.rating,
          totalRatings: place.user_ratings_total,
          photoUrl,
          vicinity: place.vicinity,
          location: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
          }
        };
      })
    );

    const validPlaces = detailedPlaces.filter(place => place !== null);

    return NextResponse.json({
      results: validPlaces,
      status: 'success'
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json(
      {
        results: [],
        status: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      },
      { status: 500 }
    );
  }
}
