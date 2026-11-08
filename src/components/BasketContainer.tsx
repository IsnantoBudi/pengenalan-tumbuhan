"use client";

import React, { useState } from "react";
import { Category, PlacedItem, QuizItem } from "@/types/quiz";
import { BasketIllustrations, PlantIllustrations } from "./illustrations/PlantIcons";
import { soundEngine } from "@/lib/audio";

interface BasketContainerProps {
  category: Category;
  placedItems: PlacedItem[];
  selectedItem: QuizItem | null;
  onDropItem: (item: QuizItem, targetCategoryId: string) => void;
  onPlaceSelectedItem: (targetCategoryId: string) => void;
}

export const BasketContainer: React.FC<BasketContainerProps> = ({
  category,
  placedItems,
  selectedItem,
  onDropItem,
  onPlaceSelectedItem,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const BasketSvg = BasketIllustrations[category.icon] || BasketIllustrations.buah;
  const isFull = placedItems.length >= 3;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const itemData = e.dataTransfer.getData("application/json");
      if (itemData) {
        const item: QuizItem = JSON.parse(itemData);
        onDropItem(item, category.id);
      }
    } catch {
      // ignore
    }
  };

  const handleBasketClick = () => {
    if (selectedItem) {
      onPlaceSelectedItem(category.id);
    } else {
      soundEngine.playPop();
    }
  };

  const isHighlighted = (isDragOver || selectedItem !== null) && !isFull;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleBasketClick}
      role="region"
      aria-label={`Keranjang ${category.name}`}
      className={`relative rounded-3xl p-3 sm:p-4 border-3 transition-all duration-300 flex flex-col items-center justify-between min-h-[190px] sm:min-h-[230px] select-none ${
        category.color.bg
      } ${category.color.border} ${
        isFull
          ? "border-solid bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/40"
          : isHighlighted
          ? `ring-4 ${category.color.ring} scale-105 shadow-xl border-dashed cursor-pointer animate-pulse`
          : "shadow-sm hover:shadow-md cursor-pointer"
      }`}
    >
      {/* Category Name Label & Counter Badge */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-1">
        <span
          className={`inline-block text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-xs ${category.color.badge}`}
        >
          {category.name}
        </span>
        <span
          className={`text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-lg border ${
            isFull
              ? "bg-emerald-500 text-white border-emerald-600"
              : "bg-white/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
          }`}
        >
          {placedItems.length}/3
        </span>
      </div>

      {/* Basket Visual Illustration */}
      <div className="w-24 h-18 sm:w-28 sm:h-22 relative flex items-center justify-center my-0.5 pointer-events-none">
        <BasketSvg className="w-full h-full drop-shadow-sm transition-transform duration-200" />
      </div>

      {/* 3 Slot Miniatur Terbuka (Slot Indikator Item yang Sudah Masuk) */}
      <div className="w-full mt-1.5 pt-2 border-t border-zinc-200/80 dark:border-zinc-700/80 flex items-center justify-center gap-2">
        {[0, 1, 2].map((slotIndex) => {
          const item = placedItems[slotIndex];
          if (item) {
            const ItemSvg = PlantIllustrations[item.svgKey] || PlantIllustrations.buah_1;
            return (
              <div
                key={slotIndex}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-zinc-800 p-1 shadow-xs border-2 border-emerald-500 flex items-center justify-center animate-scale-up"
              >
                <ItemSvg className="w-full h-full" />
              </div>
            );
          }
          return (
            <div
              key={slotIndex}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-white/40 dark:bg-zinc-800/40 flex items-center justify-center text-xs font-bold text-zinc-400 dark:text-zinc-500"
            >
              {slotIndex + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
