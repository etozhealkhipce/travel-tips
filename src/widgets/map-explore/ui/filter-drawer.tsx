"use client";

import { useState } from "react";
import { X, Search, SlidersHorizontal, Home, Utensils, Camera, Building2, Bed, ShoppingBag, Music } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { PlaceCategory } from "@/shared/data/mock-places";
import { Button } from "@/shared/ui/shadcn/ui/button";

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  activeCategory: PlaceCategory | 'all';
  onCategoryChange: (category: PlaceCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const CATEGORIES = [
  { id: "all" as const, label: "Все", icon: Home },
  { id: "food" as const, label: "Рестораны", icon: Utensils },
  { id: "sights" as const, label: "Достопримечательности", icon: Camera },
  { id: "museums" as const, label: "Музеи", icon: Building2 },
  { id: "hotels" as const, label: "Отели", icon: Bed },
  { id: "shopping" as const, label: "Шопинг", icon: ShoppingBag },
  { id: "nightlife" as const, label: "Ночная жизнь", icon: Music },
];

export function FilterDrawer({
  open,
  onClose,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: FilterDrawerProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localCategory, setLocalCategory] = useState(activeCategory);

  const handleApply = () => {
    onSearchChange(localSearch);
    onCategoryChange(localCategory);
    onClose();
  };

  const handleReset = () => {
    setLocalSearch("");
    setLocalCategory("all");
    onSearchChange("");
    onCategoryChange("all");
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Фильтры</h2>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Поиск</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Поиск мест..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200
                           focus:border-sky-500 focus:ring-0 outline-none bg-white
                           transition-colors"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = localCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setLocalCategory(category.id as PlaceCategory | 'all')}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                      isActive
                        ? "border-sky-500 bg-sky-50 text-sky-600"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-sky-500" : "text-gray-500")} />
                    <span className="font-medium text-sm">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range (Mock) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ценовой диапазон</h3>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-sky-500 transition-colors text-sm font-medium"
              >
                $
              </button>
              <button
                type="button"
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-sky-500 transition-colors text-sm font-medium"
              >
                $$
              </button>
              <button
                type="button"
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-sky-500 transition-colors text-sm font-medium"
              >
                $$$
              </button>
              <button
                type="button"
                className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 hover:border-sky-500 transition-colors text-sm font-medium"
              >
                $$$$
              </button>
            </div>
          </div>

          {/* Rating (Mock) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Рейтинг</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 hover:border-sky-500 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">{rating}+</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        )}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 rounded-xl py-6 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
          >
            Сбросить
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 rounded-xl py-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
          >
            Показать результаты
          </Button>
        </div>
      </div>
    </>
  );
}
