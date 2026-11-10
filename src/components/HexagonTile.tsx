"use client";

import React from "react";
import Image from "next/image";

export type HexagonColor = "pink" | "amber" | "cyan" | "green" | "orange";

interface HexagonTileProps {
  id: string;
  imageSrc: string;
  colorTheme: HexagonColor;
  isFound: boolean;
  isPopping: boolean;
  isShaking: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const COLOR_MAP: Record<
  HexagonColor,
  {
    outerStart: string;
    outerEnd: string;
    stroke: string;
    innerStart: string;
    innerEnd: string;
  }
> = {
  pink: {
    outerStart: "#f43f5e",
    outerEnd: "#db2777",
    stroke: "#fda4af",
    innerStart: "#fff1f2",
    innerEnd: "#fce7f3",
  },
  amber: {
    outerStart: "#f59e0b",
    outerEnd: "#d97706",
    stroke: "#fde68a",
    innerStart: "#fffbeb",
    innerEnd: "#fef3c7",
  },
  cyan: {
    outerStart: "#06b6d4",
    outerEnd: "#0284c7",
    stroke: "#bae6fd",
    innerStart: "#ecfeff",
    innerEnd: "#e0f2fe",
  },
  green: {
    outerStart: "#22c55e",
    outerEnd: "#16a34a",
    stroke: "#bbf7d0",
    innerStart: "#f0fdf4",
    innerEnd: "#dcfce7",
  },
  orange: {
    outerStart: "#f97316",
    outerEnd: "#ea580c",
    stroke: "#fed7aa",
    innerStart: "#fff7ed",
    innerEnd: "#ffedd5",
  },
};

export const HexagonTile: React.FC<HexagonTileProps> = ({
  id,
  imageSrc,
  colorTheme,
  isFound,
  isPopping,
  isShaking,
  onClick,
  disabled = false,
}) => {
  // If already found and popped, render invisible placeholder to preserve layout
  if (isFound) {
    return <div className="w-full h-full opacity-0 pointer-events-none" aria-hidden="true" />;
  }

  const theme = COLOR_MAP[colorTheme] || COLOR_MAP.pink;
  const outerGradId = `outerGrad-${id}`;
  const innerGradId = `innerGrad-${id}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isPopping}
      aria-label="Bagian tumbuhan"
      className={`relative w-full h-full flex items-center justify-center select-none cursor-pointer focus:outline-none transition-transform duration-150 active:scale-95 hover:scale-105 active:translate-y-0.5 ${
        isPopping ? "animate-pop-out pointer-events-none" : ""
      } ${isShaking ? "animate-shake" : ""}`}
    >
      {/* 3D Glossy Candy Flat-Topped Hexagon SVG */}
      <svg
        viewBox="0 0 115 100"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_0_rgba(0,0,0,0.18)]"
      >
        <defs>
          <linearGradient id={outerGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.outerStart} />
            <stop offset="100%" stopColor={theme.outerEnd} />
          </linearGradient>
          <linearGradient id={innerGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.innerStart} />
            <stop offset="100%" stopColor={theme.innerEnd} />
          </linearGradient>
        </defs>

        {/* Outer 3D Bezel - Flat Top & Bottom, Pointy Left & Right */}
        <polygon
          points="29,3 86,3 112,50 86,97 29,97 3,50"
          fill={`url(#${outerGradId})`}
          stroke={theme.stroke}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 3D Top Highlight Bevel */}
        <polyline
          points="4,50 29,4 86,4 111,50"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Plate */}
        <polygon
          points="34,11 81,11 103,50 81,89 34,89 12,50"
          fill={`url(#${innerGradId})`}
          stroke={theme.stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Glossy Upper Reflection */}
        <path
          d="M 34,13 L 81,13 L 95,35 Q 57,22 20,35 Z"
          fill="rgba(255,255,255,0.4)"
        />
      </svg>

      {/* Crisp Plant Part Illustration */}
      <div className="absolute inset-0 flex items-center justify-center p-2.5 sm:p-3 pointer-events-none">
        <div className="relative w-10 h-10 sm:w-13 sm:h-13 md:w-15 md:h-15">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 40px, (max-width: 768px) 52px, 60px"
            className="object-contain drop-shadow-md select-none rounded-lg"
            priority
          />
        </div>
      </div>
    </button>
  );
};
