"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, X } from "lucide-react";
import { MOCK_DESTINATIONS } from "@/shared/data/mock-places";
import { cn } from "@/shared/lib/utils";

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDrawer({ open, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const filteredDestinations = MOCK_DESTINATIONS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!open) {
      setQuery("");
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleSelect = useCallback(
    (destination: { name: string; country: string }) => {
      setQuery(`${destination.name}, ${destination.country}`);
      // In a real app, navigate to /map with the destination
      onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 search-backdrop"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl animate-search-expand"
      >
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Close button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Where are you going?
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-4 text-base rounded-2xl border-2 border-gray-200
                         focus:border-blue-500 focus:ring-0 outline-none
                         transition-colors bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Destinations List */}
          <div className="max-h-[50vh] overflow-y-auto">
            {filteredDestinations.length > 0 ? (
              <div className="space-y-1">
                {filteredDestinations.map((dest) => (
                  <button
                    key={`${dest.name}-${dest.country}`}
                    type="button"
                    onClick={() => handleSelect(dest)}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
                               hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100
                                    flex items-center justify-center
                                    group-hover:bg-blue-50 transition-colors">
                      <MapPin className="h-5 w-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {dest.emoji} {dest.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {dest.country}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No destinations found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
