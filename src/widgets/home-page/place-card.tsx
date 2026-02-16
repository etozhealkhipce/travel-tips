"use client";

import { useState, useCallback } from "react";
import { Star, Heart, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import type { Place } from "@/shared/data/mock-places";
import { cn } from "@/shared/lib/utils";

interface PlaceCardProps {
  place: Place;
  index: number;
}

export function PlaceCard({ place, index }: PlaceCardProps) {
  const images = place.images.length > 0 ? place.images : [place.imageUrl];
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    setHeartAnimating(true);
    setTimeout(() => setHeartAnimating(false), 400);
  }, []);

  return (
    <div
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`/map?place=${place.id}`} className="block no-underline hover:opacity-100">
        {/* Image Container - Airbnb Style */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-200">
          {/* Images with carousel */}
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`${place.name} ${i + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* Must Visit Badge */}
          {place.isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm">
                Обязательно к посещению
              </span>
            </div>
          )}

          {/* Heart Button */}
          <button
            type="button"
            onClick={handleLike}
            className="absolute top-3 right-3 z-10 p-1.5"
          >
            <Heart
              className={cn(
                "h-6 w-6 drop-shadow-md transition-all",
                heartAnimating && "animate-heart-pulse",
                liked
                  ? "fill-sky-500 text-sky-500"
                  : "fill-black/40 text-white hover:scale-110"
              )}
            />
          </button>

          {/* Carousel Controls */}
          {images.length > 1 && isHovered && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                  "w-8 h-8 rounded-full bg-white/90 shadow-md",
                  "flex items-center justify-center",
                  "hover:bg-white hover:scale-105 transition-all",
                  "opacity-0 group-hover:opacity-100"
                )}
              >
                <ChevronLeft className="h-4 w-4 text-gray-800" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                  "w-8 h-8 rounded-full bg-white/90 shadow-md",
                  "flex items-center justify-center",
                  "hover:bg-white hover:scale-105 transition-all",
                  "opacity-0 group-hover:opacity-100"
                )}
              >
                <ChevronRight className="h-4 w-4 text-gray-800" />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    i === currentImage
                      ? "bg-white w-2 h-2"
                      : "bg-white/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info - For Places/Attractions */}
        <div className="space-y-1">
          {/* Name and Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[15px] text-gray-900 line-clamp-1">
              {place.name}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-3.5 w-3.5 fill-gray-900 text-gray-900" />
              <span className="text-sm text-gray-900">{place.rating}</span>
            </div>
          </div>

          {/* Category/Distance */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{place.distance}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {place.description}
          </p>

          {/* Hours */}
          <div className="flex items-center gap-1 text-sm text-gray-600 pt-0.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{place.hours}</span>
          </div>

          {/* Price if available (for paid attractions) */}
          {place.price && (
            <p className="text-sm text-gray-900 pt-1">
              <span className="font-semibold">{place.price}</span>
              <span className="text-gray-500"> за вход</span>
            </p>
          )}
        </div>
      </a>
    </div>
  );
}
