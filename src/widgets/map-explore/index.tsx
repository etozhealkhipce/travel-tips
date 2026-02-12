"use client";

import { useMemo, useState } from 'react';
import type { Place, PlaceCategory } from '@/shared/data/mock-places';
import { MOCK_PLACES } from '@/shared/data/mock-places';
import { BottomNav } from './ui/bottom-nav';
import { CategoryPills } from './ui/category-pills';
import { GoogleMapView } from './ui/google-map-view';
import { PlaceBottomSheet } from './ui/place-bottom-sheet';
import { SearchBar } from './ui/search-bar';

export function MapExplorePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'routes' | 'saved' | 'profile'>('explore');

  // Filter places based on category and search
  const filteredPlaces = useMemo(() => {
    let filtered = MOCK_PLACES;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((place: Place) => place.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (place: Place) =>
          place.name.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query) ||
          place.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place);
    setBottomSheetOpen(true);
  };

  const handleBottomSheetClose = () => {
    setBottomSheetOpen(false);
    // Keep selectedPlace for a moment to maintain marker selection
    setTimeout(() => setSelectedPlace(null), 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Google Map */}
      <GoogleMapView
        places={filteredPlaces}
        onMarkerClick={handleMarkerClick}
        selectedPlaceId={selectedPlace?.id}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onFilterClick={() => console.log('Filter clicked')}
      />

      {/* Category Pills */}
      <CategoryPills
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Bottom Sheet */}
      <PlaceBottomSheet
        place={selectedPlace}
        open={bottomSheetOpen}
        onOpenChange={handleBottomSheetClose}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
