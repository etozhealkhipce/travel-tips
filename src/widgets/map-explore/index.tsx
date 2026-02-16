"use client";

import { useMemo, useState } from 'react';
import type { Place, PlaceCategory } from '@/shared/data/mock-places';
import { MOCK_PLACES } from '@/shared/data/mock-places';
import { useMediaQuery } from '@/shared/lib/hooks/use-media-query';
import { CategoryPills } from './ui/category-pills';
import { GoogleMapView } from './ui/google-map-view';
import { MapPlaceList } from './ui/map-place-list';
import { PlaceBottomSheet } from './ui/place-bottom-sheet';
import { PlaceCardOverlay } from './ui/place-card-overlay';
import { FilterDrawer } from './ui/filter-drawer';
import { SlidersHorizontal } from 'lucide-react';

export function MapExplorePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Filter places
  const filteredPlaces = useMemo(() => {
    let filtered = MOCK_PLACES;

    if (activeCategory !== 'all') {
      filtered = filtered.filter((place: Place) => place.category === activeCategory);
    }

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
    if (!isDesktop) {
      setBottomSheetOpen(true);
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
  };

  const handleBottomSheetClose = () => {
    setBottomSheetOpen(false);
    setTimeout(() => setSelectedPlace(null), 300);
  };

  const handleCloseOverlay = () => {
    setSelectedPlace(null);
  };

  // Desktop: Split layout
  if (isDesktop) {
    return (
      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        {/* Left Sidebar - Place List */}
        <div className="w-[420px] flex-shrink-0 border-r border-gray-200 flex flex-col h-full">
          {/* Category Bar in sidebar - без лишнего отступа */}
          <div className="flex-shrink-0 border-b border-gray-200 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 overflow-hidden">
                <CategoryPills
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(true)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-400 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4 text-gray-700" />
                <span className="text-xs font-medium text-gray-700">Filters</span>
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <MapPlaceList
              places={filteredPlaces}
              selectedPlaceId={selectedPlace?.id}
              onPlaceSelect={handlePlaceSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        {/* Right - Map */}
        <div className="flex-1 relative h-full overflow-hidden">
          <GoogleMapView
            places={filteredPlaces}
            onMarkerClick={handleMarkerClick}
            selectedPlaceId={selectedPlace?.id}
          />
          
          {/* Place Card Overlay - appears when marker is clicked */}
          <PlaceCardOverlay
            place={selectedPlace}
            onClose={handleCloseOverlay}
          />

          {/* Filter Drawer */}
          <FilterDrawer
            open={showFilters}
            onClose={() => setShowFilters(false)}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>
    );
  }

  // Mobile: Full map with bottom sheet
  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      {/* Google Map */}
      <GoogleMapView
        places={filteredPlaces}
        onMarkerClick={handleMarkerClick}
        selectedPlaceId={selectedPlace?.id}
      />

      {/* Back Button */}
      <a
        href="/"
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg
                   flex items-center justify-center no-underline hover:opacity-100 hover:shadow-xl transition-all"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </a>

      {/* Category Pills */}
      <div className="absolute top-4 left-16 right-20 z-10">
        <CategoryPills
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Filter Button */}
      <button
        type="button"
        onClick={() => setShowFilters(true)}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg
                   flex items-center justify-center hover:shadow-xl transition-all"
      >
        <SlidersHorizontal className="h-5 w-5 text-gray-700" />
      </button>

      {/* Bottom Sheet */}
      <PlaceBottomSheet
        place={selectedPlace}
        open={bottomSheetOpen}
        onOpenChange={handleBottomSheetClose}
      />

      {/* Filter Drawer */}
      <FilterDrawer
        open={showFilters}
        onClose={() => setShowFilters(false)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
}
