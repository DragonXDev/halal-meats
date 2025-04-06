import { PlaceResult } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistance, getGoogleMapsDirectionsUrl } from '@/lib/utils';
import { MapPin, Navigation, Star, ExternalLink } from 'lucide-react';

interface ResultsListProps {
  results: PlaceResult[];
}

export function ResultsList({ results }: ResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/10 rounded-lg border border-dashed">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No Results Found</h3>
          <p className="text-muted-foreground max-w-md">
            No halal meat shops found in this area. Try a different location or expand your search radius.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {results.map((place) => (
        <Card key={place.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted/40 hover:border-primary/20">
          {place.photoUrl && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={place.photoUrl}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <Badge variant="outline" className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm">
                {formatDistance(place.distance)}
              </Badge>
            </div>
          )}
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {place.name}
            </CardTitle>
            <CardDescription className="flex items-start gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
              <span className="line-clamp-2">{place.address || place.vicinity}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pb-2">
            {place.rating && (
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">{place.rating.toFixed(1)}</span>
                {place.totalRatings && (
                  <span className="text-sm text-muted-foreground">
                    ({place.totalRatings} reviews)
                  </span>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full">
                <Star className="h-3.5 w-3.5 mr-1.5" />
                Reviews
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                Details
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2">
            <Button
              className="w-full bg-primary/90 hover:bg-primary transition-colors gap-1.5"
              onClick={() => window.open(getGoogleMapsDirectionsUrl(place.address || place.vicinity || ''), '_blank')}
            >
              <Navigation className="h-4 w-4" />
              Get Directions
              <ExternalLink className="h-3 w-3 ml-auto" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
