"use client";

import React, { useState, useCallback, useEffect } from "react";
import { PLANT_CATEGORIES, PLANT_QUIZ_ITEMS } from "@/data/plantQuizData";
import { QuizItem, PlacedItem, Category } from "@/types/quiz";
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

interface GameBoardProps {
  onBackToMenu?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onBackToMenu }) => {
  // Category sequence: randomized on initial client load & reset
  const [categoryQueue, setCategoryQueue] = useState<Category[]>(() =>
    shuffleWithSeed(PLANT_CATEGORIES, 42)
  );
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // All 15 items pool initially displayed
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
  const [stageCelebration, setStageCelebration] = useState<{
    completedName: string;
    nextName?: string;
  } | null>(null);

  // Active Category
  const activeCategory = categoryQueue[currentStageIndex] || categoryQueue[0];
  const activeCategoryPlacedItems = placedItems.filter(
    (item) => item.categoryId === activeCategory.id
  );

  // Auto-play BGM immediately on load with passive fallback listeners
  useEffect(() => {
    // 1. Langsung putar BGM seketika saat halaman web diakses
    soundEngine.startBgm();

    // 2. Fallback otomatis jika browser menahan audio sebelum ada interaksi pertama
    const triggerBgm = () => {
      soundEngine.startBgm();
    };

    window.addEventListener("pointerdown", triggerBgm, { once: true });
    window.addEventListener("pointermove", triggerBgm, { once: true });
    window.addEventListener("keydown", triggerBgm, { once: true });
    window.addEventListener("touchstart", triggerBgm, { once: true });

    return () => {
      window.removeEventListener("pointerdown", triggerBgm);
      window.removeEventListener("pointermove", triggerBgm);
      window.removeEventListener("keydown", triggerBgm);
      window.removeEventListener("touchstart", triggerBgm);
    };
  }, []);

  // Reset Game
  const resetGame = useCallback(() => {
    const newQueue = shuffleClient(PLANT_CATEGORIES);
    setCategoryQueue(newQueue);
    setCurrentStageIndex(0);
    setRemainingItems(shuffleClient(PLANT_QUIZ_ITEMS));
    setPlacedItems([]);
    setSelectedItem(null);
    setShakingItemId(null);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setStageCelebration(null);
    setShowSummaryModal(false);
  }, []);

  // Handle Drag Start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: QuizItem) => {
    soundEngine.startBgm();
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
    soundEngine.playPop();
    setSelectedItem(item);
  };

  const handleDragEnd = () => {
    // Keep selection state
  };

  // Evaluate Answer against active category
  const processPlacement = (item: QuizItem, targetCategoryId: string) => {
    if (stageCelebration) return;

    const isCorrect = item.categoryId === activeCategory.id && targetCategoryId === activeCategory.id;

    if (isCorrect) {
      soundEngine.playSuccess();

      const nextStreak = streak + 1;
      const pointsEarned = 10 * nextStreak;
      setScore((prev) => prev + pointsEarned);
      setStreak(nextStreak);

      setFeedback({
        text: `🎉 Tepat sekali! Gambar bagian ${activeCategory.name} masuk keranjang! (+${pointsEarned} Poin)`,
        isError: false,
      });

      const nextRemaining = remainingItems.filter((i) => i.id !== item.id);
      setRemainingItems(nextRemaining);
      setPlacedItems((prev) => [...prev, { ...item, placedAt: Date.now() }]);
      setSelectedItem(null);

      // Check if current category completed (3 items placed)
      const currentCategoryCount = activeCategoryPlacedItems.length + 1;

      if (currentCategoryCount >= 3) {
        const isFinalStage = currentStageIndex + 1 >= categoryQueue.length;
        const nextCategory = categoryQueue[currentStageIndex + 1];

        soundEngine.playFanfare();
        setStageCelebration({
          completedName: activeCategory.name,
          nextName: nextCategory ? nextCategory.name : undefined,
        });

        setTimeout(() => {
          if (isFinalStage) {
            setStageCelebration(null);
            setShowSummaryModal(true);
          } else {
            setCurrentStageIndex((prev) => prev + 1);
            setStageCelebration(null);
            setFeedback({
              text: `🌿 Misi Baru: Kumpulkan 3 gambar bagian ${nextCategory.name}!`,
              isError: false,
            });
          }
        }, 1600);
      }
    } else {
      soundEngine.playError();
      setStreak(0);
      setShakingItemId(item.id);
      setFeedback({
        text: `❌ Kurang tepat! Gambar ini bukan bagian ${activeCategory.name}. Cari gambar ${activeCategory.name}!`,
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
    soundEngine.startBgm();
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden text-zinc-900 dark:text-zinc-100 select-none pb-6">
      {/* ============================================================== */}
      {/* ILUSTRASI LATAR BELAKANG PEMANDANGAN HUTAN LENGKAP             */}
      {/* ============================================================== */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden transition-colors duration-500">
        {/* Langit Hutan (Siang Cerah vs Malam Zamrud) */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-emerald-100/70 to-emerald-200/50 dark:from-slate-950 dark:via-teal-950 dark:to-emerald-950" />

        {/* Matahari / Bulan & Awan Kartun */}
        <div className="absolute top-12 left-10 w-24 h-24 rounded-full bg-amber-300/80 dark:bg-amber-100/30 blur-xs transition-all duration-700 dark:left-auto dark:right-16 dark:w-18 dark:h-18 dark:bg-amber-100/70" />
        <div className="absolute top-16 left-24 w-36 h-12 bg-white/50 dark:bg-teal-900/20 rounded-full blur-xs" />
        <div className="absolute top-24 right-20 w-48 h-14 bg-white/40 dark:bg-teal-900/15 rounded-full blur-xs" />

        {/* Siluet Hutan Bukit Belakang */}
        <svg
          className="absolute bottom-0 w-full h-[400px] text-emerald-300/40 dark:text-emerald-950/40 preserve-3d"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,144C672,149,768,203,864,208C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>

        {/* Siluet Pepohonan Rindang Hutan Tengah */}
        <svg
          className="absolute bottom-0 w-full h-[280px] text-emerald-400/50 dark:text-teal-900/35"
          viewBox="0 0 1440 260"
          fill="currentColor"
        >
          <path d="M0,96L30,117.3C60,139,120,181,180,181.3C240,181,300,139,360,128C420,117,480,139,540,165.3C600,192,660,224,720,208C780,192,840,128,900,117.3C960,107,1020,149,1080,165.3C1140,181,1200,171,1260,149.3C1320,128,1380,96,1410,80L1440,64L1440,260L1410,260C1380,260,1320,260,1260,260C1200,260,1140,260,1080,260C1020,260,960,260,900,260C840,260,780,260,720,260C660,260,600,260,540,260C480,260,420,260,360,260C300,260,240,260,180,260C120,260,60,260,30,260L0,260Z" />
        </svg>

        {/* Bukit Rumput Hijau Segar Depan */}
        <svg
          className="absolute -bottom-8 w-full h-[180px] text-emerald-500/30 dark:text-emerald-900/40"
          viewBox="0 0 1440 180"
          fill="currentColor"
        >
          <path d="M0,64L60,80C120,96,240,128,360,128C480,128,600,96,720,90.7C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z" />
        </svg>
      </div>

      {/* Header Bar */}
      <HeaderControls
        score={score}
        streak={streak}
        onReset={resetGame}
        onBackToMenu={onBackToMenu}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-3 lg:p-4 flex flex-col justify-between gap-2 sm:gap-3">
        {/* ============================================================== */}
        {/* ADAPTIVE SPLIT WORKSPACE: 1 Kolom di Mobile, 2 Kolom di PID    */}
        {/* ============================================================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-start">
          {/* ============================================================ */}
          {/* SISI KIRI (7 Kolom di Layar Lebar/PID): KOLEKSI GAMBAR       */}
          {/* ============================================================ */}
          <section className="w-full lg:col-span-7 flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs sm:text-sm font-black tracking-wide uppercase text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <span className="text-base">🖼️</span>
                <span>Pilihan Gambar ({remainingItems.length} tersisa)</span>
              </h2>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Sentuh gelembung untuk memilih
              </span>
            </div>

            <div className="bg-white/80 dark:bg-emerald-950/60 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-2 border-emerald-300/80 dark:border-emerald-700/60 min-h-[140px] flex items-center justify-center shadow-lg">
              {remainingItems.length === 0 ? (
                <div className="text-center py-4 animate-scale-up">
                  <span className="text-5xl block mb-2">🏆</span>
                  <p className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300">
                    Luar biasa! Semua 15 gambar tumbuhan sudah berhasil dipilah!
                  </p>
                  <button
                    onClick={() => setShowSummaryModal(true)}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    Lihat Rangkuman Hasil
                  </button>
                </div>
              ) : (
                <div className="w-full grid grid-cols-5 gap-2 sm:gap-2.5 justify-items-center">
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

          {/* ============================================================ */}
          {/* SISI KANAN (5 Kolom di Layar Lebar/PID): MISI, STEPPER, HERO */}
          {/* ============================================================ */}
          <section className="w-full lg:col-span-5 flex flex-col gap-2 sm:gap-2.5">
            {/* Banner Misi & Feedback */}
            <div className="bg-white/85 dark:bg-emerald-950/70 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-md border-2 border-emerald-300/80 dark:border-emerald-700/60 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl animate-bounce">🎯</span>
                <div>
                  <p className="text-xs sm:text-sm font-black text-emerald-900 dark:text-emerald-100">
                    Tahap {currentStageIndex + 1}/5: Bagian{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 underline decoration-wavy font-extrabold">
                      {activeCategory.name}
                    </span>!
                  </p>
                  <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                    Sentuh gelembung lalu sentuh keranjang
                  </p>
                </div>
              </div>

              {feedback && (
                <div
                  className={`text-xs font-black px-2.5 py-1 rounded-xl border animate-slide-down flex items-center gap-1.5 shadow-xs ${
                    feedback.isError
                      ? "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/80 dark:text-red-200 dark:border-red-700"
                      : "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/80 dark:text-emerald-200 dark:border-emerald-600"
                  }`}
                >
                  <span>{feedback.text}</span>
                </div>
              )}
            </div>

            {/* Stepper Indikator Progres 5 Misi */}
            <div className="w-full flex items-center justify-between px-2 sm:px-3 py-1.5 rounded-2xl bg-white/70 dark:bg-emerald-950/50 backdrop-blur-xs border border-emerald-200 dark:border-emerald-800 shadow-xs">
              {categoryQueue.map((cat, idx) => {
                const isPast = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={cat.id} className="flex items-center gap-1 sm:gap-1.5">
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-black transition-all ${
                        isPast
                          ? "bg-emerald-500 text-white shadow-xs"
                          : isCurrent
                          ? "bg-amber-400 text-amber-950 ring-2 ring-amber-300/80 scale-105 shadow-md animate-pulse"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      <span>{isPast ? "✓" : isCurrent ? "⭐" : "🔒"}</span>
                      <span className="hidden sm:inline">{cat.name}</span>
                    </div>

                    {idx < categoryQueue.length - 1 && (
                      <div
                        className={`h-1 w-2 sm:w-4 rounded-full ${
                          isPast
                            ? "bg-emerald-500"
                            : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hero Basket Container */}
            <div className="w-full flex justify-center relative">
              <BasketContainer
                category={activeCategory}
                placedItems={activeCategoryPlacedItems}
                selectedItem={selectedItem}
                isHero={true}
                onDropItem={handleDropItem}
                onPlaceSelectedItem={handlePlaceSelectedItem}
              />

              {/* Efek Perayaan Antar Tahap Keranjang Selesai (~1.5 detik) */}
              {stageCelebration && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 dark:bg-emerald-950/90 backdrop-blur-sm rounded-3xl animate-scale-up border-4 border-amber-400 shadow-2xl p-4 sm:p-6 text-center">
                  <div>
                    <span className="text-4xl sm:text-5xl block mb-1 animate-bounce">
                      🎉
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-emerald-800 dark:text-emerald-200">
                      Hebat! Misi Keranjang {stageCelebration.completedName} Selesai!
                    </h3>
                    {stageCelebration.nextName ? (
                      <p className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-300 mt-1">
                        Bersiap menuju keranjang <b>{stageCelebration.nextName}</b>...
                      </p>
                    ) : (
                      <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                        Semua misi keranjang telah tuntas!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer Navigasi & Tips Pembelajaran */}
        <footer className="pt-2 flex flex-wrap items-center justify-between text-xs font-semibold text-emerald-900/80 dark:text-emerald-200/80 gap-2 border-t border-emerald-300/40 dark:border-emerald-800/40">
          <div className="flex items-center gap-3">
            <span>👆 <b>Sentuh:</b> Ketuk gelembung gambar lalu ketuk keranjang.</span>
            <span className="hidden sm:inline">🖱️ <b>Tarik:</b> Geser gelembung langsung ke keranjang.</span>
          </div>
          <div>
            <span>IPA SD/MI - Mengenal Bagian Tubuh Tumbuhan</span>
          </div>
        </footer>
      </main>

      {/* Celebration Modal Akhir Permainan */}
      <EducationSummaryModal
        isOpen={showSummaryModal}
        score={score}
        onPlayAgain={resetGame}
      />
    </div>
  );
};
