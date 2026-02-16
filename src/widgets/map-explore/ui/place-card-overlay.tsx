"use client";

import { X, Star, MapPin, Clock, Plus, Share2 } from 'lucide-react';
import type { Place } from '@/shared/data/mock-places';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { cn } from '@/shared/lib/utils';

interface PlaceCardOverlayProps {
  place: Place | null;
  onClose: () => void;
}

export function PlaceCardOverlay({ place, onClose }: PlaceCardOverlayProps) {
  if (!place) return null;

  return (
    <div 
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ease-out",
        place ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="w-[360px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>

        {/* Image */}
        <div className="relative h-44">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          {/* Featured Label */}
          {place.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-semibold text-sky-500 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">
              {place.name}
            </h3>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg flex-shrink-0">
              <Star className="h-3.5 w-3.5 fill-gray-900 text-gray-900" />
              <span className="text-sm font-semibold">{place.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {place.description}
          </p>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{place.distance}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{place.hours}</span>
            </div>
          </div>

          {/* Price if available */}
          {place.price && (
            <p className="text-lg font-bold text-gray-900 mb-4">
              {place.price}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full py-5">
              <Plus className="h-5 w-5 mr-2" />
              Add to Trip
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300 hover:bg-gray-50"
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
