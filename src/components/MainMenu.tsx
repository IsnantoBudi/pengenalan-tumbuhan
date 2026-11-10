"use client";

import React, { useState } from "react";
import Image from "next/image";
import { soundEngine } from "@/lib/audio";

interface MainMenuProps {
  onSelectMode: (mode: "basket" | "honeycomb") => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectMode }) => {
  const [isAudioOn, setIsAudioOn] = useState(true);

  const toggleAudio = () => {
    soundEngine.playClick();
    const next = !isAudioOn;
    setIsAudioOn(next);
    soundEngine.setAudioEnabled(next);
  };

  const handleSelect = (mode: "basket" | "honeycomb") => {
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

        {/* Master Sound Button */}
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isAudioOn ? "Matikan suara" : "Nyalakan suara"}
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
      <main className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto w-full mb-8">
        {/* Card 1: Pilah Keranjang (Original Drag & Drop) */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-[0_12px_24px_rgba(0,0,0,0.2)] border-3 border-emerald-300 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full">
                MODE KLASIK
              </span>
              <span className="text-3xl">🧺</span>
            </div>
            <div className="relative w-full h-32 sm:h-36 mb-4 flex items-center justify-center bg-gradient-to-tr from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-2">
              <Image
                src="/assets/baskets/keranjang-buah.png"
                alt="Keranjang Buah"
                width={120}
                height={100}
                className="object-contain drop-shadow-md"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Pilah Keranjang
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-6">
              Tarik atau sentuh bagian tumbuhan yang diminta ke dalam keranjang yang tepat!
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("basket")}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base shadow-[0_5px_0_#15803d] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Bermain</span>
            <span className="text-lg">▶</span>
          </button>
        </div>

        {/* Card 2: Sarang Lebah (New Honeycomb Game) */}
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-[0_12px_24px_rgba(0,0,0,0.2)] border-3 border-amber-300 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-full">
                MODE BARU 🌟
              </span>
              <span className="text-3xl">🍯</span>
            </div>
            <div className="relative w-full h-32 sm:h-36 mb-4 flex items-center justify-center bg-gradient-to-tr from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-2 gap-2">
              <div className="relative w-16 h-18 sm:w-20 sm:h-22">
                <Image
                  src="/assets/items/buah1.png"
                  alt="Buah"
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div className="relative w-16 h-18 sm:w-20 sm:h-22">
                <Image
                  src="/assets/items/bunga1.png"
                  alt="Bunga"
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Sarang Lebah Tumbuhan
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-6">
              Dengarkan suara arahan, lalu ketuk seluruh bagian tumbuhan tersembunyi di sarang lebah!
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSelect("honeycomb")}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base shadow-[0_5px_0_#c2410c] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Mulai Bermain</span>
            <span className="text-lg">▶</span>
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
