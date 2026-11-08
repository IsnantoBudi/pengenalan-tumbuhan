"use client";

import React, { useState, useCallback } from "react";
import { PLANT_CATEGORIES, PLANT_QUIZ_ITEMS } from "@/data/plantQuizData";
import { QuizItem, PlacedItem } from "@/types/quiz";
import { HeaderControls } from "./HeaderControls";
import { DraggableItem } from "./DraggableItem";
import { BasketContainer } from "./BasketContainer";
import { EducationSummaryModal } from "./EducationSummaryModal";
import { soundEngine } from "@/lib/audio";

// Deterministic pseudo-random shuffle for SSR prerender purity
function shuffleWithSeed<T>(array: T[], seed = 42): T[] {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    const j = Math.floor(rnd * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Client-side random shuffle for reset/replay events
function shuffleClient<T>(array: T[]): T[] {
  return shuffleWithSeed(array, Date.now());
}

export const GameBoard: React.FC = () => {
  const [remainingItems, setRemainingItems] = useState<QuizItem[]>(() =>
    shuffleWithSeed(PLANT_QUIZ_ITEMS, 42)
  );
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<QuizItem | null>(null);
  const [shakingItemId, setShakingItemId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  // Reset Game
  const resetGame = useCallback(() => {
    setRemainingItems(shuffleClient(PLANT_QUIZ_ITEMS));
    setPlacedItems([]);
    setSelectedItem(null);
    setShakingItemId(null);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setShowSummaryModal(false);
  }, []);

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: QuizItem) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
    soundEngine.playPop();
    setSelectedItem(item);
  };

  const handleDragEnd = () => {
    // Keep selection or reset as needed
  };

  // Evaluate Answer
  const processPlacement = (item: QuizItem, targetCategoryId: string) => {
    const isCorrect = item.categoryId === targetCategoryId;
    const targetCategory = PLANT_CATEGORIES.find((c) => c.id === targetCategoryId);
    const categoryName = targetCategory ? targetCategory.name : targetCategoryId;

    if (isCorrect) {
      soundEngine.playSuccess();

      const nextStreak = streak + 1;
      const pointsEarned = 10 * nextStreak;
      setScore((prev) => prev + pointsEarned);
      setStreak(nextStreak);

      setFeedback({
        text: `🎉 Benar! Masuk ke keranjang ${categoryName}! (+${pointsEarned} Poin)`,
        isError: false,
      });

      const newRemaining = remainingItems.filter((i) => i.id !== item.id);
      setRemainingItems(newRemaining);
      setPlacedItems((prev) => [...prev, { ...item, placedAt: Date.now() }]);
      setSelectedItem(null);

      // Check level completion (all 15 items placed)
      if (newRemaining.length === 0) {
        setTimeout(() => {
          setShowSummaryModal(true);
        }, 500);
      }
    } else {
      soundEngine.playError();

      setStreak(0);
      setShakingItemId(item.id);
      setFeedback({
        text: `❌ Kurang tepat. Bukan keranjang ${categoryName}.`,
        isError: true,
      });

      setTimeout(() => {
        setShakingItemId(null);
      }, 700);
    }
  };

  const handleDropItem = (item: QuizItem, targetCategoryId: string) => {
    processPlacement(item, targetCategoryId);
  };

  const handlePlaceSelectedItem = (targetCategoryId: string) => {
    if (!selectedItem) return;
    processPlacement(selectedItem, targetCategoryId);
  };

  const handleSelectItem = (item: QuizItem) => {
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/70 via-sky-50/40 to-amber-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 select-none pb-6">
      {/* Top Header */}
      <HeaderControls
        score={score}
        streak={streak}
        onReset={resetGame}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col justify-between gap-3 sm:gap-4">
        {/* Instruction and Feedback Banner */}
        <div className="bg-white/90 dark:bg-zinc-800/80 rounded-2xl p-2.5 sm:p-3 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🌱</span>
            <p className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-100">
              Pindahkan gambar di atas ke dalam keranjang yang tepat di bawah!
            </p>
          </div>

          {feedback && (
            <div
              className={`text-xs font-bold px-3 py-1 rounded-xl border animate-slide-down flex items-center gap-1.5 shadow-xs ${
                feedback.isError
                  ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
              }`}
            >
              <span>{feedback.text}</span>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 1. BAGIAN ATAS: KARTU-KARTU GAMBAR YANG HARUS DIPILAH (POOL)    */}
        {/* ============================================================== */}
        <section className="w-full">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-xs sm:text-sm font-black tracking-wider uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span>🖼️</span>
              <span>Pilihan Gambar (Tersisa: {remainingItems.length} dari 15)</span>
            </h2>
          </div>

          <div className="bg-white/80 dark:bg-zinc-800/60 rounded-3xl p-3 sm:p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 min-h-[120px] sm:min-h-[140px] flex items-center justify-center shadow-inner">
            {remainingItems.length === 0 ? (
              <div className="text-center py-2 animate-scale-up">
                <span className="text-4xl block mb-1">🎉</span>
                <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                  Luar biasa! Semua 15 gambar sudah berhasil dipilah ke keranjang!
                </p>
                <button
                  onClick={() => setShowSummaryModal(true)}
                  className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-md hover:bg-emerald-700 transition-colors"
                >
                  Lihat Hasil
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {remainingItems.map((item) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItem?.id === item.id}
                    isShaking={shakingItemId === item.id}
                    onSelect={handleSelectItem}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. BAGIAN BAWAH: 5 KERANJANG TUJUAN DENGAN 3 SLOT MINIATUR       */}
        {/* ============================================================== */}
        <section className="w-full mt-1">
          <div className="flex items-center justify-between mb-1.5">
            <h2 className="text-xs sm:text-sm font-black tracking-wider uppercase text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <span>🧺</span>
              <span>Keranjang Tujuan ({placedItems.length} dari 15 Selesai)</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {PLANT_CATEGORIES.map((category) => {
              const categoryPlacedItems = placedItems.filter(
                (item) => item.categoryId === category.id
              );
              return (
                <BasketContainer
                  key={category.id}
                  category={category}
                  placedItems={categoryPlacedItems}
                  selectedItem={selectedItem}
                  onDropItem={handleDropItem}
                  onPlaceSelectedItem={handlePlaceSelectedItem}
                />
              );
            })}
          </div>
        </section>

        {/* Footer Helper */}
        <footer className="pt-2 flex flex-wrap items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span>👆 <b>Sentuh:</b> Ketuk gambar di atas lalu ketuk keranjang di bawah.</span>
            <span className="hidden sm:inline">🖱️ <b>Tarik:</b> Geser gambar ke keranjang.</span>
          </div>
          <div>
            <span>IPA SD/MI - Memilah Bagian Tumbuhan</span>
          </div>
        </footer>
      </main>

      {/* Celebration Modal */}
      <EducationSummaryModal
        isOpen={showSummaryModal}
        score={score}
        onPlayAgain={resetGame}
      />
    </div>
  );
};
