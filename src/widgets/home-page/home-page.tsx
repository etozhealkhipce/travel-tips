"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import type { PlaceCategory } from "@/shared/data/mock-places";
import { MOCK_PLACES } from "@/shared/data/mock-places";
import { CategoryBar } from "./category-bar";
import { PlaceCard } from "./place-card";
import { Footer } from "./footer";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | "all">("all");
  const [isCompactHeaderVisible, setIsCompactHeaderVisible] = useState(false);
  const [isCategoryBarVisible, setIsCategoryBarVisible] = useState(true);
  const lastScrollY = useRef(0);

  const filteredPlaces = useMemo(() => {
    if (activeCategory === "all") return MOCK_PLACES;
    return MOCK_PLACES.filter((place) => place.category === activeCategory);
  }, [activeCategory]);

  // Handle scroll for compact header animation (Airbnb style)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 80;
      
      // Show compact header when scrolled past threshold
      setIsCompactHeaderVisible(currentScrollY > scrollThreshold);
      
      // Hide category bar when scrolling down past threshold, show when scrolling up
      if (currentScrollY > scrollThreshold) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide category bar
          setIsCategoryBarVisible(false);
        } else {
          // Scrolling up - show category bar
          setIsCategoryBarVisible(true);
        }
      } else {
        setIsCategoryBarVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Search Header - appears on scroll (Airbnb style) */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ease-out",
          isCompactHeaderVisible 
            ? "opacity-100 translate-y-0 shadow-sm" 
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-10 py-3">
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="flex items-center gap-4 px-6 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
            >
              <span className="text-sm font-semibold text-gray-900">Любое место</span>
              <span className="w-px h-4 bg-gray-300" />
              <span className="text-sm font-semibold text-gray-900">Любая неделя</span>
              <span className="w-px h-4 bg-gray-300" />
              <span className="text-sm text-gray-500">Добавить гостей</span>
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center">
                <Search className="h-4 w-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar - сразу под основным хедером без отступа */}
      <div 
        className={cn(
          "sticky top-20 z-40 bg-white border-b border-gray-200 transition-all duration-300 ease-out",
          !isCategoryBarVisible && "-translate-y-full opacity-0"
        )}
      >
        <CategoryBar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Cards Grid - сразу после категорий без лишнего отступа */}
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              Нет мест в этой категории
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
