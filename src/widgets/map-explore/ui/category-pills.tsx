"use client";

import { Bed, Building2, Camera, Music, ShoppingBag, Utensils, Compass } from 'lucide-react';
import type { PlaceCategory } from '@/shared/data/mock-places';
import { CATEGORIES } from '@/shared/data/mock-places';
import { cn } from '@/shared/lib/utils';

interface CategoryPillsProps {
  activeCategory: PlaceCategory | 'all';
  onCategoryChange: (category: PlaceCategory | 'all') => void;
}

const ICON_MAP: Record<string, typeof Utensils> = {
  utensils: Utensils,
  camera: Camera,
  'building-2': Building2,
  bed: Bed,
  'shopping-bag': ShoppingBag,
  music: Music,
  compass: Compass,
};

export function CategoryPills({ activeCategory, onCategoryChange }: CategoryPillsProps) {
  const allCategories = [{ id: 'all', label: 'All', icon: 'compass' }, ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {allCategories.map((category) => {
        const Icon = ICON_MAP[category.icon as keyof typeof ICON_MAP] || Compass;
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id as PlaceCategory | 'all')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all',
              'text-sm font-medium shadow-sm',
              isActive
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
