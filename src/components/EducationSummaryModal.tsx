"use client";

import React, { useEffect, useRef } from "react";
import { launchConfetti } from "@/lib/confetti";
import { soundEngine } from "@/lib/audio";

interface EducationSummaryModalProps {
  isOpen: boolean;
  score: number;
  onPlayAgain: () => void;
}

export const EducationSummaryModal: React.FC<EducationSummaryModalProps> = ({
  isOpen,
  score,
  onPlayAgain,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      soundEngine.playFanfare();
      if (canvasRef.current) {
        const cancelConfetti = launchConfetti(canvasRef.current, 3500);
        return () => {
          if (cancelConfetti) cancelConfetti();
        };
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      <div className="relative z-20 w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border-4 border-emerald-500 overflow-hidden text-center p-6 sm:p-7 flex flex-col items-center">
        {/* Big Celebration Icon */}
        <div className="text-6xl mb-2 animate-bounce">
          🎉
        </div>

        {/* Stars */}
        <div className="text-3xl mb-1">
          ⭐⭐⭐
        </div>

        <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
          Hebat Sekali!
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1.5 font-medium">
          Semua 15 gambar bagian tumbuhan telah berhasil dimasukkan ke keranjang!
        </p>

        {/* Total Score */}
        <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-5 py-2">
          <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 block">
            Total Nilai:
          </span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {score} Poin
          </span>
        </div>

        {/* Play Again Button */}
        <button
          onClick={onPlayAgain}
          className="mt-5 w-full py-3 px-6 rounded-2xl text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white min-h-[46px] shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <span>🔄</span>
          <span>Main Lagi</span>
        </button>
      </div>
    </div>
  );
};
