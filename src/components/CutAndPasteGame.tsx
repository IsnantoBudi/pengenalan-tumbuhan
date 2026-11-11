"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { CUT_AND_PASTE_LEVELS } from "@/data/cutAndPasteData";
import { soundEngine } from "@/lib/audio";
import { launchConfetti } from "@/lib/confetti";

interface CutAndPasteGameProps {
  onBackToMenu: () => void;
}

interface PiecePos {
  x: number;
  y: number;
  isPlaced: boolean;
  isDragging: boolean;
}

interface DragState {
  pieceId: string;
  pointerId: number;
  startSvgX: number;
  startSvgY: number;
  originX: number;
  originY: number;
}

const getInitialPositions = (idx: number): Record<string, PiecePos> => {
  const lvl = CUT_AND_PASTE_LEVELS[idx];
  const initialMap: Record<string, PiecePos> = {};
  lvl.pieces.forEach((p) => {
    initialMap[p.id] = {
      x: p.initialX,
      y: p.initialY,
      isPlaced: false,
      isDragging: false,
    };
  });
  return initialMap;
};

export const CutAndPasteGame: React.FC<CutAndPasteGameProps> = ({ onBackToMenu }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = CUT_AND_PASTE_LEVELS[levelIndex];

  // Positions state for current level pieces (initialized lazily)
  const [positions, setPositions] = useState<Record<string, PiecePos>>(() =>
    getInitialPositions(0)
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [activePieceId, setActivePieceId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);

  // Fullscreen state listener
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
      // Browser blocked if not direct user gesture
    }
  };

  // Switch to or reset a level
  const loadLevel = useCallback((idx: number) => {
    soundEngine.stopAll();
    setLevelIndex(idx);
    setPositions(getInitialPositions(idx));
    setIsCompleted(false);
    setActivePieceId(null);
    dragStateRef.current = null;
  }, []);

  // Voice prompt intro on level switch & cleanup on unmount
  useEffect(() => {
    const timer = setTimeout(() => {
      soundEngine.speak(currentLevel.audioIntro);
    }, 400);

    return () => {
      clearTimeout(timer);
      soundEngine.stopAll();
    };
  }, [levelIndex, currentLevel.audioIntro]);

  // Convert screen coordinates (clientX, clientY) to SVG coordinates
  const getSvgCoordinates = (clientX: number, clientY: number): { x: number; y: number } => {
    if (!svgRef.current) return { x: clientX, y: clientY };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: clientX, y: clientY };
    const transformed = pt.matrixTransform(ctm.inverse());
    return { x: transformed.x, y: transformed.y };
  };

  // Pointer Down: Start dragging piece
  const handlePointerDown = (e: React.PointerEvent, pieceId: string) => {
    const p = positions[pieceId];
    if (!p || p.isPlaced) return;

    const svgCoord = getSvgCoordinates(e.clientX, e.clientY);
    dragStateRef.current = {
      pieceId,
      pointerId: e.pointerId,
      startSvgX: svgCoord.x,
      startSvgY: svgCoord.y,
      originX: p.x,
      originY: p.y,
    };

    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
      // pointer capture fallback
    }

    setActivePieceId(pieceId);
    setPositions((prev) => ({
      ...prev,
      [pieceId]: {
        ...prev[pieceId],
        isDragging: true,
      },
    }));

    soundEngine.playPop();
  };

  // Pointer Move: Update dragged piece position
  const handlePointerMove = (e: React.PointerEvent) => {
    const ds = dragStateRef.current;
    if (!ds || ds.pointerId !== e.pointerId) return;

    const svgCoord = getSvgCoordinates(e.clientX, e.clientY);
    const dx = svgCoord.x - ds.startSvgX;
    const dy = svgCoord.y - ds.startSvgY;

    setPositions((prev) => {
      if (!prev[ds.pieceId]) return prev;
      return {
        ...prev,
        [ds.pieceId]: {
          ...prev[ds.pieceId],
          x: ds.originX + dx,
          y: ds.originY + dy,
        },
      };
    });
  };

  // Pointer Up: Check snap or bounce back
  const handlePointerUp = (e: React.PointerEvent) => {
    const ds = dragStateRef.current;
    if (!ds || ds.pointerId !== e.pointerId) return;

    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // release fallback
    }

    const currentPiece = currentLevel.pieces.find((p) => p.id === ds.pieceId);
    const currentPos = positions[ds.pieceId];

    if (currentPiece && currentPos) {
      // Calculate distance to target slot
      const distance = Math.hypot(
        currentPos.x - currentPiece.targetX,
        currentPos.y - currentPiece.targetY
      );

      // Snap threshold: 75 SVG units radius
      if (distance <= 75) {
        // SNAP SUCCESS!
        soundEngine.playPop();
        soundEngine.playSparkleChime();

        setPositions((prev) => {
          const next = {
            ...prev,
            [ds.pieceId]: {
              x: currentPiece.targetX,
              y: currentPiece.targetY,
              isPlaced: true,
              isDragging: false,
            },
          };

          // Check if all pieces are now placed
          const allPlaced = currentLevel.pieces.every(
            (p) => p.id === ds.pieceId || next[p.id]?.isPlaced
          );

          if (allPlaced) {
            handleLevelComplete();
          }

          return next;
        });
      } else {
        // BOUNCE BACK TO INITIAL POSITION
        setPositions((prev) => ({
          ...prev,
          [ds.pieceId]: {
            ...prev[ds.pieceId],
            x: currentPiece.initialX,
            y: currentPiece.initialY,
            isDragging: false,
          },
        }));
      }
    }

    dragStateRef.current = null;
    setActivePieceId(null);
  };

  const handleLevelComplete = () => {
    setIsCompleted(true);
    soundEngine.playApplause();
    soundEngine.playFanfare();

    if (confettiCanvasRef.current) {
      launchConfetti(confettiCanvasRef.current, 3500);
    }

    setTimeout(() => {
      soundEngine.speak(currentLevel.audioComplete);
    }, 500);
  };

  const handleNextLevel = () => {
    soundEngine.playClick();
    if (levelIndex < CUT_AND_PASTE_LEVELS.length - 1) {
      loadLevel(levelIndex + 1);
    } else {
      loadLevel(0);
    }
  };

  const handlePrevLevel = () => {
    soundEngine.playClick();
    if (levelIndex > 0) {
      loadLevel(levelIndex - 1);
    }
  };

  const handleResetLevel = () => {
    soundEngine.playClick();
    loadLevel(levelIndex);
  };

  const handleExit = () => {
    soundEngine.playClick();
    soundEngine.stopAll();
    onBackToMenu();
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-amber-100 via-rose-50 to-orange-100 flex flex-col items-center justify-between p-2 sm:p-4 select-none overflow-x-hidden touch-none">
      {/* Background Decorative Polka-Dots & Floating Icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden flex justify-between p-8 text-6xl">
        <span className="animate-bounce">✂️</span>
        <span className="animate-pulse" style={{ animationDelay: "1s" }}>
          🌸
        </span>
        <span className="animate-bounce" style={{ animationDelay: "2s" }}>
          🧴
        </span>
      </div>

      {/* Confetti Canvas for Victory Animation */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Header Controls Bar */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between gap-2 mb-2 sm:mb-3">
        {/* Back to Menu Button */}
        <button
          type="button"
          onClick={handleExit}
          className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 hover:bg-white text-zinc-800 font-extrabold text-xs sm:text-sm shadow-md border-2 border-orange-200 hover:border-orange-300 transition-all cursor-pointer active:scale-95"
        >
          <span className="text-base sm:text-lg">◀</span>
          <span>Menu</span>
        </button>

        {/* Level Indicator & Switcher */}
        <div className="flex items-center gap-2 bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-md border-2 border-rose-200">
          <button
            type="button"
            onClick={handlePrevLevel}
            disabled={levelIndex === 0}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 flex items-center justify-center font-black disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            ‹
          </button>
          <div className="text-center px-1">
            <span className="block text-[10px] sm:text-xs font-bold text-rose-500 uppercase tracking-wider">
              {currentLevel.badge}
            </span>
            <span className="text-xs sm:text-sm font-black text-zinc-800">
              {levelIndex + 1} / {CUT_AND_PASTE_LEVELS.length}
            </span>
          </div>
          <button
            type="button"
            onClick={handleNextLevel}
            disabled={levelIndex === CUT_AND_PASTE_LEVELS.length - 1}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 flex items-center justify-center font-black disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            ›
          </button>
        </div>

        {/* Action Buttons (Voice, Fullscreen & Reset) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => soundEngine.speak(currentLevel.audioIntro)}
            title="Dengarkan Instruksi"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
          >
            🔊
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/90 hover:bg-white text-zinc-700 font-black text-sm flex items-center justify-center shadow-md border-2 border-orange-200 active:scale-95 transition-all cursor-pointer"
          >
            {isFullscreen ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5h2z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={handleResetLevel}
            title="Mulai Ulang Level"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/90 hover:bg-white text-zinc-700 font-black text-sm flex items-center justify-center shadow-md border-2 border-orange-200 active:scale-95 transition-all cursor-pointer"
          >
            🔄
          </button>
        </div>
      </header>

      {/* Main Interactive Worksheet Paper */}
      <main className="relative z-10 w-full max-w-xl mx-auto flex-1 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl p-2 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-rose-300 relative flex flex-col items-center">
          {/* Subtle Grid / Graph Paper Background Effect */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#F43F5E 1px, transparent 1px), linear-gradient(90deg, #F43F5E 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* SVG Canvas for Full Worksheet Experience */}
          <svg
            ref={svgRef}
            viewBox="0 0 700 750"
            className="w-full h-auto max-h-[82vh] touch-none select-none drop-shadow-sm"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <defs>
              {/* Drop Shadow for Dragged Piece */}
              <filter id="pieceShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.25" />
              </filter>

              {/* Glow for Placed Piece */}
              <filter id="placedGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#10B981" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* 1. Top-Left Box: "Contoh Hasil Jadi" (Miniature Reference) */}
            <g>
              {/* Dashed Red Box */}
              <rect
                x="25"
                y="40"
                width="220"
                height="220"
                rx="16"
                fill="#FFF5F5"
                stroke="#FF6B6B"
                strokeWidth="3.5"
                strokeDasharray="9,9"
              />
              {/* Badge: "CONTOH" */}
              <g transform="translate(38, 53)">
                <rect x="0" y="0" width="76" height="24" rx="8" fill="#FF6B6B" />
                <text
                  x="38"
                  y="16"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="900"
                  letterSpacing="1"
                >
                  CONTOH
                </text>
              </g>
              {/* Render Level Preview Inside Reference Box */}
              <g transform="translate(0, -55)">
                {currentLevel.renderPreview()}
              </g>
            </g>

            {/* 3. Center Silhouette / Outline Target (Ghost Slots) */}
            <g id="silhouettes">
              {currentLevel.pieces.map((piece) => (
                <g
                  key={`sil-${piece.id}`}
                  transform={`translate(${piece.targetX}, ${piece.targetY})`}
                  opacity={positions[piece.id]?.isPlaced ? 0.15 : 0.85}
                  className="transition-opacity duration-300"
                >
                  {piece.renderSilhouette()}
                </g>
              ))}
            </g>

            {/* 4. Target Guide Pulses when dragging */}
            {activePieceId && (
              <g>
                {(() => {
                  const activePiece = currentLevel.pieces.find((p) => p.id === activePieceId);
                  const activePos = positions[activePieceId];
                  if (!activePiece || !activePos) return null;
                  return (
                    <circle
                      cx={activePiece.targetX}
                      cy={activePiece.targetY}
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray="6,6"
                      className="animate-ping"
                      opacity="0.6"
                    />
                  );
                })()}
              </g>
            )}

            {/* 5. Snapped Pieces (Already in place) */}
            <g id="placed-pieces">
              {currentLevel.pieces
                .filter((p) => positions[p.id]?.isPlaced)
                .map((piece) => {
                  return (
                    <g
                      key={`placed-${piece.id}`}
                      transform={`translate(${piece.targetX}, ${piece.targetY})`}
                      filter="url(#placedGlow)"
                    >
                      {piece.renderPiece({ isPlaced: true })}
                      {/* Sparkle Checkmark Badge on Newly Placed Piece */}
                      <circle cx="35" cy="-35" r="12" fill="#22C55E" />
                      <path
                        d="M 29 -35 L 33 -31 L 41 -39"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  );
                })}
            </g>

            {/* 6. Loose / Draggable Pieces (Idle at initial position or being dragged) */}
            <g id="draggable-pieces">
              {currentLevel.pieces
                .filter((p) => !positions[p.id]?.isPlaced && p.id !== activePieceId)
                .map((piece) => {
                  const pos = positions[piece.id] || {
                    x: piece.initialX,
                    y: piece.initialY,
                  };
                  return (
                    <g
                      key={`piece-${piece.id}`}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onPointerDown={(e) => handlePointerDown(e, piece.id)}
                      className="cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
                      style={{ touchAction: "none" }}
                    >
                      {/* Invisible hover & touch hit-area padding */}
                      <circle cx="0" cy="0" r={Math.max(piece.width, piece.height) * 0.55} fill="transparent" />
                      {piece.renderPiece({ isPlaced: false })}
                    </g>
                  );
                })}

              {/* 7. Active Dragging Piece (Always rendered on top of everything) */}
              {activePieceId && (() => {
                const activePiece = currentLevel.pieces.find((p) => p.id === activePieceId);
                const pos = positions[activePieceId];
                if (!activePiece || !pos) return null;

                return (
                  <g
                    transform={`translate(${pos.x}, ${pos.y}) scale(1.08)`}
                    filter="url(#pieceShadow)"
                    className="cursor-grabbing"
                    style={{ touchAction: "none" }}
                  >
                    <circle cx="0" cy="0" r={Math.max(activePiece.width, activePiece.height) * 0.6} fill="transparent" />
                    {activePiece.renderPiece({ isDragging: true })}
                  </g>
                );
              })()}
            </g>
          </svg>

          {/* Victory Modal Overlay */}
          {isCompleted && (
            <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm rounded-3xl flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-yellow-300 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center text-4xl mb-3 shadow-inner animate-bounce">
                  🎉
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-1">Luar Biasa!</h3>
                <p className="text-sm font-semibold text-zinc-600 mb-6">
                  Kamu berhasil menyusun <span className="text-rose-600">{currentLevel.title}</span> dengan sempurna!
                </p>

                <div className="flex flex-col gap-3 w-full">
                  <button
                    type="button"
                    onClick={handleNextLevel}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base shadow-[0_5px_0_#15803d] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>
                      {levelIndex < CUT_AND_PASTE_LEVELS.length - 1 ? "Level Selanjutnya ▶" : "Main Lagi Dari Awal 🔄"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExit}
                    className="w-full py-3 px-6 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-sm transition-all cursor-pointer"
                  >
                    Kembali ke Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Helpful Hint Footer */}
      <footer className="relative z-20 text-center text-xs font-bold text-orange-900/70 mt-2">
        💡 Tarik potongan ke siluet bergaris putus-putus untuk menempelkannya!
      </footer>
    </div>
  );
};
