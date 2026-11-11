"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { soundEngine } from "@/lib/audio";

interface MainMenuProps {
  onSelectMode: (mode: "basket" | "honeycomb" | "tracing" | "cut-paste") => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectMode }) => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    soundEngine.playClick();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignored if blocked
    }
  };

  const toggleAudio = () => {
    soundEngine.playClick();
    const next = !isAudioOn;
    setIsAudioOn(next);
    soundEngine.setAudioEnabled(next);
  };

  const handleSelect = (mode: "basket" | "honeycomb" | "tracing" | "cut-paste") => {
    soundEngine.playClick();
    soundEngine.startBgm();
    onSelectMode(mode);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-emerald-500 via-teal-600 to-emerald-700 flex flex-col justify-between p-4 sm:p-6 overflow-x-hidden select-none">
      {/* Decorative Floating Leaves & Flowers in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden flex justify-between p-12 text-white font-black text-8xl">
        <span className="animate-float">🌸</span>
        <span className="animate-float" style={{ animationDelay: "1s" }}>
          🌿
        </span>
        <span className="animate-float" style={{ animationDelay: "2s" }}>
          🍎
        </span>
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white text-emerald-700 font-black text-2xl flex items-center justify-center shadow-md">
            🌱
          </div>
          <div>
            <h1 className="text-white font-black text-lg sm:text-xl tracking-tight drop-shadow-sm">
              EduTumbuhan
            </h1>
            <p className="text-emerald-100 text-xs font-semibold">
              Game Interaktif Anak
            </p>
          </div>
        </div>

        {/* Header Action Buttons (Fullscreen & Sound) */}
        <div className="flex items-center gap-2.5">
          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 border border-white/30 cursor-pointer shadow-md"
          >
            {isFullscreen ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5h2z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>

          {/* Master Sound Button */}
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isAudioOn ? "Matikan suara" : "Nyalakan suara"}
            title={isAudioOn ? "Matikan suara" : "Nyalakan suara"}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 border border-white/30 cursor-pointer shadow-md"
          >
            {isAudioOn ? (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero Title */}
      <div className="relative z-10 text-center my-6 sm:my-8 max-w-2xl mx-auto">
        <span className="inline-block px-4 py-1.5 bg-yellow-400 text-yellow-950 font-black rounded-full text-xs sm:text-sm shadow-md mb-3 tracking-wide">
          ✨ SERU & MENYENANGKAN ✨
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md mb-2">
          Petualangan Bagian Tumbuhan
        </h2>
        <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-md mx-auto">
          Pilih petualanganmu! Belajar mengenal akar, batang, daun, bunga, dan buah dengan cara mengasyikkan.
        </p>
      </div>

      {/* Game Mode Selection Cards */}
      <main className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto w-full mb-8">
        {/* Card 1: Pilah Keranjang (Original Drag & Drop) */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.2)] border-3 border-emerald-300 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full">
                MODE KLASIK
              </span>
              <span className="text-3xl">🧺</span>
            </div>
            <div className="relative w-full h-28 sm:h-32 mb-4 flex items-center justify-center bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-2">
              <Image
                src="/assets/baskets/keranjang-buah.png"
                alt="Keranjang Buah"
                width={100}
                height={85}
                className="object-contain drop-shadow-md"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Pilah Keranjang
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm font-medium mb-5">
              Tarik atau sentuh bagian tumbuhan ke keranjang yang cocok!
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("basket")}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm shadow-[0_5px_0_#15803d] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Bermain</span>
            <span className="text-base">▶</span>
          </button>
        </div>

        {/* Card 2: Sarang Lebah (Honeycomb Game) */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.2)] border-3 border-amber-300 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full">
                MODE TANTANGAN 🌟
              </span>
              <span className="text-3xl">🍯</span>
            </div>
            <div className="relative w-full h-28 sm:h-32 mb-4 flex items-center justify-center bg-gradient-to-tr from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-2 gap-2">
              <div className="relative w-14 h-16 sm:w-16 sm:h-18">
                <Image
                  src="/assets/items/buah1.png"
                  alt="Buah"
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className="relative w-14 h-16 sm:w-16 sm:h-18">
                <Image
                  src="/assets/items/bunga1.png"
                  alt="Bunga"
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Sarang Lebah
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm font-medium mb-5">
              Dengarkan suara arahan, temukan bagian tumbuhan tersembunyi!
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("honeycomb")}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-[0_5px_0_#c2410c] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Bermain</span>
            <span className="text-base">▶</span>
          </button>
        </div>

        {/* Card 3: Menggambar Garis Tumbuhan (Tracing Game) */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.2)] border-3 border-rose-300 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-rose-100 text-rose-900 font-extrabold text-xs rounded-full">
                KREATIF & MENGGAMBAR 🎨
              </span>
              <span className="text-3xl">✏️</span>
            </div>
            <div className="relative w-full h-28 sm:h-32 mb-4 flex items-center justify-center bg-gradient-to-tr from-rose-50 to-red-50 rounded-2xl border border-rose-100 p-2 gap-3 text-4xl">
              <span className="animate-bounce">🍎</span>
              <span className="animate-pulse">🍃</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🌸</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Tebalkan Garis Tumbuhan
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm font-medium mb-5">
              Tarik garis urut dari nomor 1 ke 2! Lengkapi apel, daun, batang, bunga, & akar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("tracing")}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-sm shadow-[0_5px_0_#9f1239] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Menggambar</span>
            <span className="text-base">▶</span>
          </button>
        </div>

        {/* Card 4: Gunting & Tempel (Cut & Paste Worksheet Game) */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_12px_24px_rgba(0,0,0,0.2)] border-3 border-orange-300 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-900 font-extrabold text-xs rounded-full">
                KREASI &amp; LOGIKA ✂️
              </span>
              <span className="text-3xl">🧩</span>
            </div>
            <div className="relative w-full h-28 sm:h-32 mb-4 flex items-center justify-center bg-gradient-to-tr from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-2 gap-3 text-4xl">
              <span className="animate-bounce">✂️</span>
              <span className="animate-pulse">🌸</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🧴</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Gunting &amp; Tempel
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm font-medium mb-5">
              Rakit bunga dalam pot, pohon apel, &amp; wortel dengan menempelkan potongan ke siluet!
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("cut-paste")}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm shadow-[0_5px_0_#c2410c] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Menempel</span>
            <span className="text-base">▶</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-emerald-100/80 font-medium">
        Kuis Interaktif Mengenal Bagian Tumbuhan &bull; Ramah Anak & Edukatif
      </footer>
    </div>
  );
};
