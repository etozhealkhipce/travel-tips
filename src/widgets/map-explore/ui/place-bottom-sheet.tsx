"use client";

import { Star, MapPin, Clock, Share2, Plus, X } from 'lucide-react';
import type { Place } from '@/shared/data/mock-places';
import { useMediaQuery } from '@/shared/lib/hooks/use-media-query';
import { Button } from '@/shared/ui/shadcn/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/shadcn/ui/drawer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/shadcn/ui/sheet';

interface PlaceBottomSheetProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PlaceContent({ place }: { place: Place }) {
  return (
    <div className="w-full">
      {/* Featured Label */}
      <div className="text-xs font-semibold text-blue-600 tracking-wide mb-2">
        FEATURED SELECTION
      </div>

      {/* Title and Rating */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold flex-1">{place.name}</h2>
        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{place.rating}</span>
        </div>
      </div>

      {/* Image and Description */}
      <div className="flex gap-4 mb-4">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-28 h-28 rounded-2xl object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {place.description}
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{place.distance}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{place.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6">
          <Plus className="h-5 w-5 mr-2" />
          Add to Itinerary
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-gray-300"
        >
          <Share2 className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </div>
  );
}

export function PlaceBottomSheet({ place, open, onOpenChange }: PlaceBottomSheetProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!place) return null;

  // Desktop: Sheet from right
  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" onClose={() => onOpenChange(false)} className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="text-left">
            <SheetTitle>{place.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <PlaceContent place={place} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Mobile: Drawer from bottom
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-2xl">
          {/* Drag Handle */}
          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gray-300" />

          <DrawerHeader className="text-left pb-2">
            <DrawerTitle className="sr-only">{place.name}</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 pb-6">
            <PlaceContent place={place} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
