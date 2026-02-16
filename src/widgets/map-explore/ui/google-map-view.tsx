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

// Ultra-minimalist map style - hides ALL POIs and commercial objects
const MINIMALIST_MAP_STYLES = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ saturation: -100 }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.business',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.attraction',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.government',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.medical',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.place_of_worship',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.school',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.sports_complex',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit.station',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit.station.bus',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit.station.rail',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'landscape.man_made',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export function GoogleMapView({ places, onMarkerClick, selectedPlaceId }: GoogleMapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

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
        styles={MINIMALIST_MAP_STYLES}
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
              <div className="flex flex-col items-center cursor-pointer group">
                {/* Custom Marker - Sky Blue color */}
                <div
                  className={`
                    flex items-center justify-center
                    w-10 h-10 rounded-full
                    bg-sky-500 shadow-lg
                    transition-all duration-200
                    ${isSelected ? 'scale-125 ring-4 ring-sky-200' : 'group-hover:scale-110'}
                  `}
                >
                  {Icon && <Icon className="h-4 w-4 text-white" />}
                </div>
              </div>
            </AdvancedMarker>
          );
        })}
      </GoogleMap>
    </APIProvider>
  );
}
