"use client";

import React, { useState } from "react";
import { MainMenu } from "@/components/MainMenu";
import { GameBoard } from "@/components/GameBoard";
import { HoneycombGame } from "@/components/HoneycombGame";
import { TracingGame } from "@/components/TracingGame";

type GameMode = "menu" | "basket" | "honeycomb" | "tracing";

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>("menu");

  if (gameMode === "basket") {
    return <GameBoard onBackToMenu={() => setGameMode("menu")} />;
  }

  if (gameMode === "honeycomb") {
    return <HoneycombGame onBackToMenu={() => setGameMode("menu")} />;
  }

  if (gameMode === "tracing") {
    return <TracingGame onBackToMenu={() => setGameMode("menu")} />;
  }

  return <MainMenu onSelectMode={(mode) => setGameMode(mode)} />;
}

