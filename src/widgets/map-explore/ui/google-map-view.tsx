"use client";

import { AdvancedMarker, APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import { Bed, Building2, Camera, Music, ShoppingBag, Utensils } from 'lucide-react';
import type { Place, PlaceCategory } from '@/shared/data/mock-places';

interface GoogleMapViewProps {
  places: Place[];
  onMarkerClick: (place: Place) => void;
  selectedPlaceId?: string | null;
}

const CATEGORY_ICONS: Record<PlaceCategory, typeof Utensils> = {
  food: Utensils,
  sights: Camera,
  museums: Building2,
  hotels: Bed,
  shopping: ShoppingBag,
  nightlife: Music,
};

// London center coordinates
const DEFAULT_CENTER = { lat: 51.5074, lng: -0.1278 };
const DEFAULT_ZOOM = 13;

export function GoogleMapView({ places, onMarkerClick, selectedPlaceId }: GoogleMapViewProps) {
  // const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const apiKey = "AIzaSyAa5IexRoyxmfO0_SDv-Cz0y-PeXIyhshw";

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        mapId="travel-tips-map"
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        gestureHandling="greedy"
        disableDefaultUI={false}
        zoomControl={true}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        controlSize={24}
        styles={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ]}
        className="w-full h-full"
      >
        {places.map((place) => {
          const Icon = CATEGORY_ICONS[place.category as PlaceCategory];
          const isSelected = selectedPlaceId === place.id;

          return (
            <AdvancedMarker
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
              onClick={() => onMarkerClick(place)}
            >
              <div className="flex flex-col items-center cursor-pointer">
                {/* Custom Marker */}
                <div
                  className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    bg-blue-600 shadow-lg
                    transition-all duration-200
                    ${isSelected ? 'scale-125 ring-4 ring-blue-300' : 'hover:scale-110'}
                  `}
                >
                  {Icon && <Icon className="h-6 w-6 text-white" />}
                </div>
                {/* Place Name Label */}
                {isSelected && (
                  <div className="mt-2 px-3 py-1 bg-white rounded-full shadow-md">
                    <span className="text-xs font-semibold text-gray-800">
                      {place.name}
                    </span>
                  </div>
                )}
              </div>
            </AdvancedMarker>
          );
        })}
      </GoogleMap>
    </APIProvider>
  );
}
