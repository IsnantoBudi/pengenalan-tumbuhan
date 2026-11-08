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
      aria-label={`Bagian ${item.name}`}
      className={`relative group cursor-grab active:cursor-grabbing select-none rounded-2xl p-2 sm:p-2.5 bg-white dark:bg-zinc-800/90 border-2 transition-all duration-200 transform-gpu touch-manipulation flex flex-col items-center justify-between shadow-xs hover:shadow-md ${
        isSelected
          ? "border-emerald-500 ring-4 ring-emerald-400/60 scale-105 -translate-y-1 shadow-md bg-emerald-50/60 dark:bg-emerald-950/40"
          : "border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:-translate-y-0.5"
      } ${
        isShaking
          ? "animate-shake border-red-500 ring-4 ring-red-400/50 bg-red-50 dark:bg-red-950/40"
          : ""
      }`}
      style={{
        width: "92px",
        minHeight: "100px",
      }}
    >
      {/* Selected Indicator Badge */}
      {isSelected && (
        <span className="absolute -top-2 -right-1.5 bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-xs animate-bounce">
          ✓
        </span>
      )}

      {/* SVG Illustration */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center pointer-events-none transition-transform group-hover:scale-105">
        <SvgComponent className="w-full h-full drop-shadow-xs" />
      </div>

      {/* Label Nama Bagian (Seragam & Simpel: "Akar", "Batang", "Daun", "Bunga", "Buah") */}
      <div className="w-full text-center mt-1">
        <span className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-100 tracking-wide block truncate">
          {item.name}
        </span>
      </div>
    </div>
  );
};
