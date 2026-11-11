import React from "react";

export interface CutAndPastePiece {
  id: string;
  name: string;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
  renderPiece: (props: { isPlaced?: boolean; isDragging?: boolean }) => React.ReactNode;
  renderSilhouette: () => React.ReactNode;
}

export interface CutAndPasteLevel {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  audioIntro: string;
  audioComplete: string;
  pieces: CutAndPastePiece[];
  renderPreview: () => React.ReactNode;
}

// -------------------------------------------------------------
// LEVEL 1: Bunga Cantik dalam Pot (Persis Gambar Lembar Kerja)
// -------------------------------------------------------------

const PotGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#E27B38";
  const strokeColor = isSilhouette ? "#94A3B8" : "#C45F1E";
  const rimFill = isSilhouette ? "none" : "#E88A48";

  return (
    <g>
      {/* Pot Body Trapezoid */}
      <path
        d="M -75 -15 L 75 -15 L 54 85 L -54 85 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
        strokeLinejoin="round"
      />
      {/* Subtle Shadow on Pot Body */}
      {!isSilhouette && (
        <path
          d="M 50 -15 L 75 -15 L 54 85 L 35 85 Z"
          fill="#000000"
          opacity={0.1}
        />
      )}
      {/* Pot Rim (Bibir Pot) */}
      <rect
        x="-90"
        y="-40"
        width="180"
        height="32"
        rx="16"
        fill={rimFill}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
      {/* Rim Top Highlight */}
      {!isSilhouette && (
        <rect
          x="-75"
          y="-36"
          width="150"
          height="8"
          rx="4"
          fill="#FFFFFF"
          opacity={0.25}
        />
      )}
    </g>
  );
};

const StemGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#8E4A23";
  const strokeColor = isSilhouette ? "#94A3B8" : "#6E3615";

  return (
    <g>
      <rect
        x="-14"
        y="-85"
        width="28"
        height="225"
        rx="4"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
      {!isSilhouette && (
        <line
          x1="5"
          y1="-65"
          x2="5"
          y2="115"
          stroke="#000000"
          strokeWidth="3"
          opacity={0.15}
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

const LeafGraphic: React.FC<{ isSilhouette?: boolean; flip?: boolean }> = ({
  isSilhouette = false,
  flip = false,
}) => {
  const fillColor = isSilhouette ? "none" : "#4BAE4F";
  const strokeColor = isSilhouette ? "#94A3B8" : "#2E7D32";

  return (
    <g transform={flip ? "scale(-1, 1)" : undefined}>
      {/* Leaf Body */}
      <path
        d="M -50 0 C -45 -28, 20 -35, 55 0 C 20 35, -45 28, -50 0 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
      {/* Leaf Vein */}
      {!isSilhouette && (
        <>
          <path
            d="M -42 0 Q 5 -2 46 0"
            stroke="#2E7D32"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -15 0 Q -5 -10 5 -12"
            stroke="#2E7D32"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 5 0 Q 15 10 25 12"
            stroke="#2E7D32"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}
    </g>
  );
};

const HeartGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#48DF48";
  const strokeColor = isSilhouette ? "#94A3B8" : "#2EAA2E";

  return (
    <g transform="scale(0.95)">
      <path
        d="M 0 -10 C -22 -32, -38 5, 0 32 C 38 5, 22 -32, 0 -10 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
        strokeLinejoin="round"
      />
      {!isSilhouette && (
        <circle cx="-10" cy="-6" r="4" fill="#FFFFFF" opacity={0.3} />
      )}
    </g>
  );
};

const FlowerHeadGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const petalFill = isSilhouette ? "none" : "#FF5376";
  const petalStroke = isSilhouette ? "#94A3B8" : "#DE385B";
  const centerFill = isSilhouette ? "none" : "#FFDE59";
  const centerStroke = isSilhouette ? "#94A3B8" : "#F5B800";

  // 6 petals rotation angles: 0, 60, 120, 180, 240, 300
  const petalAngles = [0, 60, 120, 180, 240, 300];

  return (
    <g>
      {/* 6 Rounded Petals */}
      {petalAngles.map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <circle
            cx="0"
            cy="-48"
            r="34"
            fill={petalFill}
            stroke={petalStroke}
            strokeWidth={isSilhouette ? 3 : 2}
            strokeDasharray={isSilhouette ? "6,6" : "none"}
          />
          {!isSilhouette && (
            <circle cx="-5" cy="-55" r="7" fill="#FFFFFF" opacity={0.25} />
          )}
        </g>
      ))}

      {/* Yellow Center Disc */}
      <circle
        cx="0"
        cy="0"
        r="44"
        fill={centerFill}
        stroke={centerStroke}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />

      {/* Cute Smiling Face on Yellow Center */}
      {!isSilhouette && (
        <g>
          {/* Left Eye */}
          <ellipse cx="-15" cy="-6" rx="5" ry="6.5" fill="#1E1B4B" />
          <circle cx="-13" cy="-9" r="2.2" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="15" cy="-6" rx="5" ry="6.5" fill="#1E1B4B" />
          <circle cx="17" cy="-9" r="2.2" fill="#FFFFFF" />

          {/* Smiling Mouth */}
          <path
            d="M -11 8 Q 0 20 11 8"
            fill="none"
            stroke="#1E1B4B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Cheeks Blush */}
          <ellipse cx="-23" cy="5" rx="7" ry="4.5" fill="#FFA6BA" opacity={0.7} />
          <ellipse cx="23" cy="5" rx="7" ry="4.5" fill="#FFA6BA" opacity={0.7} />
        </g>
      )}
    </g>
  );
};

// -------------------------------------------------------------
// LEVEL 2: Pohon Apel Ceria
// -------------------------------------------------------------

const TreeTrunkGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#8B5A2B";
  const strokeColor = isSilhouette ? "#94A3B8" : "#683F1A";

  return (
    <g>
      {/* Trunk with flare roots */}
      <path
        d="M -30 -90 L 30 -90 L 38 40 L 70 95 L -70 95 L -38 40 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
        strokeLinejoin="round"
      />
      {!isSilhouette && (
        <>
          <path
            d="M -15 -60 L -10 60"
            stroke="#683F1A"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.3}
          />
          <path
            d="M 12 -40 L 16 70"
            stroke="#683F1A"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.3}
          />
        </>
      )}
    </g>
  );
};

const TreeCanopyGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#38A169";
  const strokeColor = isSilhouette ? "#94A3B8" : "#22543D";

  return (
    <g>
      {/* Cloud-shaped lush canopy */}
      <path
        d="M -140 20 
           C -170 -10 -150 -70 -100 -80 
           C -100 -140 -20 -150 20 -130 
           C 60 -160 140 -120 140 -60 
           C 180 -30 170 40 120 60 
           C 110 100 20 110 -20 80 
           C -70 110 -130 70 -140 20 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
        strokeLinejoin="round"
      />
      {!isSilhouette && (
        <>
          {/* Lighter top highlight */}
          <path
            d="M -70 -70 C -30 -120 40 -120 80 -60 C 50 -80 -20 -80 -70 -70 Z"
            fill="#48BB78"
            opacity={0.5}
          />
        </>
      )}
    </g>
  );
};

const AppleGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#E53E3E";
  const strokeColor = isSilhouette ? "#94A3B8" : "#9B2C2C";

  return (
    <g>
      {/* Little Stem */}
      <path
        d="M 0 -22 C 3 -32 10 -34 14 -35"
        stroke={isSilhouette ? "#94A3B8" : "#744210"}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Little Leaf */}
      {!isSilhouette && (
        <path
          d="M 2 -26 C 12 -32 20 -24 16 -18 C 10 -16 6 -20 2 -26 Z"
          fill="#48BB78"
          stroke="#276749"
          strokeWidth="1.5"
        />
      )}
      {/* Apple Body */}
      <path
        d="M 0 -18 
           C -16 -24 -26 -10 -24 6 
           C -22 22 -6 28 0 24 
           C 6 28 22 22 24 6 
           C 26 -10 16 -24 0 -18 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
      {!isSilhouette && (
        <>
          <circle cx="-10" cy="-6" r="3.5" fill="#FFFFFF" opacity={0.35} />
          {/* Cute Smile */}
          <circle cx="-6" cy="4" r="1.8" fill="#1E1B4B" />
          <circle cx="6" cy="4" r="1.8" fill="#1E1B4B" />
          <path
            d="M -4 10 Q 0 14 4 10"
            stroke="#1E1B4B"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
    </g>
  );
};

// -------------------------------------------------------------
// LEVEL 3: Tanaman Wortel Segar
// -------------------------------------------------------------

const SoilMoundGraphic: React.FC<{ isSilhouette?: boolean }> = ({ isSilhouette = false }) => {
  const fillColor = isSilhouette ? "none" : "#795548";
  const strokeColor = isSilhouette ? "#94A3B8" : "#4E342E";

  return (
    <g>
      {/* Rich Soil Mound */}
      <path
        d="M -160 30 
           Q -90 -40 0 -35 
           Q 90 -40 160 30 
           Q 80 50 0 50 
           Q -80 50 -160 30 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
        strokeLinejoin="round"
      />
      {!isSilhouette && (
        <>
          {/* Soil specks */}
          <circle cx="-70" cy="10" r="4" fill="#3E2723" opacity={0.6} />
          <circle cx="-20" cy="18" r="3" fill="#A1887F" opacity={0.6} />
          <circle cx="40" cy="5" r="5" fill="#3E2723" opacity={0.6} />
          <circle cx="90" cy="15" r="3.5" fill="#A1887F" opacity={0.6} />
        </>
      )}
    </g>
  );
};

const CarrotRootGraphic: React.FC<{ isSilhouette?: boolean; angle?: number }> = ({
  isSilhouette = false,
  angle = 0,
}) => {
  const fillColor = isSilhouette ? "none" : "#FF7043";
  const strokeColor = isSilhouette ? "#94A3B8" : "#D84315";

  return (
    <g transform={`rotate(${angle})`}>
      {/* Tapered Carrot */}
      <path
        d="M -26 -60 C -24 -68 24 -68 26 -60 L 4 60 C 2 68 -2 68 -4 60 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
        strokeLinejoin="round"
      />
      {!isSilhouette && (
        <>
          {/* Texture lines */}
          <line x1="-16" y1="-30" x2="-2" y2="-30" stroke="#BF360C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="4" y1="-10" x2="18" y2="-10" stroke="#BF360C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-10" y1="15" x2="2" y2="15" stroke="#BF360C" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eyes & Smile */}
          <circle cx="-7" cy="-45" r="2.5" fill="#1E1B4B" />
          <circle cx="7" cy="-45" r="2.5" fill="#1E1B4B" />
          <path d="M -5 -38 Q 0 -33 5 -38" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="-12" cy="-40" rx="3" ry="2" fill="#FF8A80" opacity={0.8} />
          <ellipse cx="12" cy="-40" rx="3" ry="2" fill="#FF8A80" opacity={0.8} />
        </>
      )}
    </g>
  );
};

const CarrotGreensGraphic: React.FC<{ isSilhouette?: boolean; angle?: number }> = ({
  isSilhouette = false,
  angle = 0,
}) => {
  const fillColor = isSilhouette ? "none" : "#4CAF50";
  const strokeColor = isSilhouette ? "#94A3B8" : "#2E7D32";

  return (
    <g transform={`rotate(${angle})`}>
      {/* 3 Feathery Leaves */}
      <path
        d="M -6 0 C -25 -30 -35 -60 -15 -80 C -5 -60 0 -30 0 0 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
      <path
        d="M 0 0 C 0 -40 0 -75 10 -90 C 20 -70 12 -35 0 0 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
      <path
        d="M 6 0 C 25 -30 35 -60 15 -80 C 5 -60 0 -30 0 0 Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={isSilhouette ? 3 : 2}
        strokeDasharray={isSilhouette ? "6,6" : "none"}
      />
    </g>
  );
};

// -------------------------------------------------------------
// LEVELS DATA
// -------------------------------------------------------------

export const CUT_AND_PASTE_LEVELS: CutAndPasteLevel[] = [
  // -----------------------------------------------------------
  // LEVEL 1: Bunga Cantik dalam Pot
  // -----------------------------------------------------------
  {
    id: "bunga-pot",
    title: "Bunga Cantik dalam Pot",
    subtitle: "Ayo gunting dan tempel bagian-bagian bunga!",
    badge: "Level 1 • Bunga & Pot",
    audioIntro: "ayo gunting dan tempel bagian-bagian tumbuhan",
    audioComplete: "luar biasa bunga cantikmu di dalam pot sudah mekar sempurna",
    pieces: [
      {
        id: "stem",
        name: "Batang Cokelat",
        initialX: 135,
        initialY: 440,
        targetX: 350,
        targetY: 430,
        width: 28,
        height: 225,
        renderPiece: () => <StemGraphic />,
        renderSilhouette: () => <StemGraphic isSilhouette />,
      },
      {
        id: "leaf-left",
        name: "Daun Kiri",
        initialX: 560,
        initialY: 180,
        targetX: 285,
        targetY: 435,
        width: 110,
        height: 70,
        renderPiece: () => (
          <g transform="rotate(-15)">
            <LeafGraphic />
          </g>
        ),
        renderSilhouette: () => (
          <g transform="rotate(-15)">
            <LeafGraphic isSilhouette />
          </g>
        ),
      },
      {
        id: "leaf-right",
        name: "Daun Kanan",
        initialX: 560,
        initialY: 330,
        targetX: 415,
        targetY: 440,
        width: 110,
        height: 70,
        renderPiece: () => (
          <g transform="rotate(20)">
            <LeafGraphic flip />
          </g>
        ),
        renderSilhouette: () => (
          <g transform="rotate(20)">
            <LeafGraphic isSilhouette flip />
          </g>
        ),
      },
      {
        id: "pot",
        name: "Pot Tanaman",
        initialX: 140,
        initialY: 640,
        targetX: 350,
        targetY: 600,
        width: 180,
        height: 140,
        renderPiece: () => <PotGraphic />,
        renderSilhouette: () => <PotGraphic isSilhouette />,
      },
      {
        id: "heart",
        name: "Hiasan Hati",
        initialX: 560,
        initialY: 470,
        targetX: 350,
        targetY: 610,
        width: 60,
        height: 55,
        renderPiece: () => <HeartGraphic />,
        renderSilhouette: () => <HeartGraphic isSilhouette />,
      },
      {
        id: "flower-head",
        name: "Kepala Bunga",
        initialX: 550,
        initialY: 640,
        targetX: 350,
        targetY: 280,
        width: 170,
        height: 170,
        renderPiece: () => <FlowerHeadGraphic />,
        renderSilhouette: () => <FlowerHeadGraphic isSilhouette />,
      },
    ],
    renderPreview: () => (
      <g transform="translate(135, 205) scale(0.36)">
        <StemGraphic />
        <g transform="translate(-65, 5) rotate(-15)">
          <LeafGraphic />
        </g>
        <g transform="translate(65, 10) rotate(20)">
          <LeafGraphic flip />
        </g>
        <g transform="translate(0, 170)">
          <PotGraphic />
        </g>
        <g transform="translate(0, 180)">
          <HeartGraphic />
        </g>
        <g transform="translate(0, -150)">
          <FlowerHeadGraphic />
        </g>
      </g>
    ),
  },

  // -----------------------------------------------------------
  // LEVEL 2: Pohon Apel Ceria
  // -----------------------------------------------------------
  {
    id: "pohon-apel",
    title: "Pohon Apel Ceria",
    subtitle: "Rakit batang, mahkota daun, dan buah apel manis!",
    badge: "Level 2 • Pohon Apel",
    audioIntro: "ayo gunting dan tempel bagian-bagian tumbuhan",
    audioComplete: "hebat sekali pohon apel sudah tersusun dan berbuah lebat",
    pieces: [
      {
        id: "trunk",
        name: "Batang Pohon",
        initialX: 140,
        initialY: 620,
        targetX: 350,
        targetY: 570,
        width: 150,
        height: 190,
        renderPiece: () => <TreeTrunkGraphic />,
        renderSilhouette: () => <TreeTrunkGraphic isSilhouette />,
      },
      {
        id: "canopy",
        name: "Mahkota Daun",
        initialX: 555,
        initialY: 620,
        targetX: 350,
        targetY: 370,
        width: 240,
        height: 190,
        renderPiece: () => (
          <g transform="scale(0.75)">
            <TreeCanopyGraphic />
          </g>
        ),
        renderSilhouette: () => (
          <g transform="scale(0.75)">
            <TreeCanopyGraphic isSilhouette />
          </g>
        ),
      },
      {
        id: "apple-1",
        name: "Apel Manis 1",
        initialX: 135,
        initialY: 420,
        targetX: 290,
        targetY: 360,
        width: 60,
        height: 60,
        renderPiece: () => <AppleGraphic />,
        renderSilhouette: () => <AppleGraphic isSilhouette />,
      },
      {
        id: "apple-2",
        name: "Apel Manis 2",
        initialX: 560,
        initialY: 200,
        targetX: 350,
        targetY: 300,
        width: 60,
        height: 60,
        renderPiece: () => <AppleGraphic />,
        renderSilhouette: () => <AppleGraphic isSilhouette />,
      },
      {
        id: "apple-3",
        name: "Apel Manis 3",
        initialX: 560,
        initialY: 350,
        targetX: 410,
        targetY: 370,
        width: 60,
        height: 60,
        renderPiece: () => <AppleGraphic />,
        renderSilhouette: () => <AppleGraphic isSilhouette />,
      },
    ],
    renderPreview: () => (
      <g transform="translate(135, 205) scale(0.36)">
        <g transform="translate(0, 130)">
          <TreeTrunkGraphic />
        </g>
        <g transform="translate(0, -70) scale(0.75)">
          <TreeCanopyGraphic />
        </g>
        <g transform="translate(-60, -80)">
          <AppleGraphic />
        </g>
        <g transform="translate(0, -140)">
          <AppleGraphic />
        </g>
        <g transform="translate(60, -70)">
          <AppleGraphic />
        </g>
      </g>
    ),
  },

  // -----------------------------------------------------------
  // LEVEL 3: Tanaman Wortel Segar
  // -----------------------------------------------------------
  {
    id: "tanaman-wortel",
    title: "Tanaman Wortel Segar",
    subtitle: "Tanam wortel oranye dan daun hijaunya di kebun!",
    badge: "Level 3 • Wortel Kebun",
    audioIntro: "ayo gunting dan tempel bagian-bagian tumbuhan",
    audioComplete: "bagus sekali tanaman wortel segar sudah tertanam rapi",
    pieces: [
      {
        id: "soil",
        name: "Bedeng Tanah Subur",
        initialX: 135,
        initialY: 650,
        targetX: 350,
        targetY: 620,
        width: 230,
        height: 90,
        renderPiece: () => (
          <g transform="scale(0.72)">
            <SoilMoundGraphic />
          </g>
        ),
        renderSilhouette: () => (
          <g transform="scale(0.72)">
            <SoilMoundGraphic isSilhouette />
          </g>
        ),
      },
      {
        id: "carrot-left",
        name: "Umbi Wortel Kiri",
        initialX: 135,
        initialY: 450,
        targetX: 295,
        targetY: 550,
        width: 70,
        height: 140,
        renderPiece: () => <CarrotRootGraphic angle={-6} />,
        renderSilhouette: () => <CarrotRootGraphic isSilhouette angle={-6} />,
      },
      {
        id: "greens-left",
        name: "Daun Wortel Kiri",
        initialX: 560,
        initialY: 190,
        targetX: 290,
        targetY: 440,
        width: 80,
        height: 110,
        renderPiece: () => <CarrotGreensGraphic angle={-8} />,
        renderSilhouette: () => <CarrotGreensGraphic isSilhouette angle={-8} />,
      },
      {
        id: "carrot-right",
        name: "Umbi Wortel Kanan",
        initialX: 560,
        initialY: 360,
        targetX: 405,
        targetY: 550,
        width: 70,
        height: 140,
        renderPiece: () => <CarrotRootGraphic angle={6} />,
        renderSilhouette: () => <CarrotRootGraphic isSilhouette angle={6} />,
      },
      {
        id: "greens-right",
        name: "Daun Wortel Kanan",
        initialX: 560,
        initialY: 560,
        targetX: 410,
        targetY: 440,
        width: 80,
        height: 110,
        renderPiece: () => <CarrotGreensGraphic angle={8} />,
        renderSilhouette: () => <CarrotGreensGraphic isSilhouette angle={8} />,
      },
    ],
    renderPreview: () => (
      <g transform="translate(135, 205) scale(0.38)">
        <g transform="translate(0, 110) scale(0.72)">
          <SoilMoundGraphic />
        </g>
        <g transform="translate(-55, 30)">
          <CarrotRootGraphic angle={-6} />
        </g>
        <g transform="translate(-60, -80)">
          <CarrotGreensGraphic angle={-8} />
        </g>
        <g transform="translate(55, 30)">
          <CarrotRootGraphic angle={6} />
        </g>
        <g transform="translate(60, -80)">
          <CarrotGreensGraphic angle={8} />
        </g>
      </g>
    ),
  },
];
