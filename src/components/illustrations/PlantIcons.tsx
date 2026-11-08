import React from "react";

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const PlantIllustrations: Record<string, React.FC<SvgProps>> = {
  // === AKAR (3 Variasi) ===
  akar_1: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Akar Tunggang Pohon dalam Tanah */}
      <line x1="12" y1="22" x2="88" y2="22" stroke="#713f12" strokeWidth="3" strokeDasharray="5 3" strokeLinecap="round" />
      <path d="M46 10 L54 10 L52 22 L48 22 Z" fill="#65a30d" />
      <path d="M45 22 C46 44 48 68 50 94 C52 68 54 44 55 22 Z" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
      <path d="M48 34 C36 42 26 52 18 64" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M52 36 C64 44 74 54 82 66" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M48 52 C38 60 30 70 24 82" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M52 54 C62 62 70 72 76 84" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  akar_2: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Akar Serabut Rumput Menyebar */}
      <path d="M47 12 L53 12 L51 24 L49 24 Z" fill="#65a30d" />
      <line x1="18" y1="24" x2="82" y2="24" stroke="#78350f" strokeWidth="3" strokeDasharray="4 2" />
      <g stroke="#b45309" strokeWidth="2.5" strokeLinecap="round">
        <path d="M50 24 C48 38 44 58 42 86" />
        <path d="M50 24 C52 40 56 60 58 88" />
        <path d="M50 24 C40 36 28 50 20 68" />
        <path d="M50 24 C60 36 72 50 80 68" />
        <path d="M50 24 C42 46 32 68 28 88" />
        <path d="M50 24 C58 46 68 68 72 88" />
      </g>
    </svg>
  ),

  akar_3: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Akar Umbi Tunggang (Wortel) */}
      <defs>
        <radialGradient id="carrotRootGrad" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </radialGradient>
      </defs>
      <path d="M44 24 C40 14 36 8 32 6 C36 12 42 16 44 24 Z" fill="#22c55e" />
      <path d="M50 24 C50 10 52 4 54 4 C54 10 52 16 50 24 Z" fill="#16a34a" />
      <path d="M56 24 C60 14 64 8 68 6 C64 12 58 16 56 24 Z" fill="#22c55e" />
      <path d="M34 26 C34 24 66 24 66 26 C66 42 56 78 51 92 C49 92 42 78 34 26 Z" fill="url(#carrotRootGrad)" stroke="#c2410c" strokeWidth="1.5" />
      <path d="M38 46 C30 46 26 44 22 40" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M60 56 C68 56 74 54 78 50" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M46 76 C38 78 32 76 28 72" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // === BATANG (3 Variasi) ===
  batang_1: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Batang Kayu Pohon Berkambium */}
      <defs>
        <linearGradient id="treeBarkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="40%" stopColor="#b45309" />
          <stop offset="80%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      <path d="M34 94 C36 74 38 48 36 24 C42 28 52 30 64 24 C62 48 64 74 66 94 C54 96 44 96 34 94 Z" fill="url(#treeBarkGrad)" stroke="#451a03" strokeWidth="2" />
      <path d="M63 46 C72 42 80 34 84 26 C80 32 70 38 63 40 Z" fill="#78350f" />
      <path d="M84 26 C88 20 92 24 88 28 C85 28 84 27 84 26 Z" fill="#22c55e" />
      <path d="M45 36 C43 50 47 64 45 80" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
      <path d="M53 32 C55 48 51 68 55 86" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="24" rx="14" ry="5.5" fill="#d97706" stroke="#451a03" strokeWidth="2" />
      <ellipse cx="50" cy="24" rx="8" ry="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
    </svg>
  ),

  batang_2: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Batang Bambu Beruas Hijau */}
      <defs>
        <linearGradient id="bambooGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="40%" stopColor="#22c55e" />
          <stop offset="80%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
      <rect x="42" y="68" width="16" height="24" rx="3" fill="url(#bambooGreen)" stroke="#166534" strokeWidth="1.5" />
      <path d="M40 68 C40 66 60 66 60 68 Z" stroke="#15803d" strokeWidth="3" fill="#86efac" />
      <rect x="42" y="40" width="16" height="28" rx="3" fill="url(#bambooGreen)" stroke="#166534" strokeWidth="1.5" />
      <path d="M40 40 C40 38 60 38 60 40 Z" stroke="#15803d" strokeWidth="3" fill="#86efac" />
      <rect x="42" y="16" width="16" height="24" rx="3" fill="url(#bambooGreen)" stroke="#166534" strokeWidth="1.5" />
      <path d="M40 40 C30 36 24 28 22 22 C30 26 38 34 40 40 Z" fill="#22c55e" />
      <path d="M60 40 C70 36 78 30 82 24 C74 28 64 36 60 40 Z" fill="#16a34a" />
    </svg>
  ),

  batang_3: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Batang Kaktus Berdaging Sukulen */}
      <defs>
        <linearGradient id="cactusGreen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="26" ry="6" fill="#78350f" opacity="0.4" />
      <path d="M40 88 L40 32 C40 20 60 20 60 32 L60 88 Z" fill="url(#cactusGreen)" stroke="#14532d" strokeWidth="2" />
      <path d="M40 64 L28 64 C22 64 22 46 22 42 C22 36 30 36 30 42 L30 52 L40 52 Z" fill="url(#cactusGreen)" stroke="#14532d" strokeWidth="1.5" />
      <path d="M60 56 L72 56 C78 56 78 40 78 36 C78 30 70 30 70 36 L70 46 L60 46 Z" fill="url(#cactusGreen)" stroke="#14532d" strokeWidth="1.5" />
      <path d="M47 24 L47 88" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M53 24 L53 88" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  ),

  // === DAUN (3 Variasi) ===
  daun_1: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Daun Menyirip Oval */}
      <defs>
        <linearGradient id="pinnateLeafGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
      </defs>
      <path d="M22 84 C30 76 38 68 44 60" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 74 C20 56 24 34 50 16 C70 32 86 52 70 76 C54 84 40 82 32 74 Z" fill="url(#pinnateLeafGrad)" stroke="#14532d" strokeWidth="2" />
      <path d="M36 70 C48 50 56 36 50 16" stroke="#dcfce7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 60 C48 64 56 68 64 68" stroke="#dcfce7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M38 58 C32 56 26 54 22 50" stroke="#dcfce7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M44 48 C54 52 64 54 72 52" stroke="#dcfce7" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  daun_2: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Daun Menjari Pepaya */}
      <defs>
        <linearGradient id="palmateGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="60%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>
      <path d="M50 92 C50 78 50 65 50 55" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M50 55 C46 56 34 68 24 66 C22 62 26 56 32 54 C24 52 14 50 12 42 C16 38 26 40 34 44 C30 38 26 24 34 20 C38 24 42 32 46 38 C46 30 46 16 50 10 C54 16 54 30 54 38 C58 32 62 24 66 20 C74 24 70 38 66 44 C74 40 84 38 88 42 C86 50 76 52 68 54 C74 56 78 62 76 66 C66 68 54 56 50 55 Z"
        fill="url(#palmateGrad)"
        stroke="#14532d"
        strokeWidth="1.5"
      />
      <path d="M50 55 L50 16" stroke="#bbf7d0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 48 L35 24" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 48 L65 24" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  daun_3: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Daun Bentuk Hati Sirih */}
      <defs>
        <radialGradient id="heartLeaf" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="70%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#14532d" />
        </radialGradient>
      </defs>
      <path d="M50 92 C50 82 52 74 50 68" stroke="#14532d" strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M50 72 C32 70 12 56 12 34 C12 18 28 12 40 18 C46 22 48 26 50 30 C52 26 54 22 60 18 C72 12 88 18 88 34 C88 56 68 70 50 72 Z"
        fill="url(#heartLeaf)"
        stroke="#15803d"
        strokeWidth="1.5"
      />
      <path d="M50 28 L50 70" stroke="#bbf7d0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 38 C38 42 26 40 20 36" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M50 38 C62 42 74 40 80 36" stroke="#bbf7d0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // === BUNGA (3 Variasi) ===
  bunga_1: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Bunga Mahkota Bulat 8 Kelopak Merah Muda */}
      <defs>
        <radialGradient id="pinkCenter" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </radialGradient>
      </defs>
      <path d="M50 50 L50 92" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 72 C38 68 32 60 30 54 C38 52 46 62 50 72 Z" fill="#22c55e" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <circle
          key={deg}
          cx="50"
          cy="28"
          r="13"
          fill="#f43f5e"
          stroke="#be123c"
          strokeWidth="1.2"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="url(#pinkCenter)" stroke="#ca8a04" strokeWidth="2" />
    </svg>
  ),

  bunga_2: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Bunga Mawar Merah Berlapis */}
      <defs>
        <radialGradient id="roseRedGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="70%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </radialGradient>
      </defs>
      <path d="M50 50 C48 68 54 84 52 94" stroke="#166534" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M51 68 C42 66 36 60 34 54 C42 56 48 62 51 68 Z" fill="#22c55e" />
      <path d="M42 50 C46 54 50 58 50 62 C50 58 54 54 58 50 Z" fill="#15803d" />
      <circle cx="50" cy="38" r="22" fill="url(#roseRedGrad)" stroke="#881337" strokeWidth="1.5" />
      <path d="M38 32 C44 24 58 24 62 32 C64 40 56 46 50 46 C44 46 36 40 38 32 Z" fill="#f43f5e" />
      <path d="M44 36 C47 32 53 32 56 36 C56 40 53 42 50 42 C47 42 44 40 44 36 Z" fill="#be123c" />
    </svg>
  ),

  bunga_3: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Bunga Tulip / Terompet Oranye */}
      <defs>
        <linearGradient id="tulipGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fde047" />
        </linearGradient>
      </defs>
      <path d="M50 64 L50 94" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 78 C36 74 28 62 26 50 C36 54 44 66 50 78 Z" fill="#22c55e" />
      {/* Kelopak Luar Kiri */}
      <path d="M50 64 C32 62 24 40 30 22 C40 34 46 50 50 64 Z" fill="url(#tulipGrad)" stroke="#c2410c" strokeWidth="1.5" />
      {/* Kelopak Luar Kanan */}
      <path d="M50 64 C68 62 76 40 70 22 C60 34 54 50 50 64 Z" fill="url(#tulipGrad)" stroke="#c2410c" strokeWidth="1.5" />
      {/* Kelopak Tengah */}
      <path d="M50 64 C42 46 42 28 50 18 C58 28 58 46 50 64 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
    </svg>
  ),

  // === BUAH (3 Variasi) ===
  buah_1: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Buah Apel Merah */}
      <defs>
        <radialGradient id="appleGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="60%" stopColor="#e02424" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
      </defs>
      <path d="M50 32 C50 18 58 12 60 10" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 24 C64 16 74 22 72 30 C60 33 53 28 52 24 Z" fill="#22c55e" />
      <path
        d="M50 35 C42 27 20 28 18 52 C16 75 36 90 48 90 C50 90 50 88 52 88 C54 88 54 90 56 90 C68 90 86 75 84 52 C82 28 60 27 52 35 Z"
        fill="url(#appleGrad)"
      />
      <path d="M28 42 C26 50 28 62 33 68 C31 62 30 52 32 44 C33 40 31 38 28 42 Z" fill="#ffffff" opacity="0.45" />
    </svg>
  ),

  buah_2: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Buah Jeruk Bulat Segar */}
      <defs>
        <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
      </defs>
      <path d="M50 20 C62 8 76 16 72 26 C58 28 52 24 50 20 Z" fill="#22c55e" />
      <rect x="48" y="16" width="4" height="8" rx="2" fill="#78350f" />
      <circle cx="50" cy="56" r="36" fill="url(#orangeGrad)" />
      <circle cx="36" cy="46" r="1.5" fill="#ea580c" opacity="0.6" />
      <circle cx="62" cy="50" r="1.5" fill="#ea580c" opacity="0.6" />
      <circle cx="45" cy="68" r="1.5" fill="#ea580c" opacity="0.6" />
      <ellipse cx="38" cy="42" rx="10" ry="6" fill="#ffffff" opacity="0.35" transform="rotate(-30 38 42)" />
    </svg>
  ),

  buah_3: (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Buah Pisang Tandan Kuning */}
      <defs>
        <linearGradient id="bananaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <path d="M22 22 L27 18 L32 23 L28 27 Z" fill="#65a30d" />
      <path d="M26 22 C46 32 76 50 78 80 C68 84 48 76 34 56 C24 42 22 28 26 22 Z" fill="url(#bananaGrad)" />
      <path d="M26 22 C48 38 72 58 74 81 C77 80 81 76 80 72 C76 46 48 28 26 22 Z" fill="#facc15" />
      <circle cx="77" cy="80" r="3.5" fill="#78350f" />
      <path d="M35 34 C48 46 64 62 66 74" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  ),
};

export const BasketIllustrations: Record<string, React.FC<SvgProps>> = {
  akar: (props) => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="basketAkarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6b21a8" />
        </linearGradient>
      </defs>
      <path d="M34 40 C34 16 86 16 86 40" stroke="#3b0764" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="46" ry="10" fill="#9333ea" stroke="#3b0764" strokeWidth="3" />
      <path d="M16 42 C22 76 32 90 60 90 C88 90 98 76 104 42 Z" fill="url(#basketAkarGrad)" stroke="#3b0764" strokeWidth="3" />
      <circle cx="60" cy="64" r="14" fill="#581c87" stroke="#ffffff" strokeWidth="2" />
      <path d="M60 56 L60 72 M60 64 L55 69 M60 64 L65 69" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  batang: (props) => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="basketBatangGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      <path d="M34 40 C34 16 86 16 86 40" stroke="#451a03" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="46" ry="10" fill="#b45309" stroke="#451a03" strokeWidth="3" />
      <path d="M16 42 C22 76 32 90 60 90 C88 90 98 76 104 42 Z" fill="url(#basketBatangGrad)" stroke="#451a03" strokeWidth="3" />
      <circle cx="60" cy="64" r="14" fill="#78350f" stroke="#ffffff" strokeWidth="2" />
      <rect x="57" y="56" width="6" height="16" rx="2" fill="#fde68a" />
    </svg>
  ),

  daun: (props) => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="basketDaunGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <path d="M34 40 C34 16 86 16 86 40" stroke="#14532d" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="46" ry="10" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
      <path d="M16 42 C22 76 32 90 60 90 C88 90 98 76 104 42 Z" fill="url(#basketDaunGrad)" stroke="#14532d" strokeWidth="3" />
      <circle cx="60" cy="64" r="14" fill="#15803d" stroke="#ffffff" strokeWidth="2" />
      <path d="M53 68 C53 58 65 54 67 58 C67 68 55 70 53 68 Z" fill="#86efac" />
    </svg>
  ),

  bunga: (props) => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="basketBungaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
      </defs>
      <path d="M34 40 C34 16 86 16 86 40" stroke="#881337" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="46" ry="10" fill="#e11d48" stroke="#881337" strokeWidth="3" />
      <path d="M16 42 C22 76 32 90 60 90 C88 90 98 76 104 42 Z" fill="url(#basketBungaGrad)" stroke="#881337" strokeWidth="3" />
      <circle cx="60" cy="64" r="14" fill="#881337" stroke="#ffffff" strokeWidth="2" />
      <circle cx="60" cy="64" r="5" fill="#fbbf24" />
    </svg>
  ),

  buah: (props) => (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="basketBuahGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <path d="M34 40 C34 16 86 16 86 40" stroke="#9a3412" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="60" cy="42" rx="46" ry="10" fill="#f97316" stroke="#9a3412" strokeWidth="3" />
      <path d="M16 42 C22 76 32 90 60 90 C88 90 98 76 104 42 Z" fill="url(#basketBuahGrad)" stroke="#9a3412" strokeWidth="3" />
      <circle cx="60" cy="64" r="14" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <path d="M60 55 C60 51 63 49 65 48" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};
