"use client";

import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/shared/ui/shadcn/ui/button';
import { Input } from '@/shared/ui/shadcn/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
}

export function SearchBar({ value, onChange, onFilterClick }: SearchBarProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for places, food, sights..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-6 rounded-full bg-white shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={onFilterClick}
        className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  );
}
