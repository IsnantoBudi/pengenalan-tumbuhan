// Data definition for Plant Parts Tracing & Drawing Game

export interface Point2D {
  x: number;
  y: number;
}

export interface ArrowPoint {
  x: number;
  y: number;
  angle: number;
}

export interface TracingSegment {
  id: string;
  name: string;
  startWaypoint: number;
  endWaypoint: number;
  startPoint: Point2D;
  endPoint: Point2D;
  d: string;
  arrows: ArrowPoint[];
  samplePoints: Point2D[];
}

export interface CompletedSvgPath {
  d: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface TracingShape {
  id: string;
  title: string;
  badgeText: string;
  emoji: string;
  category: 'buah' | 'daun' | 'batang' | 'bunga' | 'akar';
  audioWord: string;
  description: string;
  color: string;
  fillColor: string;
  accentColor: string;
  backgroundGuides: string[];
  completedSvgPaths: CompletedSvgPath[];
  segments: TracingSegment[];
}

export const PLANT_TRACING_SHAPES: TracingShape[] = [
  {
    "id": "buah-apel",
    "title": "Buah (Apel)",
    "badgeText": "Buah (Apel)",
    "emoji": "🍎",
    "category": "buah",
    "audioWord": "Buah Apel",
    "description": "Buah adalah bagian tanaman yang melindungi biji dan menyimpan cadangan makanan manis.",
    "color": "#ef4444",
    "fillColor": "#ef4444",
    "accentColor": "#22c55e",
    "backgroundGuides": [
      "M 235 165 C 130 140, 110 360, 250 420",
      "M 250 420 C 390 360, 370 140, 265 165",
      "M 250 165 C 255 130, 260 105, 275 80",
      "M 260 120 C 290 85, 330 95, 345 120"
    ],
    "completedSvgPaths": [
      {
        "d": "M 235 165 C 130 140, 110 360, 250 420 C 390 360, 370 140, 265 165 Z",
        "fill": "#ef4444",
        "stroke": "#dc2626",
        "strokeWidth": 6
      },
      {
        "d": "M 250 165 C 255 130, 260 105, 275 80",
        "fill": "none",
        "stroke": "#78350f",
        "strokeWidth": 12
      },
      {
        "d": "M 260 120 C 290 85, 330 95, 345 120 C 320 140, 280 140, 260 120 Z",
        "fill": "#22c55e",
        "stroke": "#16a34a",
        "strokeWidth": 5
      }
    ],
    "segments": [
      {
        "id": "apel-1",
        "name": "Lengkung Kiri Apel",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 235,
          "y": 165
        },
        "endPoint": {
          "x": 250,
          "y": 420
        },
        "d": "M 235 165 C 130 140, 110 360, 250 420",
        "arrows": [
          {
            "x": 182.8,
            "y": 176.2,
            "angle": 135.4
          },
          {
            "x": 154.6,
            "y": 226.7,
            "angle": 100.6
          },
          {
            "x": 154.0,
            "y": 297.1,
            "angle": 76.6
          },
          {
            "x": 184.6,
            "y": 368.0,
            "angle": 50.9
          }
        ],
        "samplePoints": [
          {
            "x": 235.0,
            "y": 165.0
          },
          {
            "x": 216.3,
            "y": 163.1
          },
          {
            "x": 199.8,
            "y": 166.3
          },
          {
            "x": 185.4,
            "y": 174.1
          },
          {
            "x": 173.4,
            "y": 185.9
          },
          {
            "x": 163.8,
            "y": 201.0
          },
          {
            "x": 156.7,
            "y": 218.9
          },
          {
            "x": 152.3,
            "y": 239.0
          },
          {
            "x": 150.6,
            "y": 260.6
          },
          {
            "x": 151.8,
            "y": 283.3
          },
          {
            "x": 156.0,
            "y": 306.4
          },
          {
            "x": 163.3,
            "y": 329.2
          },
          {
            "x": 173.8,
            "y": 351.3
          },
          {
            "x": 187.6,
            "y": 372.0
          },
          {
            "x": 204.9,
            "y": 390.8
          },
          {
            "x": 225.6,
            "y": 407.0
          },
          {
            "x": 250.0,
            "y": 420.0
          }
        ]
      },
      {
        "id": "apel-2",
        "name": "Lengkung Kanan Apel",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 250,
          "y": 420
        },
        "endPoint": {
          "x": 265,
          "y": 165
        },
        "d": "M 250 420 C 390 360, 370 140, 265 165",
        "arrows": [
          {
            "x": 315.4,
            "y": 368.0,
            "angle": -56.5
          },
          {
            "x": 346.0,
            "y": 297.1,
            "angle": -81.3
          },
          {
            "x": 345.4,
            "y": 226.7,
            "angle": -106.1
          },
          {
            "x": 317.2,
            "y": 176.2,
            "angle": -145.2
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 420.0
          },
          {
            "x": 274.4,
            "y": 407.0
          },
          {
            "x": 295.1,
            "y": 390.8
          },
          {
            "x": 312.4,
            "y": 372.0
          },
          {
            "x": 326.2,
            "y": 351.3
          },
          {
            "x": 336.7,
            "y": 329.2
          },
          {
            "x": 344.0,
            "y": 306.4
          },
          {
            "x": 348.2,
            "y": 283.3
          },
          {
            "x": 349.4,
            "y": 260.6
          },
          {
            "x": 347.7,
            "y": 239.0
          },
          {
            "x": 343.3,
            "y": 218.9
          },
          {
            "x": 336.2,
            "y": 201.0
          },
          {
            "x": 326.6,
            "y": 185.9
          },
          {
            "x": 314.6,
            "y": 174.1
          },
          {
            "x": 300.2,
            "y": 166.3
          },
          {
            "x": 283.7,
            "y": 163.1
          },
          {
            "x": 265.0,
            "y": 165.0
          }
        ]
      },
      {
        "id": "apel-3",
        "name": "Tangkai Buah",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 250,
          "y": 165
        },
        "endPoint": {
          "x": 275,
          "y": 80
        },
        "d": "M 250 165 C 255 130, 260 105, 275 80",
        "arrows": [
          {
            "x": 253.9,
            "y": 140.5,
            "angle": -79.3
          },
          {
            "x": 258.8,
            "y": 118.8,
            "angle": -74.2
          },
          {
            "x": 265.5,
            "y": 98.9,
            "angle": -66.8
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 165.0
          },
          {
            "x": 251.5,
            "y": 154.8
          },
          {
            "x": 253.1,
            "y": 145.1
          },
          {
            "x": 254.8,
            "y": 135.9
          },
          {
            "x": 256.6,
            "y": 127.2
          },
          {
            "x": 258.8,
            "y": 118.8
          },
          {
            "x": 261.2,
            "y": 110.6
          },
          {
            "x": 263.9,
            "y": 102.8
          },
          {
            "x": 267.1,
            "y": 95.1
          },
          {
            "x": 270.8,
            "y": 87.5
          },
          {
            "x": 275.0,
            "y": 80.0
          }
        ]
      },
      {
        "id": "apel-4",
        "name": "Daun Apel",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 260,
          "y": 120
        },
        "endPoint": {
          "x": 345,
          "y": 120
        },
        "d": "M 260 120 C 290 85, 330 95, 345 120",
        "arrows": [
          {
            "x": 283.8,
            "y": 101.7,
            "angle": -21.4
          },
          {
            "x": 308.1,
            "y": 97.5,
            "angle": 6.8
          },
          {
            "x": 329.6,
            "y": 104.5,
            "angle": 33.8
          }
        ],
        "samplePoints": [
          {
            "x": 260.0,
            "y": 120.0
          },
          {
            "x": 267.7,
            "y": 112.2
          },
          {
            "x": 275.7,
            "y": 106.1
          },
          {
            "x": 283.8,
            "y": 101.7
          },
          {
            "x": 292.0,
            "y": 98.9
          },
          {
            "x": 300.2,
            "y": 97.5
          },
          {
            "x": 308.1,
            "y": 97.5
          },
          {
            "x": 315.8,
            "y": 98.7
          },
          {
            "x": 323.0,
            "y": 101.1
          },
          {
            "x": 329.6,
            "y": 104.5
          },
          {
            "x": 335.6,
            "y": 108.9
          },
          {
            "x": 340.7,
            "y": 114.1
          },
          {
            "x": 345.0,
            "y": 120.0
          }
        ]
      }
    ]
  },
  {
    "id": "daun",
    "title": "Daun",
    "badgeText": "Daun Hijau",
    "emoji": "🍃",
    "category": "daun",
    "audioWord": "Daun Hijau",
    "description": "Daun adalah tempat tumbuhan membuat makanan melalui proses fotosintesis dengan bantuan sinar matahari.",
    "color": "#10b981",
    "fillColor": "#10b981",
    "accentColor": "#047857",
    "backgroundGuides": [
      "M 190 420 C 100 310, 120 180, 290 90",
      "M 290 90 C 380 180, 390 310, 215 420",
      "M 200 420 C 225 310, 255 200, 290 90",
      "M 230 310 C 190 290, 160 275, 140 260",
      "M 255 230 C 290 215, 320 205, 350 195"
    ],
    "completedSvgPaths": [
      {
        "d": "M 190 420 C 100 310, 120 180, 290 90 C 380 180, 390 310, 215 420 Z",
        "fill": "#10b981",
        "stroke": "#059669",
        "strokeWidth": 6
      },
      {
        "d": "M 200 420 C 225 310, 255 200, 290 90",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 8
      },
      {
        "d": "M 230 310 C 190 290, 160 275, 140 260",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 5
      },
      {
        "d": "M 255 230 C 290 215, 320 205, 350 195",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 5
      }
    ],
    "segments": [
      {
        "id": "daun-1",
        "name": "Lengkung Kiri Daun",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 190,
          "y": 420
        },
        "endPoint": {
          "x": 290,
          "y": 90
        },
        "d": "M 190 420 C 100 310, 120 180, 290 90",
        "arrows": [
          {
            "x": 149.5,
            "y": 352.1,
            "angle": -108.9
          },
          {
            "x": 137.4,
            "y": 282.2,
            "angle": -85.3
          },
          {
            "x": 155.4,
            "y": 213.4,
            "angle": -61.1
          },
          {
            "x": 205.7,
            "y": 148.3,
            "angle": -41.1
          }
        ],
        "samplePoints": [
          {
            "x": 190.0,
            "y": 420.0
          },
          {
            "x": 174.4,
            "y": 399.2
          },
          {
            "x": 161.5,
            "y": 377.9
          },
          {
            "x": 151.2,
            "y": 356.4
          },
          {
            "x": 143.8,
            "y": 334.7
          },
          {
            "x": 139.1,
            "y": 312.8
          },
          {
            "x": 137.3,
            "y": 291.0
          },
          {
            "x": 138.4,
            "y": 269.2
          },
          {
            "x": 142.5,
            "y": 247.5
          },
          {
            "x": 149.7,
            "y": 226.1
          },
          {
            "x": 159.9,
            "y": 205.0
          },
          {
            "x": 173.3,
            "y": 184.3
          },
          {
            "x": 190.0,
            "y": 164.1
          },
          {
            "x": 209.9,
            "y": 144.4
          },
          {
            "x": 233.2,
            "y": 125.5
          },
          {
            "x": 259.9,
            "y": 107.3
          },
          {
            "x": 290.0,
            "y": 90.0
          }
        ]
      },
      {
        "id": "daun-2",
        "name": "Lengkung Kanan Daun",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 290,
          "y": 90
        },
        "endPoint": {
          "x": 215,
          "y": 420
        },
        "d": "M 290 90 C 380 180, 390 310, 215 420",
        "arrows": [
          {
            "x": 333.6,
            "y": 148.3,
            "angle": 64.6
          },
          {
            "x": 352.9,
            "y": 213.4,
            "angle": 87.8
          },
          {
            "x": 342.9,
            "y": 282.2,
            "angle": 113.0
          },
          {
            "x": 298.6,
            "y": 352.1,
            "angle": 134.1
          }
        ],
        "samplePoints": [
          {
            "x": 290.0,
            "y": 90.0
          },
          {
            "x": 305.9,
            "y": 107.3
          },
          {
            "x": 319.8,
            "y": 125.5
          },
          {
            "x": 331.5,
            "y": 144.4
          },
          {
            "x": 340.9,
            "y": 164.1
          },
          {
            "x": 347.7,
            "y": 184.3
          },
          {
            "x": 352.0,
            "y": 205.0
          },
          {
            "x": 353.4,
            "y": 226.1
          },
          {
            "x": 351.9,
            "y": 247.5
          },
          {
            "x": 347.2,
            "y": 269.2
          },
          {
            "x": 339.4,
            "y": 291.0
          },
          {
            "x": 328.1,
            "y": 312.8
          },
          {
            "x": 313.2,
            "y": 334.7
          },
          {
            "x": 294.6,
            "y": 356.4
          },
          {
            "x": 272.2,
            "y": 377.9
          },
          {
            "x": 245.7,
            "y": 399.2
          },
          {
            "x": 215.0,
            "y": 420.0
          }
        ]
      },
      {
        "id": "daun-3",
        "name": "Tulang Utama Daun",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 200,
          "y": 420
        },
        "endPoint": {
          "x": 290,
          "y": 90
        },
        "d": "M 200 420 C 225 310, 255 200, 290 90",
        "arrows": [
          {
            "x": 215.6,
            "y": 354.0,
            "angle": -76.1
          },
          {
            "x": 232.4,
            "y": 288.0,
            "angle": -75.1
          },
          {
            "x": 250.4,
            "y": 222.0,
            "angle": -74.2
          },
          {
            "x": 269.6,
            "y": 156.0,
            "angle": -73.2
          }
        ],
        "samplePoints": [
          {
            "x": 200.0,
            "y": 420.0
          },
          {
            "x": 204.7,
            "y": 399.4
          },
          {
            "x": 209.6,
            "y": 378.8
          },
          {
            "x": 214.6,
            "y": 358.1
          },
          {
            "x": 219.7,
            "y": 337.5
          },
          {
            "x": 224.9,
            "y": 316.9
          },
          {
            "x": 230.2,
            "y": 296.2
          },
          {
            "x": 235.7,
            "y": 275.6
          },
          {
            "x": 241.2,
            "y": 255.0
          },
          {
            "x": 246.9,
            "y": 234.4
          },
          {
            "x": 252.7,
            "y": 213.8
          },
          {
            "x": 258.7,
            "y": 193.1
          },
          {
            "x": 264.7,
            "y": 172.5
          },
          {
            "x": 270.8,
            "y": 151.9
          },
          {
            "x": 277.1,
            "y": 131.2
          },
          {
            "x": 283.5,
            "y": 110.6
          },
          {
            "x": 290.0,
            "y": 90.0
          }
        ]
      },
      {
        "id": "daun-4",
        "name": "Tulang Cabang Kiri",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 230,
          "y": 310
        },
        "endPoint": {
          "x": 140,
          "y": 260
        },
        "d": "M 230 310 C 190 290, 160 275, 140 260",
        "arrows": [
          {
            "x": 201.9,
            "y": 295.9,
            "angle": -153.0
          },
          {
            "x": 177.5,
            "y": 283.1,
            "angle": -151.4
          },
          {
            "x": 156.9,
            "y": 271.3,
            "angle": -148.2
          }
        ],
        "samplePoints": [
          {
            "x": 230.0,
            "y": 310.0
          },
          {
            "x": 218.3,
            "y": 304.1
          },
          {
            "x": 207.2,
            "y": 298.6
          },
          {
            "x": 196.7,
            "y": 293.2
          },
          {
            "x": 186.8,
            "y": 288.1
          },
          {
            "x": 177.5,
            "y": 283.1
          },
          {
            "x": 168.8,
            "y": 278.3
          },
          {
            "x": 160.7,
            "y": 273.6
          },
          {
            "x": 153.2,
            "y": 269.0
          },
          {
            "x": 146.3,
            "y": 264.5
          },
          {
            "x": 140.0,
            "y": 260.0
          }
        ]
      },
      {
        "id": "daun-5",
        "name": "Tulang Cabang Kanan",
        "startWaypoint": 5,
        "endWaypoint": 6,
        "startPoint": {
          "x": 255,
          "y": 230
        },
        "endPoint": {
          "x": 350,
          "y": 195
        },
        "d": "M 255 230 C 290 215, 320 205, 350 195",
        "arrows": [
          {
            "x": 280.4,
            "y": 219.6,
            "angle": -21.2
          },
          {
            "x": 304.4,
            "y": 210.6,
            "angle": -19.7
          },
          {
            "x": 327.4,
            "y": 202.6,
            "angle": -18.7
          }
        ],
        "samplePoints": [
          {
            "x": 255.0,
            "y": 230.0
          },
          {
            "x": 265.4,
            "y": 225.6
          },
          {
            "x": 275.4,
            "y": 221.6
          },
          {
            "x": 285.3,
            "y": 217.7
          },
          {
            "x": 294.9,
            "y": 214.1
          },
          {
            "x": 304.4,
            "y": 210.6
          },
          {
            "x": 313.7,
            "y": 207.3
          },
          {
            "x": 322.9,
            "y": 204.1
          },
          {
            "x": 332.0,
            "y": 201.0
          },
          {
            "x": 341.0,
            "y": 198.0
          },
          {
            "x": 350.0,
            "y": 195.0
          }
        ]
      }
    ]
  },
  {
    "id": "batang",
    "title": "Batang",
    "badgeText": "Batang Pohon",
    "emoji": "🪵",
    "category": "batang",
    "audioWord": "Batang Pohon",
    "description": "Batang berfungsi menopang pohon agar berdiri tegak dan mengalirkan air ke daun dan ranting.",
    "color": "#b45309",
    "fillColor": "#b45309",
    "accentColor": "#78350f",
    "backgroundGuides": [
      "M 180 110 C 195 230, 185 340, 150 430",
      "M 150 430 C 200 440, 300 440, 350 430",
      "M 350 430 C 315 340, 305 230, 320 110",
      "M 290 220 C 325 205, 360 185, 395 160"
    ],
    "completedSvgPaths": [
      {
        "d": "M 180 110 C 195 230, 185 340, 150 430 C 200 440, 300 440, 350 430 C 315 340, 305 230, 320 110 Z",
        "fill": "#b45309",
        "stroke": "#78350f",
        "strokeWidth": 6
      },
      {
        "d": "M 290 220 C 325 205, 360 185, 395 160",
        "fill": "none",
        "stroke": "#78350f",
        "strokeWidth": 12
      },
      {
        "d": "M 220 200 C 225 260, 220 320, 215 380",
        "fill": "none",
        "stroke": "#78350f",
        "strokeWidth": 4
      },
      {
        "d": "M 270 240 C 275 300, 270 340, 265 400",
        "fill": "none",
        "stroke": "#78350f",
        "strokeWidth": 4
      }
    ],
    "segments": [
      {
        "id": "batang-1",
        "name": "Sisi Kiri Batang",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 180,
          "y": 110
        },
        "endPoint": {
          "x": 150,
          "y": 430
        },
        "d": "M 180 110 C 195 230, 185 340, 150 430",
        "arrows": [
          {
            "x": 186.0,
            "y": 180.7,
            "angle": 88.0
          },
          {
            "x": 186.0,
            "y": 248.6,
            "angle": 93.1
          },
          {
            "x": 180.0,
            "y": 313.0,
            "angle": 98.8
          },
          {
            "x": 168.0,
            "y": 373.7,
            "angle": 105.0
          }
        ],
        "samplePoints": [
          {
            "x": 180.0,
            "y": 110.0
          },
          {
            "x": 182.5,
            "y": 132.4
          },
          {
            "x": 184.5,
            "y": 154.5
          },
          {
            "x": 185.8,
            "y": 176.4
          },
          {
            "x": 186.6,
            "y": 198.0
          },
          {
            "x": 186.7,
            "y": 219.3
          },
          {
            "x": 186.3,
            "y": 240.3
          },
          {
            "x": 185.3,
            "y": 260.9
          },
          {
            "x": 183.8,
            "y": 281.2
          },
          {
            "x": 181.6,
            "y": 301.2
          },
          {
            "x": 178.8,
            "y": 320.8
          },
          {
            "x": 175.5,
            "y": 340.1
          },
          {
            "x": 171.6,
            "y": 358.9
          },
          {
            "x": 167.1,
            "y": 377.3
          },
          {
            "x": 162.0,
            "y": 395.3
          },
          {
            "x": 156.3,
            "y": 412.9
          },
          {
            "x": 150.0,
            "y": 430.0
          }
        ]
      },
      {
        "id": "batang-2",
        "name": "Dasar Batang Bawah",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 150,
          "y": 430
        },
        "endPoint": {
          "x": 350,
          "y": 430
        },
        "d": "M 150 430 C 200 440, 300 440, 350 430",
        "arrows": [
          {
            "x": 195.3,
            "y": 435.6,
            "angle": 3.8
          },
          {
            "x": 250.0,
            "y": 437.5,
            "angle": -0.3
          },
          {
            "x": 304.7,
            "y": 435.6,
            "angle": -4.6
          }
        ],
        "samplePoints": [
          {
            "x": 150.0,
            "y": 430.0
          },
          {
            "x": 166.4,
            "y": 432.7
          },
          {
            "x": 185.2,
            "y": 434.8
          },
          {
            "x": 205.8,
            "y": 436.3
          },
          {
            "x": 227.6,
            "y": 437.2
          },
          {
            "x": 250.0,
            "y": 437.5
          },
          {
            "x": 272.4,
            "y": 437.2
          },
          {
            "x": 294.2,
            "y": 436.3
          },
          {
            "x": 314.8,
            "y": 434.8
          },
          {
            "x": 333.6,
            "y": 432.7
          },
          {
            "x": 350.0,
            "y": 430.0
          }
        ]
      },
      {
        "id": "batang-3",
        "name": "Sisi Kanan Batang",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 350,
          "y": 430
        },
        "endPoint": {
          "x": 320,
          "y": 110
        },
        "d": "M 350 430 C 315 340, 305 230, 320 110",
        "arrows": [
          {
            "x": 332.0,
            "y": 373.7,
            "angle": -103.7
          },
          {
            "x": 320.0,
            "y": 313.0,
            "angle": -97.6
          },
          {
            "x": 314.0,
            "y": 248.6,
            "angle": -92.1
          },
          {
            "x": 314.0,
            "y": 180.7,
            "angle": -87.0
          }
        ],
        "samplePoints": [
          {
            "x": 350.0,
            "y": 430.0
          },
          {
            "x": 343.7,
            "y": 412.9
          },
          {
            "x": 338.0,
            "y": 395.3
          },
          {
            "x": 332.9,
            "y": 377.3
          },
          {
            "x": 328.4,
            "y": 358.9
          },
          {
            "x": 324.5,
            "y": 340.1
          },
          {
            "x": 321.2,
            "y": 320.8
          },
          {
            "x": 318.4,
            "y": 301.2
          },
          {
            "x": 316.2,
            "y": 281.2
          },
          {
            "x": 314.7,
            "y": 260.9
          },
          {
            "x": 313.7,
            "y": 240.3
          },
          {
            "x": 313.3,
            "y": 219.3
          },
          {
            "x": 313.4,
            "y": 198.0
          },
          {
            "x": 314.2,
            "y": 176.4
          },
          {
            "x": 315.5,
            "y": 154.5
          },
          {
            "x": 317.5,
            "y": 132.4
          },
          {
            "x": 320.0,
            "y": 110.0
          }
        ]
      },
      {
        "id": "batang-4",
        "name": "Cabang Dahan Kanan",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 290,
          "y": 220
        },
        "endPoint": {
          "x": 395,
          "y": 160
        },
        "d": "M 290 220 C 325 205, 360 185, 395 160",
        "arrows": [
          {
            "x": 316.2,
            "y": 207.8,
            "angle": -26.8
          },
          {
            "x": 342.5,
            "y": 193.8,
            "angle": -30.0
          },
          {
            "x": 368.8,
            "y": 177.8,
            "angle": -33.0
          }
        ],
        "samplePoints": [
          {
            "x": 290.0,
            "y": 220.0
          },
          {
            "x": 300.5,
            "y": 215.4
          },
          {
            "x": 311.0,
            "y": 210.4
          },
          {
            "x": 321.5,
            "y": 205.1
          },
          {
            "x": 332.0,
            "y": 199.6
          },
          {
            "x": 342.5,
            "y": 193.8
          },
          {
            "x": 353.0,
            "y": 187.6
          },
          {
            "x": 363.5,
            "y": 181.2
          },
          {
            "x": 374.0,
            "y": 174.4
          },
          {
            "x": 384.5,
            "y": 167.3
          },
          {
            "x": 395.0,
            "y": 160.0
          }
        ]
      }
    ]
  },
  {
    "id": "bunga",
    "title": "Bunga",
    "badgeText": "Bunga Cantik",
    "emoji": "🌸",
    "category": "bunga",
    "audioWord": "Bunga Cantik",
    "description": "Bunga adalah alat perkembangbiakan tanaman yang memiliki warna indah dan aroma harum.",
    "color": "#ec4899",
    "fillColor": "#ec4899",
    "accentColor": "#eab308",
    "backgroundGuides": [
      "M 250 205 C 295 205, 295 295, 250 295",
      "M 250 295 C 205 295, 205 205, 250 205",
      "M 215 205 C 200 105, 300 105, 285 205",
      "M 290 215 C 390 195, 390 305, 290 285",
      "M 250 295 C 252 350, 248 390, 250 440"
    ],
    "completedSvgPaths": [
      {
        "d": "M 250 295 C 252 350, 248 390, 250 440",
        "fill": "none",
        "stroke": "#16a34a",
        "strokeWidth": 12
      },
      {
        "d": "M 250 360 C 275 350, 300 355, 315 370 C 295 385, 270 380, 250 370 Z",
        "fill": "#22c55e",
        "stroke": "#16a34a",
        "strokeWidth": 4
      },
      {
        "d": "M 215 205 C 200 105, 300 105, 285 205 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 5
      },
      {
        "d": "M 290 215 C 390 195, 390 305, 290 285 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 5
      },
      {
        "d": "M 285 285 C 320 380, 210 395, 215 285 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 5
      },
      {
        "d": "M 210 285 C 110 305, 110 195, 210 215 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 5
      },
      {
        "d": "M 250 205 C 295 205, 295 295, 250 295 C 205 295, 205 205, 250 205 Z",
        "fill": "#facc15",
        "stroke": "#ca8a04",
        "strokeWidth": 6
      }
    ],
    "segments": [
      {
        "id": "bunga-1",
        "name": "Putik Tengah Bunga",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 250,
          "y": 205
        },
        "endPoint": {
          "x": 250,
          "y": 295
        },
        "d": "M 250 205 C 295 205, 295 295, 250 295",
        "arrows": [
          {
            "x": 271.6,
            "y": 214.4,
            "angle": 50.8
          },
          {
            "x": 282.4,
            "y": 236.7,
            "angle": 80.7
          },
          {
            "x": 282.4,
            "y": 263.3,
            "angle": 104.3
          },
          {
            "x": 271.6,
            "y": 285.6,
            "angle": 137.3
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 205.0
          },
          {
            "x": 257.9,
            "y": 206.0
          },
          {
            "x": 264.8,
            "y": 208.9
          },
          {
            "x": 270.6,
            "y": 213.3
          },
          {
            "x": 275.3,
            "y": 219.1
          },
          {
            "x": 279.0,
            "y": 225.9
          },
          {
            "x": 281.6,
            "y": 233.5
          },
          {
            "x": 283.2,
            "y": 241.6
          },
          {
            "x": 283.8,
            "y": 250.0
          },
          {
            "x": 283.2,
            "y": 258.4
          },
          {
            "x": 281.6,
            "y": 266.5
          },
          {
            "x": 279.0,
            "y": 274.1
          },
          {
            "x": 275.3,
            "y": 280.9
          },
          {
            "x": 270.6,
            "y": 286.7
          },
          {
            "x": 264.8,
            "y": 291.1
          },
          {
            "x": 257.9,
            "y": 294.0
          },
          {
            "x": 250.0,
            "y": 295.0
          }
        ]
      },
      {
        "id": "bunga-2",
        "name": "Putik Sisi Kiri",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 250,
          "y": 295
        },
        "endPoint": {
          "x": 250,
          "y": 205
        },
        "d": "M 250 295 C 205 295, 205 205, 250 205",
        "arrows": [
          {
            "x": 228.4,
            "y": 285.6,
            "angle": -129.2
          },
          {
            "x": 217.6,
            "y": 263.3,
            "angle": -99.3
          },
          {
            "x": 217.6,
            "y": 236.7,
            "angle": -75.7
          },
          {
            "x": 228.4,
            "y": 214.4,
            "angle": -42.7
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 295.0
          },
          {
            "x": 242.1,
            "y": 294.0
          },
          {
            "x": 235.2,
            "y": 291.1
          },
          {
            "x": 229.4,
            "y": 286.7
          },
          {
            "x": 224.7,
            "y": 280.9
          },
          {
            "x": 221.0,
            "y": 274.1
          },
          {
            "x": 218.4,
            "y": 266.5
          },
          {
            "x": 216.8,
            "y": 258.4
          },
          {
            "x": 216.2,
            "y": 250.0
          },
          {
            "x": 216.8,
            "y": 241.6
          },
          {
            "x": 218.4,
            "y": 233.5
          },
          {
            "x": 221.0,
            "y": 225.9
          },
          {
            "x": 224.7,
            "y": 219.1
          },
          {
            "x": 229.4,
            "y": 213.3
          },
          {
            "x": 235.2,
            "y": 208.9
          },
          {
            "x": 242.1,
            "y": 206.0
          },
          {
            "x": 250.0,
            "y": 205.0
          }
        ]
      },
      {
        "id": "bunga-3",
        "name": "Kelopak Atas",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 215,
          "y": 205
        },
        "endPoint": {
          "x": 285,
          "y": 205
        },
        "d": "M 215 205 C 200 105, 300 105, 285 205",
        "arrows": [
          {
            "x": 218.0,
            "y": 157.0,
            "angle": -66.4
          },
          {
            "x": 237.5,
            "y": 133.0,
            "angle": -21.3
          },
          {
            "x": 262.5,
            "y": 133.0,
            "angle": 31.5
          },
          {
            "x": 282.0,
            "y": 157.0,
            "angle": 73.5
          }
        ],
        "samplePoints": [
          {
            "x": 215.0,
            "y": 205.0
          },
          {
            "x": 213.5,
            "y": 187.4
          },
          {
            "x": 214.3,
            "y": 172.2
          },
          {
            "x": 217.2,
            "y": 159.3
          },
          {
            "x": 221.7,
            "y": 148.8
          },
          {
            "x": 227.6,
            "y": 140.5
          },
          {
            "x": 234.5,
            "y": 134.7
          },
          {
            "x": 242.1,
            "y": 131.2
          },
          {
            "x": 250.0,
            "y": 130.0
          },
          {
            "x": 257.9,
            "y": 131.2
          },
          {
            "x": 265.5,
            "y": 134.7
          },
          {
            "x": 272.4,
            "y": 140.5
          },
          {
            "x": 278.3,
            "y": 148.8
          },
          {
            "x": 282.8,
            "y": 159.3
          },
          {
            "x": 285.7,
            "y": 172.2
          },
          {
            "x": 286.5,
            "y": 187.4
          },
          {
            "x": 285.0,
            "y": 205.0
          }
        ]
      },
      {
        "id": "bunga-4",
        "name": "Kelopak Kanan",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 290,
          "y": 215
        },
        "endPoint": {
          "x": 290,
          "y": 285
        },
        "d": "M 290 215 C 390 195, 390 305, 290 285",
        "arrows": [
          {
            "x": 338.0,
            "y": 216.5,
            "angle": 23.7
          },
          {
            "x": 362.0,
            "y": 236.8,
            "angle": 69.7
          },
          {
            "x": 362.0,
            "y": 263.2,
            "angle": 120.2
          },
          {
            "x": 338.0,
            "y": 283.5,
            "angle": 164.0
          }
        ],
        "samplePoints": [
          {
            "x": 290.0,
            "y": 215.0
          },
          {
            "x": 307.6,
            "y": 212.7
          },
          {
            "x": 322.8,
            "y": 213.1
          },
          {
            "x": 335.7,
            "y": 215.7
          },
          {
            "x": 346.2,
            "y": 220.3
          },
          {
            "x": 354.5,
            "y": 226.4
          },
          {
            "x": 360.3,
            "y": 233.6
          },
          {
            "x": 363.8,
            "y": 241.6
          },
          {
            "x": 365.0,
            "y": 250.0
          },
          {
            "x": 363.8,
            "y": 258.4
          },
          {
            "x": 360.3,
            "y": 266.4
          },
          {
            "x": 354.5,
            "y": 273.6
          },
          {
            "x": 346.2,
            "y": 279.7
          },
          {
            "x": 335.7,
            "y": 284.3
          },
          {
            "x": 322.8,
            "y": 286.9
          },
          {
            "x": 307.6,
            "y": 287.3
          },
          {
            "x": 290.0,
            "y": 285.0
          }
        ]
      },
      {
        "id": "bunga-5",
        "name": "Tangkai Bunga Bawah",
        "startWaypoint": 5,
        "endWaypoint": 6,
        "startPoint": {
          "x": 250,
          "y": 295
        },
        "endPoint": {
          "x": 250,
          "y": 440
        },
        "d": "M 250 295 C 252 350, 248 390, 250 440",
        "arrows": [
          {
            "x": 250.6,
            "y": 333.8,
            "angle": 90.4
          },
          {
            "x": 250.0,
            "y": 369.4,
            "angle": 91.2
          },
          {
            "x": 249.4,
            "y": 404.0,
            "angle": 90.2
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 295.0
          },
          {
            "x": 250.4,
            "y": 311.1
          },
          {
            "x": 250.6,
            "y": 326.4
          },
          {
            "x": 250.5,
            "y": 341.1
          },
          {
            "x": 250.3,
            "y": 355.4
          },
          {
            "x": 250.0,
            "y": 369.4
          },
          {
            "x": 249.7,
            "y": 383.2
          },
          {
            "x": 249.5,
            "y": 397.0
          },
          {
            "x": 249.4,
            "y": 411.0
          },
          {
            "x": 249.6,
            "y": 425.3
          },
          {
            "x": 250.0,
            "y": 440.0
          }
        ]
      }
    ]
  },
  {
    "id": "akar",
    "title": "Akar",
    "badgeText": "Akar Pohon",
    "emoji": "🪴",
    "category": "akar",
    "audioWord": "Akar Pohon",
    "description": "Akar berada di dalam tanah, bertugas menyerap air dan garam mineral untuk seluruh bagian tanaman.",
    "color": "#d97706",
    "fillColor": "#d97706",
    "accentColor": "#92400e",
    "backgroundGuides": [
      "M 250 100 C 245 220, 255 340, 250 445",
      "M 248 190 C 200 230, 160 270, 120 320",
      "M 252 220 C 300 250, 340 280, 380 330",
      "M 250 310 C 210 350, 180 380, 150 420",
      "M 250 330 C 290 360, 320 390, 350 420"
    ],
    "completedSvgPaths": [
      {
        "d": "M 250 100 C 245 220, 255 340, 250 445",
        "fill": "none",
        "stroke": "#b45309",
        "strokeWidth": 12
      },
      {
        "d": "M 248 190 C 200 230, 160 270, 120 320",
        "fill": "none",
        "stroke": "#d97706",
        "strokeWidth": 9
      },
      {
        "d": "M 252 220 C 300 250, 340 280, 380 330",
        "fill": "none",
        "stroke": "#d97706",
        "strokeWidth": 9
      },
      {
        "d": "M 250 310 C 210 350, 180 380, 150 420",
        "fill": "none",
        "stroke": "#d97706",
        "strokeWidth": 7
      },
      {
        "d": "M 250 330 C 290 360, 320 390, 350 420",
        "fill": "none",
        "stroke": "#d97706",
        "strokeWidth": 7
      }
    ],
    "segments": [
      {
        "id": "akar-1",
        "name": "Akar Utama Tengah",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 250,
          "y": 100
        },
        "endPoint": {
          "x": 250,
          "y": 445
        },
        "d": "M 250 100 C 245 220, 255 340, 250 445",
        "arrows": [
          {
            "x": 248.6,
            "y": 171.9,
            "angle": 89.9
          },
          {
            "x": 249.3,
            "y": 243.0,
            "angle": 88.9
          },
          {
            "x": 250.7,
            "y": 312.8,
            "angle": 89.0
          },
          {
            "x": 251.4,
            "y": 380.3,
            "angle": 90.3
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 100.0
          },
          {
            "x": 249.2,
            "y": 122.5
          },
          {
            "x": 248.8,
            "y": 145.0
          },
          {
            "x": 248.6,
            "y": 167.4
          },
          {
            "x": 248.6,
            "y": 189.8
          },
          {
            "x": 248.8,
            "y": 212.0
          },
          {
            "x": 249.1,
            "y": 234.2
          },
          {
            "x": 249.5,
            "y": 256.2
          },
          {
            "x": 250.0,
            "y": 278.1
          },
          {
            "x": 250.5,
            "y": 299.8
          },
          {
            "x": 250.9,
            "y": 321.3
          },
          {
            "x": 251.2,
            "y": 342.6
          },
          {
            "x": 251.4,
            "y": 363.7
          },
          {
            "x": 251.4,
            "y": 384.5
          },
          {
            "x": 251.2,
            "y": 405.0
          },
          {
            "x": 250.8,
            "y": 425.1
          },
          {
            "x": 250.0,
            "y": 445.0
          }
        ]
      },
      {
        "id": "akar-2",
        "name": "Cabang Akar Kiri",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 248,
          "y": 190
        },
        "endPoint": {
          "x": 120,
          "y": 320
        },
        "d": "M 248 190 C 200 230, 160 270, 120 320",
        "arrows": [
          {
            "x": 220.1,
            "y": 214.1,
            "angle": 137.9
          },
          {
            "x": 193.7,
            "y": 238.6,
            "angle": 135.6
          },
          {
            "x": 168.5,
            "y": 264.2,
            "angle": 133.2
          },
          {
            "x": 144.1,
            "y": 291.1,
            "angle": 130.7
          }
        ],
        "samplePoints": [
          {
            "x": 248.0,
            "y": 190.0
          },
          {
            "x": 239.1,
            "y": 197.5
          },
          {
            "x": 230.4,
            "y": 205.0
          },
          {
            "x": 221.8,
            "y": 212.6
          },
          {
            "x": 213.4,
            "y": 220.2
          },
          {
            "x": 205.1,
            "y": 227.8
          },
          {
            "x": 197.0,
            "y": 235.5
          },
          {
            "x": 188.9,
            "y": 243.3
          },
          {
            "x": 181.0,
            "y": 251.2
          },
          {
            "x": 173.2,
            "y": 259.3
          },
          {
            "x": 165.4,
            "y": 267.4
          },
          {
            "x": 157.7,
            "y": 275.7
          },
          {
            "x": 150.1,
            "y": 284.2
          },
          {
            "x": 142.6,
            "y": 292.9
          },
          {
            "x": 135.0,
            "y": 301.7
          },
          {
            "x": 127.5,
            "y": 310.7
          },
          {
            "x": 120.0,
            "y": 320.0
          }
        ]
      },
      {
        "id": "akar-3",
        "name": "Cabang Akar Kanan",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 252,
          "y": 220
        },
        "endPoint": {
          "x": 380,
          "y": 330
        },
        "d": "M 252 220 C 300 250, 340 280, 380 330",
        "arrows": [
          {
            "x": 279.9,
            "y": 238.2,
            "angle": 34.6
          },
          {
            "x": 306.3,
            "y": 257.3,
            "angle": 38.1
          },
          {
            "x": 331.5,
            "y": 278.3,
            "angle": 42.5
          },
          {
            "x": 355.9,
            "y": 302.2,
            "angle": 47.2
          }
        ],
        "samplePoints": [
          {
            "x": 252.0,
            "y": 220.0
          },
          {
            "x": 260.9,
            "y": 225.6
          },
          {
            "x": 269.6,
            "y": 231.3
          },
          {
            "x": 278.2,
            "y": 237.0
          },
          {
            "x": 286.6,
            "y": 242.8
          },
          {
            "x": 294.9,
            "y": 248.7
          },
          {
            "x": 303.0,
            "y": 254.8
          },
          {
            "x": 311.1,
            "y": 261.0
          },
          {
            "x": 319.0,
            "y": 267.5
          },
          {
            "x": 326.8,
            "y": 274.2
          },
          {
            "x": 334.6,
            "y": 281.1
          },
          {
            "x": 342.3,
            "y": 288.4
          },
          {
            "x": 349.9,
            "y": 295.9
          },
          {
            "x": 357.4,
            "y": 303.9
          },
          {
            "x": 365.0,
            "y": 312.1
          },
          {
            "x": 372.5,
            "y": 320.9
          },
          {
            "x": 380.0,
            "y": 330.0
          }
        ]
      },
      {
        "id": "akar-4",
        "name": "Akar Serabut Bawah Kiri",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 250,
          "y": 310
        },
        "endPoint": {
          "x": 150,
          "y": 420
        },
        "d": "M 250 310 C 210 350, 180 380, 150 420",
        "arrows": [
          {
            "x": 221.7,
            "y": 338.4,
            "angle": 134.4
          },
          {
            "x": 196.2,
            "y": 365.0,
            "angle": 132.7
          },
          {
            "x": 172.7,
            "y": 391.6,
            "angle": 129.9
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 310.0
          },
          {
            "x": 238.3,
            "y": 321.7
          },
          {
            "x": 227.1,
            "y": 333.0
          },
          {
            "x": 216.4,
            "y": 343.8
          },
          {
            "x": 206.2,
            "y": 354.5
          },
          {
            "x": 196.2,
            "y": 365.0
          },
          {
            "x": 186.6,
            "y": 375.5
          },
          {
            "x": 177.3,
            "y": 386.2
          },
          {
            "x": 168.1,
            "y": 397.0
          },
          {
            "x": 159.0,
            "y": 408.3
          },
          {
            "x": 150.0,
            "y": 420.0
          }
        ]
      },
      {
        "id": "akar-5",
        "name": "Akar Serabut Bawah Kanan",
        "startWaypoint": 5,
        "endWaypoint": 6,
        "startPoint": {
          "x": 250,
          "y": 330
        },
        "endPoint": {
          "x": 350,
          "y": 420
        },
        "d": "M 250 330 C 290 360, 320 390, 350 420",
        "arrows": [
          {
            "x": 278.3,
            "y": 352.5,
            "angle": 40.3
          },
          {
            "x": 303.8,
            "y": 375.0,
            "angle": 42.9
          },
          {
            "x": 327.3,
            "y": 397.5,
            "angle": 44.5
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 330.0
          },
          {
            "x": 261.7,
            "y": 339.0
          },
          {
            "x": 272.9,
            "y": 348.0
          },
          {
            "x": 283.6,
            "y": 357.0
          },
          {
            "x": 293.8,
            "y": 366.0
          },
          {
            "x": 303.8,
            "y": 375.0
          },
          {
            "x": 313.4,
            "y": 384.0
          },
          {
            "x": 322.7,
            "y": 393.0
          },
          {
            "x": 331.9,
            "y": 402.0
          },
          {
            "x": 341.0,
            "y": 411.0
          },
          {
            "x": 350.0,
            "y": 420.0
          }
        ]
      }
    ]
  }
];
