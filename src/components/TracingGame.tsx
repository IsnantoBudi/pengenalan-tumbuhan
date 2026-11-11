"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { soundEngine } from "@/lib/audio";
import { launchConfetti } from "@/lib/confetti";
import {
  PLANT_TRACING_SHAPES,
  TracingShape,
  TracingSegment,
  Point2D,
} from "@/data/plantTracingData";

interface TracingGameProps {
  onBackToMenu: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const PALETTE_COLORS = [
  { id: "rainbow", label: "Pelangi", color: "linear-gradient(135deg, #f43f5e, #fbbf24, #10b981, #3b82f6)", stroke: "#ef4444", isRainbow: true },
  { id: "blue", label: "Biru", color: "#2563eb", stroke: "#2563eb", isRainbow: false },
  { id: "green", label: "Hijau", color: "#16a34a", stroke: "#16a34a", isRainbow: false },
  { id: "red", label: "Merah", color: "#dc2626", stroke: "#dc2626", isRainbow: false },
  { id: "black", label: "Hitam", color: "#1e293b", stroke: "#1e293b", isRainbow: false },
];

const RAINBOW_HUES = ["#f43f5e", "#fb923c", "#facc15", "#4ade80", "#38bdf8", "#818cf8", "#e879f9"];

export const TracingGame: React.FC<TracingGameProps> = ({ onBackToMenu }) => {
  const [currentShapeIdx, setCurrentShapeIdx] = useState(0);
  const [activeSegmentIdx, setActiveSegmentIdx] = useState(0);
  const [completedSegmentIds, setCompletedSegmentIds] = useState<string[]>([]);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPoints, setDrawnPoints] = useState<Point2D[]>([]);
  const [activeProgressSampleIdx, setActiveProgressSampleIdx] = useState(0);
  const [isShapeCompleted, setIsShapeCompleted] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastBrushSoundTimeRef = useRef(0);
  const sparkleIdCounterRef = useRef(0);

  const currentShape: TracingShape = PLANT_TRACING_SHAPES[currentShapeIdx];
  const activeSegment: TracingSegment | undefined = currentShape.segments[activeSegmentIdx];

  // Waypoint Visibility Logic: Progressive Waypoints!
  // ONLY render:
  // 1. Waypoints from already-completed segments (isCompleted = true, with checkmark)
  // 2. Start and end waypoints of the current activeSegment (startWaypoint & endWaypoint)
  // 3. When shape is completed (isShapeCompleted = true), all waypoints appear with checkmark.
  const visibleWaypoints = useMemo(() => {
    const wpMap = new Map<
      number,
      {
        number: number;
        x: number;
        y: number;
        isCompleted: boolean;
        isActiveStart: boolean;
        isActiveEnd: boolean;
      }
    >();

    if (isShapeCompleted) {
      currentShape.segments.forEach((seg) => {
        if (!wpMap.has(seg.startWaypoint)) {
          wpMap.set(seg.startWaypoint, {
            number: seg.startWaypoint,
            x: seg.startPoint.x,
            y: seg.startPoint.y,
            isCompleted: true,
            isActiveStart: false,
            isActiveEnd: false,
          });
        }
        if (!wpMap.has(seg.endWaypoint)) {
          wpMap.set(seg.endWaypoint, {
            number: seg.endWaypoint,
            x: seg.endPoint.x,
            y: seg.endPoint.y,
            isCompleted: true,
            isActiveStart: false,
            isActiveEnd: false,
          });
        }
      });
      return Array.from(wpMap.values()).sort((a, b) => a.number - b.number);
    }

    // 1. Completed waypoints (remain visible so student sees their progress!)
    currentShape.segments.forEach((seg) => {
      if (completedSegmentIds.includes(seg.id)) {
        if (!wpMap.has(seg.startWaypoint)) {
          wpMap.set(seg.startWaypoint, {
            number: seg.startWaypoint,
            x: seg.startPoint.x,
            y: seg.startPoint.y,
            isCompleted: true,
            isActiveStart: false,
            isActiveEnd: false,
          });
        } else {
          wpMap.get(seg.startWaypoint)!.isCompleted = true;
        }

        if (!wpMap.has(seg.endWaypoint)) {
          wpMap.set(seg.endWaypoint, {
            number: seg.endWaypoint,
            x: seg.endPoint.x,
            y: seg.endPoint.y,
            isCompleted: true,
            isActiveStart: false,
            isActiveEnd: false,
          });
        } else {
          wpMap.get(seg.endWaypoint)!.isCompleted = true;
        }
      }
    });

    // 2. Active segment waypoints ONLY (Start & Destination target)
    if (activeSegment) {
      if (!wpMap.has(activeSegment.startWaypoint)) {
        wpMap.set(activeSegment.startWaypoint, {
          number: activeSegment.startWaypoint,
          x: activeSegment.startPoint.x,
          y: activeSegment.startPoint.y,
          isCompleted: false,
          isActiveStart: true,
          isActiveEnd: false,
        });
      } else {
        const existing = wpMap.get(activeSegment.startWaypoint)!;
        existing.isActiveStart = true;
      }

      if (!wpMap.has(activeSegment.endWaypoint)) {
        wpMap.set(activeSegment.endWaypoint, {
          number: activeSegment.endWaypoint,
          x: activeSegment.endPoint.x,
          y: activeSegment.endPoint.y,
          isCompleted: false,
          isActiveStart: false,
          isActiveEnd: true,
        });
      } else {
        const existing = wpMap.get(activeSegment.endWaypoint)!;
        existing.isActiveEnd = true;
      }
    }

    return Array.from(wpMap.values()).sort((a, b) => a.number - b.number);
  }, [currentShape, completedSegmentIds, isShapeCompleted, activeSegment]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Reset segment states whenever shape changes
  const loadShape = useCallback(
    (shapeIndex: number) => {
      soundEngine.stopAll();
      setCurrentShapeIdx(shapeIndex);
      setActiveSegmentIdx(0);
      setCompletedSegmentIds([]);
      setDrawnPoints([]);
      setActiveProgressSampleIdx(0);
      setIsShapeCompleted(false);
      setSparkles([]);

      const nextShape = PLANT_TRACING_SHAPES[shapeIndex];
      // Announce shape name to student cleanly
      soundEngine.speak(`Ayo tebalkan ${nextShape.audioWord}! Tarik dari nomor 1`);
    },
    []
  );

  // Announce initial shape once on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      soundEngine.speak(`Ayo tebalkan ${currentShape.audioWord}! Tarik dari nomor 1`);
    }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clean old sparkles periodically
  useEffect(() => {
    if (sparkles.length === 0) return;
    const interval = setInterval(() => {
      setSparkles((prev) => prev.slice(-18));
    }, 300);
    return () => clearInterval(interval);
  }, [sparkles.length]);

  const toggleAudio = () => {
    soundEngine.playClick();
    const next = !isAudioOn;
    setIsAudioOn(next);
    soundEngine.setAudioEnabled(next);
  };

  const toggleFullscreen = async () => {
    soundEngine.playClick();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Ignored if fullscreen blocked
    }
  };

  const handleNextShape = () => {
    soundEngine.stopAll();
    soundEngine.playClick();
    const next = (currentShapeIdx + 1) % PLANT_TRACING_SHAPES.length;
    loadShape(next);
  };

  const handlePrevShape = () => {
    soundEngine.stopAll();
    soundEngine.playClick();
    const prev = (currentShapeIdx - 1 + PLANT_TRACING_SHAPES.length) % PLANT_TRACING_SHAPES.length;
    loadShape(prev);
  };

  const handleReplayAudio = () => {
    soundEngine.playClick();
    soundEngine.speak(currentShape.audioWord);
  };

  // Convert Pointer coordinates to SVG 500x500 space
  const getSvgPoint = (e: React.PointerEvent<SVGSVGElement>): Point2D | null => {
    if (!svgRef.current) return null;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  };

  const distance = (p1: Point2D, p2: Point2D) => {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  };

  const spawnSparkles = (x: number, y: number) => {
    const newSparkles: SparkleParticle[] = [];
    for (let i = 0; i < 3; i++) {
      sparkleIdCounterRef.current += 1;
      const randomHue = RAINBOW_HUES[Math.floor(Math.random() * RAINBOW_HUES.length)];
      newSparkles.push({
        id: sparkleIdCounterRef.current,
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        color: randomHue,
        size: Math.random() * 8 + 6,
      });
    }
    setSparkles((prev) => [...prev.slice(-24), ...newSparkles]);
  };

  const playThrottledBrushSound = () => {
    const now = Date.now();
    if (now - lastBrushSoundTimeRef.current > 120) {
      lastBrushSoundTimeRef.current = now;
      soundEngine.playBrushStroke();
    }
  };

  // Pointer Down: Check if user starts near startWaypoint or current progress
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isShapeCompleted || !activeSegment) return;
    const pt = getSvgPoint(e);
    if (!pt) return;

    // Check proximity to segment start or current progress sample
    const sampleTarget =
      activeProgressSampleIdx > 0
        ? activeSegment.samplePoints[activeProgressSampleIdx]
        : activeSegment.startPoint;

    const distToTarget = distance(pt, sampleTarget);

    // Generous touch tolerance for children (60px)
    if (distToTarget <= 60) {
      (e.target as Element).setPointerCapture(e.pointerId);
      setIsDrawing(true);

      if (activeProgressSampleIdx === 0) {
        soundEngine.speakNumber(activeSegment.startWaypoint);
        setDrawnPoints([activeSegment.startPoint]);
      } else {
        setDrawnPoints((prev) => [...prev, pt]);
      }

      spawnSparkles(pt.x, pt.y);
      playThrottledBrushSound();
    }
  };

  // Complete the active segment
  const finishActiveSegment = useCallback(
    (segment: TracingSegment) => {
      setCompletedSegmentIds((prev) => [...prev, segment.id]);
      setDrawnPoints([]);
      setActiveProgressSampleIdx(0);
      setIsDrawing(false);

      const nextSegIdx = activeSegmentIdx + 1;
      if (nextSegIdx < currentShape.segments.length) {
        soundEngine.speakNumber(segment.endWaypoint);
        soundEngine.playSparkleChime();
        setActiveSegmentIdx(nextSegIdx);
      } else {
        // Entire shape completed! Stop number chime, celebrate & announce shape completion
        setIsShapeCompleted(true);
        if (confettiCanvasRef.current) {
          launchConfetti(confettiCanvasRef.current, 3500);
        }
        soundEngine.playApplause();
        soundEngine.speak(`Hebat sekali! Kamu berhasil menggambar ${currentShape.audioWord}!`);
      }
    },
    [activeSegmentIdx, currentShape]
  );

  // Pointer Move: Dragging along the curve
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing || isShapeCompleted || !activeSegment) return;
    const pt = getSvgPoint(e);
    if (!pt) return;

    playThrottledBrushSound();
    spawnSparkles(pt.x, pt.y);

    const samples = activeSegment.samplePoints;
    const nextSampleIdx = Math.min(activeProgressSampleIdx + 1, samples.length - 1);
    const nextSample = samples[nextSampleIdx];

    const distToNext = distance(pt, nextSample);
    const distToEnd = distance(pt, activeSegment.endPoint);

    // If close to next sample point along the curve, advance
    if (distToNext <= 55) {
      setActiveProgressSampleIdx(nextSampleIdx);
      setDrawnPoints((prev) => [...prev, nextSample]);
    } else {
      setDrawnPoints((prev) => [...prev, pt]);
    }

    // Check if reached final waypoint of this segment
    if (distToEnd <= 45 || nextSampleIdx >= samples.length - 1) {
      finishActiveSegment(activeSegment);
    }
  };

  // Pointer Up: Release pointer
  const handlePointerUp = () => {
    if (!isDrawing || !activeSegment) return;
    setIsDrawing(false);

    // Kid-friendly: If completed > 75% of the curve, snap to completion
    const samples = activeSegment.samplePoints;
    if (activeProgressSampleIdx >= Math.floor(samples.length * 0.75)) {
      finishActiveSegment(activeSegment);
    }
  };

  const activeColorObj = PALETTE_COLORS[selectedColorIdx];
  const strokeColor = activeColorObj.isRainbow ? "#3b82f6" : activeColorObj.stroke;

  return (
    <div className="relative w-full min-h-screen bg-grid-paper flex flex-col justify-between overflow-x-hidden select-none">
      {/* Confetti Celebration Canvas Overlay */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* =========================================================================
          DECORATIVE SCHOOL STATIONERY (Matching user screenshots)
          ========================================================================= */}

      {/* Top-Left: Tilted Yellow Sticky Note with Paperclip */}
      <div className="absolute top-2 left-20 sm:left-28 z-0 pointer-events-none rotate-[-8deg] opacity-90 hidden sm:block">
        <div className="relative w-22 h-20 bg-amber-100 rounded-sm shadow-md border-t border-amber-200/80 p-2 flex flex-col justify-between">
          <div className="w-6 h-10 border-2 border-purple-500 rounded-full absolute -top-4 left-6 rotate-12 shadow-sm" />
          <div className="space-y-1 mt-3">
            <div className="w-12 h-1.5 bg-amber-300/60 rounded" />
            <div className="w-16 h-1.5 bg-amber-300/60 rounded" />
            <div className="w-10 h-1.5 bg-amber-300/60 rounded" />
          </div>
        </div>
      </div>

      {/* Bottom-Left: Tilted Lime Sticky Note with Tape */}
      <div className="absolute bottom-6 left-6 z-0 pointer-events-none rotate-[7deg] opacity-90 hidden md:block">
        <div className="relative w-28 h-28 bg-lime-200 rounded-md shadow-lg border border-lime-300/60 p-3">
          <div className="absolute -top-3 left-7 w-14 h-6 bg-white/60 backdrop-blur-xs border border-white/40 shadow-xs -rotate-2" />
          <div className="mt-4 space-y-2">
            <div className="w-18 h-2 bg-lime-400/50 rounded" />
            <div className="w-20 h-2 bg-lime-400/50 rounded" />
            <div className="w-14 h-2 bg-lime-400/50 rounded" />
          </div>
        </div>
      </div>

      {/* Right Side: Realistic Wooden Yellow School Ruler */}
      <div className="absolute right-4 top-28 sm:top-20 z-0 pointer-events-none rotate-[6deg] opacity-95 hidden sm:block">
        <div className="relative w-11 sm:w-13 h-72 sm:h-84 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-lg shadow-xl border border-amber-600/30 flex flex-col justify-between py-3 px-1 text-[9px] font-mono font-bold text-amber-950">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-0.5">
              <span className="text-[8px] opacity-75">{i}</span>
              <div className="w-4 h-0.5 bg-amber-900/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-Right: Tilted Pink Sticky Note with Cyan Pushpin */}
      <div className="absolute bottom-6 right-20 sm:right-28 z-0 pointer-events-none rotate-[-6deg] opacity-90 hidden sm:block">
        <div className="relative w-24 h-24 bg-pink-200 rounded-md shadow-lg border border-pink-300/60 p-2">
          {/* Cyan Pushpin */}
          <div className="absolute -top-2.5 left-8 w-5 h-5 rounded-full bg-teal-500 shadow-md border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="w-14 h-1.5 bg-pink-400/50 rounded" />
            <div className="w-16 h-1.5 bg-pink-400/50 rounded" />
            <div className="w-10 h-1.5 bg-pink-400/50 rounded" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          TOP HEADER CONTROLS
          ========================================================================= */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-3 sm:pt-4 flex items-center justify-between">
        {/* Left: Red Circular Back Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onBackToMenu();
          }}
          aria-label="Kembali ke menu"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_4px_0_#991b1b] border-2 border-white flex items-center justify-center active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          <svg className="w-6 h-6 stroke-current fill-none stroke-3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Center: Red Title Pill Badge with Speaker Icon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 border-2 border-white shadow-[0_4px_12px_rgba(239,68,68,0.35)] text-white">
            <span className="text-xl sm:text-2xl">{currentShape.emoji}</span>
            <span className="font-black text-sm sm:text-base tracking-wide drop-shadow-xs">
              {currentShape.badgeText}
            </span>
            <button
              type="button"
              onClick={handleReplayAudio}
              aria-label="Dengarkan nama bagian"
              className="w-7 h-7 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center ml-1 transition-transform active:scale-90 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            </button>
          </div>

          {/* Step Pill */}
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-slate-700 font-extrabold text-xs shadow-xs">
            {currentShapeIdx + 1} / {PLANT_TRACING_SHAPES.length}
          </span>
        </div>

        {/* Right: Audio & Fullscreen Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isAudioOn ? "Matikan Suara" : "Nyalakan Suara"}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md border border-slate-200 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          >
            {isAudioOn ? (
              <svg className="w-5 h-5 fill-current text-emerald-600" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current text-rose-500" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Layar penuh"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md border border-slate-200 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
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
        </div>
      </header>

      {/* =========================================================================
          MAIN DRAWING STAGE WITH CONTROLS
          ========================================================================= */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto flex items-center justify-center px-2 sm:px-4 py-2">
        {/* Left Side: Color Palette Capsule */}
        <div className="absolute left-2 sm:left-4 z-20 flex flex-col items-center gap-3 p-2 sm:p-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_20px_rgba(0,0,0,0.12)] border-2 border-cyan-200">
          {PALETTE_COLORS.map((palette, idx) => (
            <button
              key={palette.id}
              type="button"
              onClick={() => {
                soundEngine.playPop();
                setSelectedColorIdx(idx);
              }}
              aria-label={`Pilih warna ${palette.label}`}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-transform active:scale-90 cursor-pointer shadow-xs ${
                selectedColorIdx === idx ? "ring-3 ring-sky-400 scale-110" : "hover:scale-105"
              }`}
              style={{
                background: palette.isRainbow
                  ? "linear-gradient(135deg, #f43f5e, #fbbf24, #10b981, #3b82f6)"
                  : palette.color,
              }}
            />
          ))}

          {/* Bottom Pencil Button */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-400 to-sky-400 shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg sm:text-xl">
              ✏️
            </div>
          </div>
        </div>

        {/* Previous Shape Button: Left Curved Kidney Button (Screenshot Match) */}
        <button
          type="button"
          onClick={handlePrevShape}
          aria-label="Bentuk sebelumnya"
          className="absolute left-18 sm:left-24 z-20 w-11 h-14 sm:w-13 sm:h-16 rounded-full bg-gradient-to-b from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-black text-2xl shadow-[0_4px_0_#991b1b,0_8px_16px_rgba(239,68,68,0.3)] border-2 border-white flex items-center justify-center active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          ‹
        </button>

        {/* Center Canvas Area: SVG Stencil & Interactive Dragging */}
        <div className="relative w-full max-w-[480px] max-h-[480px] aspect-square flex items-center justify-center p-2">
          <svg
            ref={svgRef}
            viewBox="0 0 500 500"
            className="w-full h-full touch-none select-none drop-shadow-md"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <defs>
              {/* Rainbow Linear Gradient for Brush Trail */}
              <linearGradient id="rainbowBrush" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="25%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="75%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>

              {/* Shimmer Glow Filter */}
              <filter id="brushGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Background Guides (Wide grey tracks for entire shape) */}
            {currentShape.backgroundGuides.map((guideD, i) => (
              <path
                key={`bg-guide-${i}`}
                d={guideD}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={34}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* 1b. Background Stencil Artwork & Details (e.g. Smiling face & Stem for Flower, Veins for Leaf) */}
            {currentShape.backgroundDecorations && (
              <g className="pointer-events-none">
                {currentShape.backgroundDecorations.map((item, idx) => (
                  <path
                    key={`bg-decor-${idx}`}
                    d={item.d}
                    fill={item.fill || "none"}
                    stroke={item.stroke || "none"}
                    strokeWidth={item.strokeWidth || 0}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
            )}

            {/* 2. Dashed Lines Connecting Numbers (Garis putus-putus penghubung setiap angka, konsisten & rapi) */}
            {currentShape.segments.map((seg) => {
              const isCompleted = completedSegmentIds.includes(seg.id);
              if (isCompleted) return null; // Completed segments are drawn as solid colored lines

              return (
                <path
                  key={`dashed-line-${seg.id}`}
                  d={seg.d}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth={4.5}
                  strokeDasharray="10 8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}

            {/* 3. Completed Segments (Rendered in solid vibrant color) */}
            {currentShape.segments
              .filter((seg) => completedSegmentIds.includes(seg.id))
              .map((seg) => (
                <path
                  key={`completed-${seg.id}`}
                  d={seg.d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={28}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

            {/* 3. Fully Completed Shape Auto-fill Watercolor Artwork */}
            {isShapeCompleted && (
              <g className="animate-watercolor">
                {currentShape.completedSvgPaths.map((item, idx) => (
                  <path
                    key={`filled-${idx}`}
                    d={item.d}
                    fill={item.fill || "none"}
                    stroke={item.stroke || "none"}
                    strokeWidth={item.strokeWidth || 0}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
            )}

            {/* 4. Active Segment Direction Arrows & Drawn Stroke */}
            {!isShapeCompleted && activeSegment && (
              <g>
                {/* Direction Arrows along the active segment */}
                {activeSegment.arrows.map((arr, idx) => (
                  <g
                    key={`arr-${idx}`}
                    transform={`translate(${arr.x}, ${arr.y}) rotate(${arr.angle})`}
                    className="animate-arrow-bounce pointer-events-none"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <path
                      d="M -7 -6 L 5 0 L -7 6 Z"
                      fill="#f97316"
                      stroke="#ea580c"
                      strokeWidth={1.5}
                      strokeLinejoin="round"
                    />
                  </g>
                ))}

                {/* Drawn Points Polyline (The trail student is tracing right now) */}
                {drawnPoints.length > 1 && (
                  <path
                    d={`M ${drawnPoints[0].x} ${drawnPoints[0].y} ` +
                      drawnPoints.slice(1).map((p) => `L ${p.x} ${p.y}`).join(" ")}
                    fill="none"
                    stroke={activeColorObj.isRainbow ? "url(#rainbowBrush)" : strokeColor}
                    strokeWidth={26}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#brushGlow)"
                  />
                )}
              </g>
            )}

            {/* 5. Waypoint Number Badges (All active and previously completed numbers remain visible!) */}
            {visibleWaypoints.map((wp) => {
              const isPulsing = wp.isActiveEnd || (wp.isActiveStart && activeProgressSampleIdx === 0);

              return (
                <g
                  key={`wp-${wp.number}`}
                  transform={`translate(${wp.x}, ${wp.y})`}
                  className={`pointer-events-none ${isPulsing ? "animate-pulse-waypoint" : ""}`}
                >
                  {/* Outer animated ring for active destination */}
                  {wp.isActiveEnd && (
                    <circle
                      r={28}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth={3}
                      strokeDasharray="5 4"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Red Circle */}
                  <circle
                    r={22}
                    fill={wp.isCompleted ? "#dc2626" : wp.isActiveEnd ? "#ea580c" : "#ef4444"}
                    stroke="#ffffff"
                    strokeWidth={3.5}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
                  />

                  {/* Number text */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize="18"
                    fontWeight="900"
                    fontFamily="sans-serif"
                  >
                    {wp.number}
                  </text>

                  {/* Completed Checkmark badge on top right */}
                  {wp.isCompleted && (
                    <g transform="translate(13, -13)">
                      <circle r={7.5} fill="#16a34a" stroke="#ffffff" strokeWidth={1.5} />
                      <path
                        d="M -3.5 0 L -1 2.5 L 3.5 -2"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* 5. Rainbow Sparkle Particles on pointer movement */}
            {sparkles.map((sp) => (
              <g
                key={`sparkle-${sp.id}`}
                transform={`translate(${sp.x}, ${sp.y})`}
                className="pointer-events-none animate-ping"
                style={{ animationDuration: "0.6s" }}
              >
                <polygon
                  points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2"
                  fill={sp.color}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Next Shape Button: Right Curved Kidney Button (Screenshot Match) */}
        <button
          type="button"
          onClick={handleNextShape}
          aria-label="Bentuk selanjutnya"
          className="absolute right-18 sm:right-24 z-20 w-11 h-14 sm:w-13 sm:h-16 rounded-full bg-gradient-to-b from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-black text-2xl shadow-[0_4px_0_#991b1b,0_8px_16px_rgba(239,68,68,0.3)] border-2 border-white flex items-center justify-center active:translate-y-1 active:shadow-none transition-all cursor-pointer"
        >
          ›
        </button>
      </main>

      {/* =========================================================================
          BOTTOM CONTROL & CELEBRATION FOOTER
          ========================================================================= */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-4">
        {isShapeCompleted ? (
          /* Completion Card with Educational Fact & Next Button */
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border-2 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4 animate-scale-up">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-4xl">🌟</span>
              <div>
                <h3 className="font-black text-emerald-800 text-base sm:text-lg">
                  Luar Biasa! Kamu Menggambar {currentShape.badgeText}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-md">
                  {currentShape.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadShape(currentShapeIdx)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
              >
                Ulangi 🔄
              </button>
              <button
                type="button"
                onClick={handleNextShape}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm shadow-[0_4px_0_#15803d] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Bagian Selanjutnya</span>
                <span>➜</span>
              </button>
            </div>
          </div>
        ) : (
          /* Tracing Guidance Helper Bar */
          <div className="bg-white/80 backdrop-blur-xs rounded-xl px-4 py-2.5 shadow-sm border border-slate-200/80 flex items-center justify-between text-xs sm:text-sm text-slate-600 font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>
                Tarik garis mengikuti panah dari nomor{" "}
                <span className="font-bold text-red-600">
                  {activeSegment?.startWaypoint ?? 1}
                </span>{" "}
                ke nomor{" "}
                <span className="font-bold text-red-600">
                  {activeSegment?.endWaypoint ?? 2}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {currentShape.segments.map((seg, i) => (
                <div
                  key={seg.id}
                  className={`w-3 h-3 rounded-full transition-all ${
                    completedSegmentIds.includes(seg.id)
                      ? "bg-emerald-500 scale-110"
                      : i === activeSegmentIdx
                      ? "bg-red-500 ring-2 ring-red-200"
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};
