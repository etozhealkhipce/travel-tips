"use client";

import { useState, useMemo } from "react";
import { Search, Star, MapPin, ArrowLeft } from "lucide-react";
import type { Place } from "@/shared/data/mock-places";
import { cn } from "@/shared/lib/utils";
import { Pagination } from "@/shared/ui/atoms/pagination";

interface MapPlaceListProps {
  places: Place[];
  selectedPlaceId?: string | null;
  onPlaceSelect: (place: Place) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ITEMS_PER_PAGE = 8;

export function MapPlaceList({
  places,
  selectedPlaceId,
  onPlaceSelect,
  searchQuery,
  onSearchChange,
}: MapPlaceListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when places change
  const paginatedPlaces = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return places.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [places, currentPage]);

  const totalPages = Math.ceil(places.length / ITEMS_PER_PAGE);

  // Reset page when places filter changes
  useMemo(() => {
    setCurrentPage(1);
  }, [places.length]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - без лишнего отступа */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <a
            href="/"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors no-underline hover:opacity-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </a>
          <h2 className="text-lg font-bold text-gray-900">
            London · {places.length} places
          </h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter places..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                       focus:border-sky-500 focus:ring-0 outline-none bg-gray-50 focus:bg-white
                       transition-colors"
          />
        </div>
      </div>

      {/* Place List - flex-1 to take remaining space */}
      <div className="flex-1 overflow-y-auto app-scroll min-h-0">
        {paginatedPlaces.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {paginatedPlaces.map((place, i) => {
              const isSelected = selectedPlaceId === place.id;
              return (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => onPlaceSelect(place)}
                  className={cn(
                    "w-full text-left p-4 flex gap-4 transition-colors hover:bg-gray-50",
                    isSelected && "bg-sky-50 hover:bg-sky-50"
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-24 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {place.name}
                      </h3>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
                        <span className="text-xs text-gray-900 font-medium">
                          {place.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                      {place.description}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {place.distance}
                      </span>
                    </div>
                    {place.price && (
                      <p className="text-xs font-semibold text-gray-900 mt-1">
                        {place.price}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No places matching your search</p>
          </div>
        )}
      </div>

      {/* Pagination - фиксировано снизу */}
      {totalPages > 1 && (
        <div className="flex-shrink-0 border-t border-gray-200 p-3 bg-white">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
