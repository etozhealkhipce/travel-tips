"use client";

import { Bed, Building2, Camera, Music, ShoppingBag, Utensils } from 'lucide-react';
import type { PlaceCategory } from '@/shared/data/mock-places';
import { CATEGORIES } from '@/shared/data/mock-places';
import { cn } from '@/shared/lib/utils';

interface CategoryPillsProps {
  activeCategory: PlaceCategory | 'all';
  onCategoryChange: (category: PlaceCategory | 'all') => void;
}

const ICON_MAP = {
  utensils: Utensils,
  camera: Camera,
  'building-2': Building2,
  bed: Bed,
  'shopping-bag': ShoppingBag,
  music: Music,
};

export function CategoryPills({ activeCategory, onCategoryChange }: CategoryPillsProps) {
  const allCategories = [{ id: 'all', label: 'All', icon: 'camera' }, ...CATEGORIES];

  return (
    <div className="absolute top-[88px] left-0 right-0 z-10 px-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allCategories.map((category) => {
          const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP];
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id as PlaceCategory | 'all')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-md',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
