import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  } else {
    const kilometers = meters / 1000
    return `${kilometers.toFixed(1)} km`
  }
}

export function getGoogleMapsDirectionsUrl(address: string): string {
  const encodedAddress = encodeURIComponent(address)
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
}
