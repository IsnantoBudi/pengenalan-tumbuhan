"use client";

import React from "react";
import { QuizItem } from "@/types/quiz";
import { PlantIllustrations } from "./illustrations/PlantIcons";
import { soundEngine } from "@/lib/audio";

interface DraggableItemProps {
  item: QuizItem;
  isSelected: boolean;
  isShaking: boolean;
  onSelect: (item: QuizItem) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, item: QuizItem) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  isSelected,
  isShaking,
  onSelect,
  onDragStart,
  onDragEnd,
}) => {
  const SvgComponent = PlantIllustrations[item.svgKey] || PlantIllustrations.buah_1;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPop();
    onSelect(item);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label="Pilihan Gambar Bagian Tumbuhan"
      className={`relative group cursor-grab active:cursor-grabbing select-none rounded-full w-18 h-18 sm:w-20 sm:h-20 p-2 border-3 transition-all duration-200 transform-gpu touch-manipulation flex items-center justify-center shadow-md hover:shadow-lg ${
        isSelected
          ? "border-emerald-500 ring-4 ring-emerald-400/80 scale-110 -translate-y-1 bg-emerald-100/90 dark:bg-emerald-900/80 shadow-emerald-500/30"
          : "border-emerald-200 dark:border-emerald-700/80 bg-white/95 dark:bg-emerald-950/70 hover:border-emerald-400 dark:hover:border-emerald-500 hover:scale-105"
      } ${
        isShaking
          ? "animate-shake border-red-500 ring-4 ring-red-400/60 bg-red-100 dark:bg-red-950/80"
          : ""
      }`}
    >
      {/* Bubble Gloss Highlight */}
      <div className="absolute top-1.5 left-2.5 w-4 h-2 rounded-full bg-white/70 dark:bg-white/30 blur-[0.5px] pointer-events-none -rotate-25" />

      {/* Selected Indicator Badge */}
      {isSelected && (
        <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-black w-5 h-5 rounded-full shadow-md flex items-center justify-center animate-bounce z-10">
          ✓
        </span>
      )}

      {/* SVG Illustration - Tanpa Label Teks */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center pointer-events-none transition-transform group-hover:scale-110">
        <SvgComponent className="w-full h-full drop-shadow-sm" />
      </div>
    </div>
  );
};
