"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { PLANT_CATEGORIES, PLANT_QUIZ_ITEMS } from "@/data/plantQuizData";
import { Category, QuizItem } from "@/types/quiz";
import { soundEngine } from "@/lib/audio";
import { launchConfetti } from "@/lib/confetti";
import { HexagonTile, HexagonColor } from "./HexagonTile";

interface HoneycombGameProps {
  onBackToMenu: () => void;
}

interface HexSlot {
  col: number;
  rowOffset: number;
  colPhase: number;
}

interface BoardTile {
  item: QuizItem;
  colorTheme: HexagonColor;
  isTarget: boolean;
  slot: HexSlot;
}

// 15 Flat-Topped Honeycomb Slots matching the 5-column cluster layout in reference image
const HEX_SLOTS: HexSlot[] = [
  // Column 0 (2 tiles) - Leftmost
  { col: 0, rowOffset: 0, colPhase: 1.0 },
  { col: 0, rowOffset: 1, colPhase: 1.0 },

  // Column 1 (4 tiles)
  { col: 1, rowOffset: 0, colPhase: 0.5 },
  { col: 1, rowOffset: 1, colPhase: 0.5 },
  { col: 1, rowOffset: 2, colPhase: 0.5 },
  { col: 1, rowOffset: 3, colPhase: 0.5 },

  // Column 2 (4 tiles) - Center column, top starts highest
  { col: 2, rowOffset: 0, colPhase: 0.0 },
  { col: 2, rowOffset: 1, colPhase: 0.0 },
  { col: 2, rowOffset: 2, colPhase: 0.0 },
  { col: 2, rowOffset: 3, colPhase: 0.0 },

  // Column 3 (4 tiles)
  { col: 3, rowOffset: 0, colPhase: 0.5 },
  { col: 3, rowOffset: 1, colPhase: 0.5 },
  { col: 3, rowOffset: 2, colPhase: 0.5 },
  { col: 3, rowOffset: 3, colPhase: 0.5 },

  // Column 4 (1 tile) - Rightmost
  { col: 4, rowOffset: 1, colPhase: 1.0 },
];

const CANDY_COLORS: HexagonColor[] = [
  "pink",
  "amber",
  "cyan",
  "green",
  "orange",
];

const TOTAL_STAGES = 5;

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate 15 board tiles for a given target category with exact slot coordinates
function buildBoardTiles(targetCat: Category): BoardTile[] {
  const targetItems = PLANT_QUIZ_ITEMS.filter(
    (item) => item.categoryId === targetCat.id
  );

  const distractorItems = PLANT_QUIZ_ITEMS.filter(
    (item) => item.categoryId !== targetCat.id
  );

  const combinedItems = shuffleArray([
    ...targetItems.map((item) => ({ item, isTarget: true })),
    ...distractorItems.map((item) => ({ item, isTarget: false })),
  ]);

  return HEX_SLOTS.map((slot, idx) => ({
    item: combinedItems[idx].item,
    isTarget: combinedItems[idx].isTarget,
    colorTheme: CANDY_COLORS[idx % CANDY_COLORS.length],
    slot,
  }));
}

export const HoneycombGame: React.FC<HoneycombGameProps> = ({ onBackToMenu }) => {
  const categories = useMemo(() => PLANT_CATEGORIES, []);
  const [stageIndex, setStageIndex] = useState(0);
  const activeCategory: Category = categories[stageIndex % categories.length];

  const [boardTiles, setBoardTiles] = useState<BoardTile[]>(() =>
    buildBoardTiles(PLANT_CATEGORIES[0])
  );
  const [foundItemIds, setFoundItemIds] = useState<string[]>([]);
  const [poppingItemId, setPoppingItemId] = useState<string | null>(null);
  const [shakingItemId, setShakingItemId] = useState<string | null>(null);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [roundCelebration, setRoundCelebration] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync fullscreen state
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Announce TTS prompt
  const announceInstruction = useCallback((catName: string) => {
    soundEngine.speak(`Carilah seluruh ${catName.toLowerCase()}!`);
  }, []);

  // Announce voice only on initial start
  useEffect(() => {
    const timer = setTimeout(() => {
      announceInstruction(PLANT_CATEGORIES[0].name);
    }, 450);
    return () => clearTimeout(timer);
  }, [announceInstruction]);

  // Transition to next round sequentially after speech finishes
  const goToNextRound = useCallback((nextIdx: number) => {
    const nextCategory = categories[nextIdx % categories.length];
    setStageIndex(nextIdx);
    setBoardTiles(buildBoardTiles(nextCategory));
    setFoundItemIds([]);
    setPoppingItemId(null);
    setShakingItemId(null);
    setRoundCelebration(null);
    setIsAdvancing(false);

    // Speak next instruction after short pause
    setTimeout(() => {
      soundEngine.speak(`Carilah seluruh ${nextCategory.name.toLowerCase()}!`);
    }, 400);
  }, [categories]);

  // Handle tile click
  const handleTileClick = (tile: BoardTile) => {
    if (poppingItemId || isGameOver || isVictoryModalOpen || isAdvancing) return;

    if (tile.isTarget) {
      // Correct target clicked!
      soundEngine.playSuccess();
      setPoppingItemId(tile.item.id);
      setScore((prev) => prev + 100);

      setTimeout(() => {
        const nextFound = [...foundItemIds, tile.item.id];
        setFoundItemIds(nextFound);
        setPoppingItemId(null);

        // Check if all 3 targets in this round are found
        const totalTargetCount = boardTiles.filter((t) => t.isTarget).length;
        if (nextFound.length >= totalTargetCount) {
          setIsAdvancing(true);
          setScore((prev) => prev + 250); // bonus point for stage clear
          soundEngine.playFanfare();

          if (canvasRef.current) {
            launchConfetti(canvasRef.current, 3000);
          }

          setRoundCelebration(activeCategory.name);

          const isFinalStage = stageIndex >= TOTAL_STAGES - 1;

          if (isFinalStage) {
            // Complete all 5 stages!
            soundEngine.speak(
              `Luar biasa! Kamu berhasil menyelesaikan seluruh petualangan sarang lebah!`,
              () => {
                setRoundCelebration(null);
                setIsVictoryModalOpen(true);
                setIsAdvancing(false);
              }
            );

            // Fallback safety timeout if onend is not triggered
            setTimeout(() => {
              setRoundCelebration(null);
              setIsVictoryModalOpen(true);
              setIsAdvancing(false);
            }, 3600);
          } else {
            // Sequential speech: wait for praise to finish before changing round
            const nextIdx = stageIndex + 1;
            let hasAdvanced = false;

            const handleSpeechDone = () => {
              if (hasAdvanced) return;
              hasAdvanced = true;
              goToNextRound(nextIdx);
            };

            soundEngine.speak(
              `Luar biasa! Semua ${activeCategory.name.toLowerCase()} berhasil ditemukan!`,
              handleSpeechDone
            );

            // Fallback safety timeout in case onend event is delayed
            setTimeout(() => {
              handleSpeechDone();
            }, 3600);
          }
        }
      }, 350);
    } else {
      // Wrong tile clicked
      soundEngine.playError();
      setShakingItemId(tile.item.id);

      setTimeout(() => {
        setShakingItemId(null);
      }, 600);

      const nextHearts = hearts - 1;
      setHearts(nextHearts);

      if (nextHearts <= 0) {
        setIsGameOver(true);
        soundEngine.speak("Yah, kesempatanmu habis. Ayo coba lagi!");
      }
    }
  };

  // Replay game from beginning
  const handleRestart = () => {
    soundEngine.playClick();
    setHearts(3);
    setScore(0);
    setStageIndex(0);
    setIsGameOver(false);
    setIsVictoryModalOpen(false);
    setRoundCelebration(null);
    setIsAdvancing(false);
    setBoardTiles(buildBoardTiles(categories[0]));
    setFoundItemIds([]);
    setPoppingItemId(null);
    setShakingItemId(null);
    setTimeout(() => {
      announceInstruction(categories[0].name);
    }, 400);
  };

  // Toggle master audio
  const handleToggleAudio = () => {
    soundEngine.playClick();
    const next = !isAudioOn;
    setIsAudioOn(next);
    soundEngine.setAudioEnabled(next);
  };

  // Toggle fullscreen mode
  const handleToggleFullscreen = async () => {
    soundEngine.playClick();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Browser permissions guard
    }
  };

  // Remaining targets count
  const remainingCount = useMemo(() => {
    const totalTargets = boardTiles.filter((t) => t.isTarget).length;
    return Math.max(0, totalTargets - foundItemIds.length);
  }, [boardTiles, foundItemIds]);

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500 flex flex-col justify-between overflow-x-hidden select-none">
      {/* Background Subtle Watermark Leaf Motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-6 py-12 text-zinc-900 font-black text-9xl">
        <span className="transform -rotate-12">🌿</span>
        <span className="transform rotate-12">🌸</span>
        <span className="transform -rotate-45">🍎</span>
      </div>

      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* ================= TOP BAR ================= */}
      <header className="relative z-20 w-full px-3 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-2 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onBackToMenu();
          }}
          aria-label="Kembali ke menu"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-red-500 to-rose-600 text-white font-bold text-xl flex items-center justify-center shadow-[0_4px_0_#991b1b] active:translate-y-1 active:shadow-none transition-all cursor-pointer hover:brightness-110"
        >
          <svg
            className="w-6 h-6 stroke-white fill-none stroke-3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Center Target Instruction Card */}
        <div className="flex-1 max-w-xl mx-2 flex items-center justify-between bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl sm:rounded-full px-4 py-2 sm:px-6 sm:py-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.15)] border-2 border-amber-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                announceInstruction(activeCategory.name);
              }}
              aria-label="Ulangi suara instruksi"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform"
              title="Dengarkan Suara"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </button>
            <div className="flex flex-col">
              <span className="text-zinc-800 dark:text-zinc-100 font-extrabold text-sm sm:text-base md:text-lg tracking-wide">
                Carilah seluruh{" "}
                <span className="text-amber-600 dark:text-amber-400 underline decoration-wavy underline-offset-4">
                  {activeCategory.name}
                </span>{" "}
                !
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Tahap {stageIndex + 1}/{TOTAL_STAGES} &bull; Sisa: {remainingCount}
              </span>
            </div>
          </div>

          {/* Hearts / Lives */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-amber-200">
            {[1, 2, 3].map((heartIndex) => (
              <span
                key={heartIndex}
                className={`text-base sm:text-lg transition-transform ${
                  heartIndex <= hearts
                    ? "scale-100"
                    : "scale-75 opacity-30 grayscale"
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls (Fullscreen & Audio) */}
        <div className="flex items-center gap-2">
          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? "Keluar layar penuh" : "Masuk layar penuh"}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-red-500 to-rose-600 text-white font-bold text-xl flex items-center justify-center shadow-[0_4px_0_#991b1b] active:translate-y-1 active:shadow-none transition-all cursor-pointer hover:brightness-110"
          >
            {isFullscreen ? (
              <svg className="w-5 h-5 fill-none stroke-white stroke-2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v5H4m11-5v5h5M4 15h5v5m11-5h-5v5" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-none stroke-white stroke-2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5m6 0h5v5M4 15v5h5m11-5v5h-5" />
              </svg>
            )}
          </button>

          {/* Audio Toggle Button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label={isAudioOn ? "Matikan audio" : "Nyalakan audio"}
            title={isAudioOn ? "Matikan Suara" : "Nyalakan Suara"}
            className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-b from-red-500 to-rose-600 text-white font-bold text-xl flex items-center justify-center shadow-[0_4px_0_#991b1b] active:translate-y-1 active:shadow-none transition-all cursor-pointer hover:brightness-110"
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

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-4 px-2 py-2 sm:py-4 max-w-6xl mx-auto w-full">
        {/* Left Progress Bar / Stars */}
        <aside className="flex md:flex-col items-center gap-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-5 rounded-2xl sm:rounded-3xl shadow-[0_6px_0_rgba(0,0,0,0.12)] border border-amber-200">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-zinc-900 font-black text-sm sm:text-base shadow-xs">
            {stageIndex + 1}
          </div>
          <div className="h-4 w-32 md:w-5 md:h-48 bg-amber-100 rounded-full overflow-hidden p-0.5 flex md:flex-col-reverse justify-start border border-amber-300">
            <div
              className="bg-gradient-to-r md:bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{
                width: "100%",
                height: `${Math.min(100, ((stageIndex + 1) / TOTAL_STAGES) * 100)}%`,
              }}
            />
          </div>
          <div className="flex md:flex-col gap-1 text-lg sm:text-xl">
            <span className={stageIndex >= 1 ? "opacity-100" : "opacity-30 grayscale"}>
              ⭐
            </span>
            <span className={stageIndex >= 3 ? "opacity-100" : "opacity-30 grayscale"}>
              ⭐
            </span>
            <span className={stageIndex >= 4 ? "opacity-100" : "opacity-30 grayscale"}>
              ⭐
            </span>
          </div>
        </aside>

        {/* Honeycomb Perfectly Interlocking 15-Hexagon Cluster */}
        <section
          aria-label="Sarang lebah tumbuhan"
          className="flex-1 flex items-center justify-center py-2 sm:py-4 w-full overflow-hidden"
        >
          {/* Responsive mathematical honeycomb canvas */}
          <div
            className="relative mx-auto [--hex-w:72px] [--hex-h:62px] sm:[--hex-w:92px] sm:[--hex-h:79px] md:[--hex-w:106px] md:[--hex-h:91px]"
            style={{
              width: "calc(4 * (0.75 * var(--hex-w) + 2px) + var(--hex-w))",
              height: "calc(4.5 * (var(--hex-h) + 2px))",
            }}
          >
            {boardTiles.map((tile) => (
              <div
                key={tile.item.id}
                className="absolute transition-all duration-200"
                style={{
                  left: `calc(${tile.slot.col} * (0.75 * var(--hex-w) + 2px))`,
                  top: `calc(${tile.slot.rowOffset + tile.slot.colPhase} * (var(--hex-h) + 2px))`,
                  width: "var(--hex-w)",
                  height: "var(--hex-h)",
                }}
              >
                <HexagonTile
                  id={tile.item.id}
                  imageSrc={tile.item.imageSrc}
                  colorTheme={tile.colorTheme}
                  isFound={foundItemIds.includes(tile.item.id)}
                  isPopping={poppingItemId === tile.item.id}
                  isShaking={shakingItemId === tile.item.id}
                  onClick={() => handleTileClick(tile)}
                  disabled={isGameOver || isVictoryModalOpen || isAdvancing}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= CELEBRATION TOAST ================= */}
      {roundCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-scale-up">
          <div className="bg-gradient-to-b from-amber-300 to-yellow-400 border-4 border-white p-6 sm:p-8 rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.3)] text-center max-w-sm w-full">
            <span className="text-6xl block mb-2 animate-bounce">🎉</span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mb-1">
              Hebat Sekali!
            </h2>
            <p className="text-amber-900 font-bold text-base sm:text-lg mb-3">
              Semua {roundCelebration} berhasil kamu temukan!
            </p>
            <div className="inline-block px-4 py-1.5 bg-amber-500 text-white font-extrabold rounded-full text-sm shadow-xs">
              Mempersiapkan babak berikutnya...
            </div>
          </div>
        </div>
      )}

      {/* ================= VICTORY & SCORE MODAL ================= */}
      {isVictoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-scale-up">
          <div className="bg-white dark:bg-zinc-900 border-4 border-amber-400 p-6 sm:p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
            <span className="text-6xl block mb-2 animate-bounce">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Misi Selesai!
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 font-medium text-sm mb-4">
              Selamat! Kamu berhasil menaklukkan seluruh bagian tumbuhan!
            </p>

            {/* Stars Award */}
            <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl mb-5">
              <span className={hearts >= 1 ? "animate-bounce" : "opacity-30 grayscale"}>
                ⭐
              </span>
              <span className={hearts >= 2 ? "animate-bounce" : "opacity-30 grayscale"} style={{ animationDelay: "0.15s" }}>
                ⭐
              </span>
              <span className={hearts >= 3 ? "animate-bounce" : "opacity-30 grayscale"} style={{ animationDelay: "0.3s" }}>
                ⭐
              </span>
            </div>

            {/* Score & Stats Card */}
            <div className="bg-amber-50 dark:bg-zinc-800 rounded-2xl p-4 border border-amber-200 dark:border-zinc-700 mb-6 flex items-center justify-around">
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase block">Total Skor</span>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{score}</span>
              </div>
              <div className="w-px h-8 bg-amber-200 dark:bg-zinc-700" />
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase block">Tahap Selesai</span>
                <span className="text-2xl font-black text-emerald-600">5 / 5</span>
              </div>
              <div className="w-px h-8 bg-amber-200 dark:bg-zinc-700" />
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase block">Sisa Nyawa</span>
                <span className="text-xl font-bold">
                  {"❤️".repeat(hearts)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold rounded-2xl shadow-[0_5px_0_#15803d] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-base flex items-center justify-center gap-2"
              >
                <span>🔄 Main Lagi</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onBackToMenu();
                }}
                className="w-full py-3 px-6 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold rounded-2xl transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <span>🏠 Kembali ke Menu Utama</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= GAME OVER MODAL ================= */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-scale-up">
          <div className="bg-white dark:bg-zinc-900 border-4 border-red-400 p-6 sm:p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full">
            <span className="text-5xl block mb-3 animate-shake">💔</span>
            <h2 className="text-2xl sm:text-3xl font-black text-red-600 mb-2">
              Kesempatan Habis!
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 font-medium text-sm sm:text-base mb-6">
              Jangan menyerah! Ayo coba lagi dan amati bentuk bagian tumbuhannya
              dengan cermat!
            </p>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold rounded-2xl shadow-[0_4px_0_#0f766e] active:translate-y-1 active:shadow-none transition-all cursor-pointer text-base"
              >
                🔄 Main Lagi
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onBackToMenu();
                }}
                className="w-full py-2.5 px-6 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold rounded-2xl transition-colors cursor-pointer text-sm"
              >
                🏠 Kembali ke Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Padding */}
      <footer className="h-6" />
    </main>
  );
};
