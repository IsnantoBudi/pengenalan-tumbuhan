"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio";

interface HeaderControlsProps {
  score: number;
  streak: number;
  onReset: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  score,
  streak,
  onReset,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSfxOn, setIsSfxOn] = useState(true);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Browser may block if not user gesture
    }
  };

  const toggleSfx = () => {
    const next = !isSfxOn;
    setIsSfxOn(next);
    soundEngine.setSfxEnabled(next);
    if (next) soundEngine.playPop();
  };

  return (
    <header className="w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-xs sticky top-0 z-30 px-3 py-2 sm:px-6 sm:py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* App Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-xs text-white font-black text-lg select-none">
            🌿
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              Pilah Bagian Tumbuhan
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Papan Interaktif Digital & Tablet
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Score & Streak */}
          <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className="text-amber-500 text-base">⭐</span>
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {score}
            </span>
            {streak > 1 && (
              <span className="text-xs font-bold text-red-500 pl-1">
                🔥 {streak}x
              </span>
            )}
          </div>

          {/* Sound SFX Button */}
          <button
            onClick={toggleSfx}
            title={isSfxOn ? "Matikan Efek Suara" : "Nyalakan Efek Suara"}
            aria-label="Toggle SFX"
            className={`p-2 rounded-xl text-sm font-medium flex items-center justify-center min-w-[40px] min-h-[40px] transition-all ${
              isSfxOn
                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
            }`}
          >
            <span>{isSfxOn ? "🔊" : "🔇"}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh (Smartboard)"}
            aria-label="Toggle Layar Penuh"
            className="p-2 sm:px-3 rounded-xl text-sm font-medium flex items-center gap-1.5 min-w-[40px] min-h-[40px] justify-center bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
          >
            <span>{isFullscreen ? "🗗" : "⛶"}</span>
            <span className="hidden md:inline text-xs font-semibold">
              {isFullscreen ? "Normal" : "Layar Penuh"}
            </span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Mulai Ulang Permainan"
            aria-label="Mulai Ulang"
            className="p-2 sm:px-3 rounded-xl text-sm font-bold flex items-center gap-1 min-w-[40px] min-h-[40px] justify-center bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <span>🔄</span>
            <span className="hidden sm:inline text-xs">Ulangi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
