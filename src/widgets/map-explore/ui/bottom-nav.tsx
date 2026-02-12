"use client";

import { Compass, Heart, Map as MapIcon, User } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

type NavTab = 'explore' | 'routes' | 'saved' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const NAV_ITEMS = [
  { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
  { id: 'routes' as NavTab, label: 'Routes', icon: MapIcon },
  { id: 'saved' as NavTab, label: 'Saved', icon: Heart },
  { id: 'profile' as NavTab, label: 'Profile', icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around px-4 py-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 min-w-[60px]"
            >
              <Icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  isActive ? 'text-blue-600' : 'text-gray-400'
                )}
              />
              <span
                className={cn(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-blue-600' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
