"use client";

import { useRef, useState, useEffect } from "react";
import { Bed, Building2, Camera, Music, ShoppingBag, Utensils, ChevronLeft, ChevronRight, Compass, Tent, Palmtree, Waves, Mountain, Castle, Flame, SlidersHorizontal } from "lucide-react";
import type { PlaceCategory } from "@/shared/data/mock-places";
import { cn } from "@/shared/lib/utils";

interface CategoryBarProps {
  activeCategory: PlaceCategory | "all";
  onCategoryChange: (category: PlaceCategory | "all") => void;
}

const CATEGORIES = [
  { id: "all" as const, label: "Все", icon: Compass },
  { id: "food" as const, label: "Рестораны", icon: Utensils },
  { id: "sights" as const, label: "Достопримечательности", icon: Camera },
  { id: "museums" as const, label: "Музеи", icon: Building2 },
  { id: "hotels" as const, label: "Отели", icon: Bed },
  { id: "shopping" as const, label: "Шопинг", icon: ShoppingBag },
  { id: "nightlife" as const, label: "Ночная жизнь", icon: Music },
  { id: "beach" as const, label: "Пляжи", icon: Waves },
  { id: "tropical" as const, label: "Тропики", icon: Palmtree },
  { id: "camping" as const, label: "Кемпинг", icon: Tent },
  { id: "mountain" as const, label: "Горы", icon: Mountain },
  { id: "castle" as const, label: "Замки", icon: Castle },
  { id: "trending" as const, label: "Популярное", icon: Flame },
];

export function CategoryBar({ activeCategory, onCategoryChange }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkArrows, { passive: true });
    window.addEventListener("resize", checkArrows);
    return () => {
      el?.removeEventListener("scroll", checkArrows);
      window.removeEventListener("resize", checkArrows);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -300 : 300;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative bg-white">
      <div className="max-w-[2520px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center">
          {/* Left Arrow - Airbnb Style */}
          {showLeftArrow && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-0 z-10 w-8 h-8 rounded-full border border-gray-200
                         bg-white shadow-sm flex items-center justify-center
                         hover:shadow-md hover:scale-105 transition-all -translate-x-2"
            >
              <ChevronLeft className="h-4 w-4 text-gray-700" />
            </button>
          )}

          {/* Scrollable categories - Airbnb Style */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide py-3 px-1"
          >
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id as PlaceCategory | "all")}
                  className={cn(
                    "flex flex-col items-center gap-2 min-w-[64px] pb-2 pt-1",
                    "transition-all duration-200 cursor-pointer",
                    "border-b-2 -mb-[1px]",
                    isActive
                      ? "border-sky-500 text-sky-500"
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-6 w-6 transition-all",
                      isActive ? "opacity-100" : "opacity-60"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs whitespace-nowrap transition-all",
                      isActive ? "font-semibold" : "font-medium"
                    )}
                  >
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow - Airbnb Style */}
          {showRightArrow && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-0 z-10 w-8 h-8 rounded-full border border-gray-200
                         bg-white shadow-sm flex items-center justify-center
                         hover:shadow-md hover:scale-105 transition-all translate-x-2"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          )}

          {/* Gradient fade on right */}
          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          )}

          {/* Filters Button */}
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-400 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Фильтры</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
