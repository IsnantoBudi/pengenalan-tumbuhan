"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Category, PlacedItem, QuizItem } from "@/types/quiz";
import { soundEngine } from "@/lib/audio";

interface BasketContainerProps {
  category: Category;
  placedItems: PlacedItem[];
  selectedItem: QuizItem | null;
  isHero?: boolean;
  onDropItem: (item: QuizItem, targetCategoryId: string) => void;
  onPlaceSelectedItem: (targetCategoryId: string) => void;
}

export const BasketContainer: React.FC<BasketContainerProps> = ({
  category,
  placedItems,
  selectedItem,
  isHero = false,
  onDropItem,
  onPlaceSelectedItem,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
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
      className={`relative rounded-3xl transition-all duration-300 flex flex-col items-center justify-between select-none ${
        isHero
          ? "w-full max-w-lg p-4 sm:p-5 min-h-[230px] sm:min-h-[270px] shadow-xl border-4"
          : "p-3 sm:p-4 min-h-[190px] sm:min-h-[230px] shadow-sm hover:shadow-md border-3"
      } ${category.color.bg} ${category.color.border} ${
        isFull
          ? "border-solid bg-emerald-50/70 dark:bg-emerald-950/40 ring-4 ring-emerald-500/50 shadow-emerald-500/20"
          : isHighlighted
          ? `ring-4 ${category.color.ring} scale-102 shadow-2xl border-dashed cursor-pointer animate-pulse`
          : "cursor-pointer"
      }`}
    >
      {/* Category Name Label & Counter Badge */}
      <div className="w-full flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 font-black rounded-full shadow-xs ${
            isHero
              ? "text-sm sm:text-base px-4 py-1.5"
              : "text-xs sm:text-sm px-3 py-1"
          } ${category.color.badge}`}
        >
          <span>🧺</span>
          <span>Keranjang {category.name}</span>
        </span>

        <span
          className={`font-black rounded-xl border flex items-center gap-1 ${
            isHero
              ? "text-xs sm:text-sm px-3 py-1"
              : "text-[11px] sm:text-xs px-2 py-0.5"
          } ${
            isFull
              ? "bg-emerald-500 text-white border-emerald-600 animate-bounce"
              : "bg-white/90 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
          }`}
        >
          <span>{isFull ? "✅ Lengkap" : `${placedItems.length} / 3`}</span>
        </span>
      </div>

      {/* Basket Visual PNG Illustration */}
      <div
        className={`relative flex items-center justify-center my-1 pointer-events-none transition-transform duration-200 ${
          isHero ? "w-44 h-28 sm:w-56 sm:h-36" : "w-28 h-20 sm:w-36 sm:h-24"
        }`}
      >
        <Image
          src={`${category.basketImage}?v=2`}
          alt={`Keranjang ${category.name}`}
          width={224}
          height={144}
          priority={isHero}
          unoptimized
          className="w-full h-full object-contain drop-shadow-md select-none"
        />
      </div>

      {/* 3 Slot Miniatur Terbuka (Slot Indikator Item yang Sudah Masuk) */}
      <div className="w-full mt-2 pt-2.5 border-t border-zinc-300/80 dark:border-zinc-700/80 flex items-center justify-center gap-2.5 sm:gap-3.5">
        {[0, 1, 2].map((slotIndex) => {
          const item = placedItems[slotIndex];
          if (item) {
            return (
              <div
                key={slotIndex}
                className={`relative rounded-2xl bg-white dark:bg-zinc-800 p-1.5 shadow-md border-2 border-emerald-500 flex items-center justify-center animate-scale-up ${
                  isHero
                    ? "w-12 h-12 sm:w-14 sm:h-14"
                    : "w-8 h-8 sm:w-10 sm:h-10"
                }`}
              >
                <Image
                  src={`${item.imageSrc}?v=2`}
                  alt={item.name}
                  width={48}
                  height={48}
                  unoptimized
                  className="w-full h-full object-contain drop-shadow-xs select-none"
                />
              </div>
            );
          }
          return (
            <div
              key={slotIndex}
              className={`rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-white/50 dark:bg-zinc-800/40 flex items-center justify-center font-black text-zinc-400 dark:text-zinc-500 ${
                isHero
                  ? "w-12 h-12 sm:w-14 sm:h-14 text-sm"
                  : "w-8 h-8 sm:w-10 sm:h-10 text-xs"
              }`}
            >
              {slotIndex + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
