"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio";

interface HeaderControlsProps {
  score: number;
  streak: number;
  onReset: () => void;
  onBackToMenu?: () => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  score,
  streak,
  onReset,
  onBackToMenu,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Initial theme check
    const savedTheme = localStorage.getItem("quiz_theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      requestAnimationFrame(() => {
        setIsDarkMode(true);
      });
    } else {
      document.documentElement.classList.remove("dark");
    }

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

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("quiz_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("quiz_theme", "light");
    }
    soundEngine.playPop();
  };

  const toggleAudio = () => {
    const next = !isAudioOn;
    setIsAudioOn(next);
    soundEngine.setAudioEnabled(next);
    if (next) soundEngine.playPop();
  };

  return (
    <header className="w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-emerald-200/60 dark:border-emerald-900/60 shadow-xs sticky top-0 z-30 px-3 py-2 sm:px-6 sm:py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* App Title & Back button */}
        <div className="flex items-center gap-2.5">
          {onBackToMenu && (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onBackToMenu();
              }}
              aria-label="Kembali ke menu utama"
              className="px-2.5 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-emerald-900 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-1 transition-colors cursor-pointer border border-emerald-300/80"
              title="Menu Utama"
            >
              <span>🏠</span>
              <span className="hidden sm:inline">Menu</span>
            </button>
          )}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center shadow-xs text-white font-black text-lg select-none">
            🌲
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-1.5">
              <span>Pilah Tumbuhan Hutan</span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                SD / MI
              </span>
            </h1>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Papan Interaktif Digital & Layar Sentuh
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Score & Streak */}
          <div className="flex items-center gap-1.5 bg-emerald-50/80 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-zinc-700">
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

          {/* Theme Toggle (Day ☀️ / Night 🌙 Forest) */}
          <button
            onClick={toggleTheme}
            title={isDarkMode ? "Ubah ke Hutan Siang Cerah" : "Ubah ke Hutan Malam Bercahaya"}
            aria-label="Toggle Tema Hutan"
            className={`p-2 rounded-xl text-sm font-semibold flex items-center gap-1 min-w-[40px] min-h-[40px] justify-center transition-all ${
              isDarkMode
                ? "bg-teal-950 text-teal-200 border border-teal-700 hover:bg-teal-900"
                : "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
            }`}
          >
            <span>{isDarkMode ? "🌙" : "☀️"}</span>
            <span className="hidden lg:inline text-xs font-bold">
              {isDarkMode ? "Malam" : "Siang"}
            </span>
          </button>

          {/* Unified Sound & BGM Button */}
          <button
            onClick={toggleAudio}
            title={isAudioOn ? "Matikan Musik & Efek Suara" : "Nyalakan Musik & Efek Suara"}
            aria-label="Toggle Musik & Suara"
            className={`p-2 rounded-xl text-sm font-medium flex items-center justify-center min-w-[40px] min-h-[40px] transition-all ${
              isAudioOn
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
            }`}
          >
            <span>{isAudioOn ? "🔊" : "🔇"}</span>
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
