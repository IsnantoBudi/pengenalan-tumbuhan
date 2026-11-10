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
    "description": "Buah apel yang ranum melindungi biji di dalamnya dan menyimpan cadangan nutrisi yang manis dan segar.",
    "color": "#ef4444",
    "fillColor": "#ef4444",
    "accentColor": "#22c55e",
    "backgroundGuides": [
      "M 235 160 C 120 140, 105 360, 250 420",
      "M 250 420 C 395 360, 380 140, 265 160",
      "M 250 160 C 245 125, 230 100, 230 70",
      "M 255 120 C 290 80, 330 85, 355 100"
    ],
    "completedSvgPaths": [
      {
        "d": "M 250 160 C 245 125, 230 100, 230 70",
        "fill": "none",
        "stroke": "#78350f",
        "strokeWidth": 14
      },
      {
        "d": "M 255 120 C 285 75, 330 80, 355 100 C 335 125, 290 135, 255 120 Z",
        "fill": "#22c55e",
        "stroke": "#16a34a",
        "strokeWidth": 4
      },
      {
        "d": "M 255 120 C 290 100, 325 95, 355 100",
        "fill": "none",
        "stroke": "#15803d",
        "strokeWidth": 3
      },
      {
        "d": "M 235 160 C 120 140, 105 360, 250 420 C 395 360, 380 140, 265 160 C 255 168, 245 168, 235 160 Z",
        "fill": "#ef4444",
        "stroke": "#dc2626",
        "strokeWidth": 6
      },
      {
        "d": "M 165 210 C 150 250, 155 310, 175 350 C 168 310, 162 250, 175 210 Z",
        "fill": "#ffffff",
        "stroke": "none",
        "strokeWidth": 0
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
          "y": 160
        },
        "endPoint": {
          "x": 250,
          "y": 420
        },
        "d": "M 235 160 C 120 140, 105 360, 250 420",
        "arrows": [
          {
            "x": 178.5,
            "y": 173.6,
            "angle": 135.8
          },
          {
            "x": 148.8,
            "y": 225.6,
            "angle": 100.4
          },
          {
            "x": 149.0,
            "y": 296.8,
            "angle": 75.5
          },
          {
            "x": 181.7,
            "y": 368.0,
            "angle": 49.5
          }
        ],
        "samplePoints": [
          {
            "x": 235.0,
            "y": 160.0
          },
          {
            "x": 214.6,
            "y": 159.0
          },
          {
            "x": 196.7,
            "y": 163.0
          },
          {
            "x": 181.3,
            "y": 171.4
          },
          {
            "x": 168.4,
            "y": 183.8
          },
          {
            "x": 158.3,
            "y": 199.4
          },
          {
            "x": 151.0,
            "y": 217.7
          },
          {
            "x": 146.5,
            "y": 238.1
          },
          {
            "x": 145.0,
            "y": 260.0
          },
          {
            "x": 146.5,
            "y": 282.9
          },
          {
            "x": 151.2,
            "y": 306.1
          },
          {
            "x": 159.1,
            "y": 329.1
          },
          {
            "x": 170.3,
            "y": 351.2
          },
          {
            "x": 184.9,
            "y": 372.0
          },
          {
            "x": 203.0,
            "y": 390.8
          },
          {
            "x": 224.7,
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
          "y": 160
        },
        "d": "M 250 420 C 395 360, 380 140, 265 160",
        "arrows": [
          {
            "x": 318.3,
            "y": 368.0,
            "angle": -55.1
          },
          {
            "x": 351.0,
            "y": 296.8,
            "angle": -80.3
          },
          {
            "x": 351.2,
            "y": 225.6,
            "angle": -106.2
          },
          {
            "x": 321.5,
            "y": 173.6,
            "angle": -145.3
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 420.0
          },
          {
            "x": 275.3,
            "y": 407.0
          },
          {
            "x": 297.0,
            "y": 390.8
          },
          {
            "x": 315.1,
            "y": 372.0
          },
          {
            "x": 329.7,
            "y": 351.2
          },
          {
            "x": 340.9,
            "y": 329.1
          },
          {
            "x": 348.8,
            "y": 306.1
          },
          {
            "x": 353.5,
            "y": 282.9
          },
          {
            "x": 355.0,
            "y": 260.0
          },
          {
            "x": 353.5,
            "y": 238.1
          },
          {
            "x": 349.0,
            "y": 217.7
          },
          {
            "x": 341.7,
            "y": 199.4
          },
          {
            "x": 331.6,
            "y": 183.8
          },
          {
            "x": 318.7,
            "y": 171.4
          },
          {
            "x": 303.3,
            "y": 163.0
          },
          {
            "x": 285.4,
            "y": 159.0
          },
          {
            "x": 265.0,
            "y": 160.0
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
          "y": 160
        },
        "endPoint": {
          "x": 230,
          "y": 70
        },
        "d": "M 250 160 C 245 125, 230 100, 230 70",
        "arrows": [
          {
            "x": 244.8,
            "y": 135.4,
            "angle": -105.6
          },
          {
            "x": 238.1,
            "y": 113.1,
            "angle": -106.8
          },
          {
            "x": 232.4,
            "y": 91.8,
            "angle": -101.1
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 160.0
          },
          {
            "x": 248.2,
            "y": 149.8
          },
          {
            "x": 246.0,
            "y": 140.1
          },
          {
            "x": 243.5,
            "y": 130.8
          },
          {
            "x": 240.8,
            "y": 121.8
          },
          {
            "x": 238.1,
            "y": 113.1
          },
          {
            "x": 235.6,
            "y": 104.6
          },
          {
            "x": 233.4,
            "y": 96.1
          },
          {
            "x": 231.6,
            "y": 87.5
          },
          {
            "x": 230.4,
            "y": 78.9
          },
          {
            "x": 230.0,
            "y": 70.0
          }
        ]
      },
      {
        "id": "apel-4",
        "name": "Daun Apel",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 255,
          "y": 120
        },
        "endPoint": {
          "x": 355,
          "y": 100
        },
        "d": "M 255 120 C 290 80, 330 85, 355 100",
        "arrows": [
          {
            "x": 281.9,
            "y": 97.9,
            "angle": -26.7
          },
          {
            "x": 308.8,
            "y": 89.4,
            "angle": -4.4
          },
          {
            "x": 333.8,
            "y": 91.2,
            "angle": 15.5
          }
        ],
        "samplePoints": [
          {
            "x": 255.0,
            "y": 120.0
          },
          {
            "x": 263.8,
            "y": 110.9
          },
          {
            "x": 272.8,
            "y": 103.6
          },
          {
            "x": 281.9,
            "y": 97.9
          },
          {
            "x": 290.9,
            "y": 93.7
          },
          {
            "x": 299.9,
            "y": 90.9
          },
          {
            "x": 308.8,
            "y": 89.4
          },
          {
            "x": 317.4,
            "y": 89.0
          },
          {
            "x": 325.7,
            "y": 89.6
          },
          {
            "x": 333.8,
            "y": 91.2
          },
          {
            "x": 341.3,
            "y": 93.5
          },
          {
            "x": 348.4,
            "y": 96.5
          },
          {
            "x": 355.0,
            "y": 100.0
          }
        ]
      }
    ]
  },
  {
    "id": "bunga",
    "title": "Bunga (Kembang Sepatu)",
    "badgeText": "Bunga Sepatu 🌺",
    "emoji": "🌺",
    "category": "bunga",
    "audioWord": "Bunga Kembang Sepatu",
    "description": "Bunga kembang sepatu memiliki 5 kelopak ungu cantik, benang sari kuning menawan, dan daun hijau segar.",
    "color": "#c026d3",
    "fillColor": "#c026d3",
    "accentColor": "#facc15",
    "backgroundGuides": [
      "M 250 125 C 310 130, 340 165, 355 195",
      "M 355 195 C 370 260, 355 305, 320 330",
      "M 320 330 C 280 360, 220 360, 180 330",
      "M 180 330 C 145 305, 130 260, 145 195",
      "M 145 195 C 160 165, 190 130, 250 125",
      "M 245 245 C 265 210, 285 180, 300 145",
      "M 250 340 C 250 380, 250 410, 250 445"
    ],
    "completedSvgPaths": [
      {
        "d": "M 250 330 L 250 445",
        "fill": "none",
        "stroke": "#16a34a",
        "strokeWidth": 12
      },
      {
        "d": "M 245 375 C 205 370, 170 385, 155 415 C 185 425, 225 410, 245 390 Z",
        "fill": "#22c55e",
        "stroke": "#16a34a",
        "strokeWidth": 4
      },
      {
        "d": "M 255 375 C 295 370, 330 385, 345 415 C 315 425, 275 410, 255 390 Z",
        "fill": "#22c55e",
        "stroke": "#16a34a",
        "strokeWidth": 4
      },
      {
        "d": "M 230 235 C 210 170, 230 120, 250 120 C 270 120, 290 170, 270 235 Z",
        "fill": "#c026d3",
        "stroke": "#a21caf",
        "strokeWidth": 5
      },
      {
        "d": "M 260 225 C 310 185, 360 175, 365 200 C 370 225, 325 265, 265 245 Z",
        "fill": "#c026d3",
        "stroke": "#a21caf",
        "strokeWidth": 5
      },
      {
        "d": "M 260 255 C 320 280, 345 320, 330 340 C 315 360, 265 330, 245 265 Z",
        "fill": "#c026d3",
        "stroke": "#a21caf",
        "strokeWidth": 5
      },
      {
        "d": "M 240 265 C 220 330, 170 360, 155 340 C 140 320, 165 280, 225 255 Z",
        "fill": "#c026d3",
        "stroke": "#a21caf",
        "strokeWidth": 5
      },
      {
        "d": "M 235 245 C 175 265, 130 225, 135 200 C 140 175, 190 185, 240 225 Z",
        "fill": "#c026d3",
        "stroke": "#a21caf",
        "strokeWidth": 5
      },
      {
        "d": "M 250 225 C 265 225, 265 265, 250 265 C 235 265, 235 225, 250 225 Z",
        "fill": "#701a75",
        "stroke": "none",
        "strokeWidth": 0
      },
      {
        "d": "M 248 245 C 265 210, 285 180, 300 145",
        "fill": "none",
        "stroke": "#facc15",
        "strokeWidth": 8
      },
      {
        "d": "M 270 200 A 4 4 0 1 1 270 199",
        "fill": "#fde047",
        "stroke": "#ca8a04",
        "strokeWidth": 2
      },
      {
        "d": "M 285 175 A 4 4 0 1 1 285 174",
        "fill": "#fde047",
        "stroke": "#ca8a04",
        "strokeWidth": 2
      },
      {
        "d": "M 292 165 A 4 4 0 1 1 292 164",
        "fill": "#fde047",
        "stroke": "#ca8a04",
        "strokeWidth": 2
      },
      {
        "d": "M 302 142 A 5 5 0 1 1 302 141",
        "fill": "#ef4444",
        "stroke": "#b91c1c",
        "strokeWidth": 1.5
      }
    ],
    "segments": [
      {
        "id": "bunga-1",
        "name": "Kelopak 1 (Atas)",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 250,
          "y": 125
        },
        "endPoint": {
          "x": 355,
          "y": 195
        },
        "d": "M 250 125 C 310 130, 340 165, 355 195",
        "arrows": [
          {
            "x": 282.5,
            "y": 131.3,
            "angle": 19.1
          },
          {
            "x": 308.6,
            "y": 143.2,
            "angle": 32.7
          },
          {
            "x": 328.8,
            "y": 158.8,
            "angle": 45.2
          },
          {
            "x": 344.1,
            "y": 176.7,
            "angle": 55.7
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 125.0
          },
          {
            "x": 260.9,
            "y": 126.3
          },
          {
            "x": 271.1,
            "y": 128.2
          },
          {
            "x": 280.7,
            "y": 130.7
          },
          {
            "x": 289.6,
            "y": 133.8
          },
          {
            "x": 297.9,
            "y": 137.4
          },
          {
            "x": 305.6,
            "y": 141.4
          },
          {
            "x": 312.8,
            "y": 145.9
          },
          {
            "x": 319.4,
            "y": 150.6
          },
          {
            "x": 325.4,
            "y": 155.7
          },
          {
            "x": 331.0,
            "y": 161.0
          },
          {
            "x": 336.1,
            "y": 166.5
          },
          {
            "x": 340.7,
            "y": 172.1
          },
          {
            "x": 344.9,
            "y": 177.8
          },
          {
            "x": 348.6,
            "y": 183.6
          },
          {
            "x": 352.0,
            "y": 189.3
          },
          {
            "x": 355.0,
            "y": 195.0
          }
        ]
      },
      {
        "id": "bunga-2",
        "name": "Kelopak 2 (Kanan Atas)",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 355,
          "y": 195
        },
        "endPoint": {
          "x": 320,
          "y": 330
        },
        "d": "M 355 195 C 370 260, 355 305, 320 330",
        "arrows": [
          {
            "x": 360.5,
            "y": 231.6,
            "angle": 87.7
          },
          {
            "x": 359.2,
            "y": 263.4,
            "angle": 99.9
          },
          {
            "x": 351.8,
            "y": 290.4,
            "angle": 114.5
          },
          {
            "x": 338.5,
            "y": 312.6,
            "angle": 130.5
          }
        ],
        "samplePoints": [
          {
            "x": 355.0,
            "y": 195.0
          },
          {
            "x": 357.5,
            "y": 207.0
          },
          {
            "x": 359.2,
            "y": 218.4
          },
          {
            "x": 360.3,
            "y": 229.5
          },
          {
            "x": 360.8,
            "y": 240.0
          },
          {
            "x": 360.6,
            "y": 250.1
          },
          {
            "x": 359.7,
            "y": 259.7
          },
          {
            "x": 358.3,
            "y": 268.8
          },
          {
            "x": 356.2,
            "y": 277.5
          },
          {
            "x": 353.6,
            "y": 285.7
          },
          {
            "x": 350.4,
            "y": 293.4
          },
          {
            "x": 346.6,
            "y": 300.7
          },
          {
            "x": 342.3,
            "y": 307.5
          },
          {
            "x": 337.5,
            "y": 313.8
          },
          {
            "x": 332.2,
            "y": 319.7
          },
          {
            "x": 326.3,
            "y": 325.1
          },
          {
            "x": 320.0,
            "y": 330.0
          }
        ]
      },
      {
        "id": "bunga-3",
        "name": "Kelopak 3 (Kanan Bawah)",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 320,
          "y": 330
        },
        "endPoint": {
          "x": 180,
          "y": 330
        },
        "d": "M 320 330 C 280 360, 220 360, 180 330",
        "arrows": [
          {
            "x": 293.9,
            "y": 344.4,
            "angle": 160.3
          },
          {
            "x": 265.0,
            "y": 351.6,
            "angle": 174.5
          },
          {
            "x": 235.0,
            "y": 351.6,
            "angle": -171.7
          },
          {
            "x": 206.1,
            "y": 344.4,
            "angle": -157.3
          }
        ],
        "samplePoints": [
          {
            "x": 320.0,
            "y": 330.0
          },
          {
            "x": 312.3,
            "y": 335.3
          },
          {
            "x": 304.1,
            "y": 339.8
          },
          {
            "x": 295.7,
            "y": 343.7
          },
          {
            "x": 286.9,
            "y": 346.9
          },
          {
            "x": 277.9,
            "y": 349.3
          },
          {
            "x": 268.7,
            "y": 351.1
          },
          {
            "x": 259.4,
            "y": 352.1
          },
          {
            "x": 250.0,
            "y": 352.5
          },
          {
            "x": 240.6,
            "y": 352.1
          },
          {
            "x": 231.3,
            "y": 351.1
          },
          {
            "x": 222.1,
            "y": 349.3
          },
          {
            "x": 213.1,
            "y": 346.9
          },
          {
            "x": 204.3,
            "y": 343.7
          },
          {
            "x": 195.9,
            "y": 339.8
          },
          {
            "x": 187.7,
            "y": 335.3
          },
          {
            "x": 180.0,
            "y": 330.0
          }
        ]
      },
      {
        "id": "bunga-4",
        "name": "Kelopak 4 (Kiri Bawah)",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 180,
          "y": 330
        },
        "endPoint": {
          "x": 145,
          "y": 195
        },
        "d": "M 180 330 C 145 305, 130 260, 145 195",
        "arrows": [
          {
            "x": 161.5,
            "y": 312.6,
            "angle": -127.3
          },
          {
            "x": 148.2,
            "y": 290.4,
            "angle": -111.5
          },
          {
            "x": 140.8,
            "y": 263.4,
            "angle": -97.3
          },
          {
            "x": 139.5,
            "y": 231.6,
            "angle": -85.5
          }
        ],
        "samplePoints": [
          {
            "x": 180.0,
            "y": 330.0
          },
          {
            "x": 173.7,
            "y": 325.1
          },
          {
            "x": 167.8,
            "y": 319.7
          },
          {
            "x": 162.5,
            "y": 313.8
          },
          {
            "x": 157.7,
            "y": 307.5
          },
          {
            "x": 153.4,
            "y": 300.7
          },
          {
            "x": 149.6,
            "y": 293.4
          },
          {
            "x": 146.4,
            "y": 285.7
          },
          {
            "x": 143.8,
            "y": 277.5
          },
          {
            "x": 141.7,
            "y": 268.8
          },
          {
            "x": 140.3,
            "y": 259.7
          },
          {
            "x": 139.4,
            "y": 250.1
          },
          {
            "x": 139.2,
            "y": 240.0
          },
          {
            "x": 139.7,
            "y": 229.5
          },
          {
            "x": 140.8,
            "y": 218.4
          },
          {
            "x": 142.5,
            "y": 207.0
          },
          {
            "x": 145.0,
            "y": 195.0
          }
        ]
      },
      {
        "id": "bunga-5",
        "name": "Kelopak 5 (Kiri Atas)",
        "startWaypoint": 5,
        "endWaypoint": 6,
        "startPoint": {
          "x": 145,
          "y": 195
        },
        "endPoint": {
          "x": 250,
          "y": 125
        },
        "d": "M 145 195 C 160 165, 190 130, 250 125",
        "arrows": [
          {
            "x": 155.9,
            "y": 176.7,
            "angle": -53.8
          },
          {
            "x": 171.2,
            "y": 158.8,
            "angle": -42.8
          },
          {
            "x": 191.4,
            "y": 143.2,
            "angle": -30.0
          },
          {
            "x": 217.5,
            "y": 131.3,
            "angle": -16.4
          }
        ],
        "samplePoints": [
          {
            "x": 145.0,
            "y": 195.0
          },
          {
            "x": 148.0,
            "y": 189.3
          },
          {
            "x": 151.4,
            "y": 183.6
          },
          {
            "x": 155.1,
            "y": 177.8
          },
          {
            "x": 159.3,
            "y": 172.1
          },
          {
            "x": 163.9,
            "y": 166.5
          },
          {
            "x": 169.0,
            "y": 161.0
          },
          {
            "x": 174.6,
            "y": 155.7
          },
          {
            "x": 180.6,
            "y": 150.6
          },
          {
            "x": 187.2,
            "y": 145.9
          },
          {
            "x": 194.4,
            "y": 141.4
          },
          {
            "x": 202.1,
            "y": 137.4
          },
          {
            "x": 210.4,
            "y": 133.8
          },
          {
            "x": 219.3,
            "y": 130.7
          },
          {
            "x": 228.9,
            "y": 128.2
          },
          {
            "x": 239.1,
            "y": 126.3
          },
          {
            "x": 250.0,
            "y": 125.0
          }
        ]
      },
      {
        "id": "bunga-6",
        "name": "Benang Sari Kembang Sepatu",
        "startWaypoint": 6,
        "endWaypoint": 7,
        "startPoint": {
          "x": 245,
          "y": 245
        },
        "endPoint": {
          "x": 300,
          "y": 145
        },
        "d": "M 245 245 C 265 210, 285 180, 300 145",
        "arrows": [
          {
            "x": 259.9,
            "y": 219.5,
            "angle": -59.3
          },
          {
            "x": 274.4,
            "y": 195.0,
            "angle": -60.2
          },
          {
            "x": 287.9,
            "y": 170.5,
            "angle": -62.9
          }
        ],
        "samplePoints": [
          {
            "x": 245.0,
            "y": 245.0
          },
          {
            "x": 251.0,
            "y": 234.6
          },
          {
            "x": 257.0,
            "y": 224.5
          },
          {
            "x": 262.9,
            "y": 214.6
          },
          {
            "x": 268.7,
            "y": 204.8
          },
          {
            "x": 274.4,
            "y": 195.0
          },
          {
            "x": 279.9,
            "y": 185.2
          },
          {
            "x": 285.3,
            "y": 175.4
          },
          {
            "x": 290.4,
            "y": 165.5
          },
          {
            "x": 295.4,
            "y": 155.4
          },
          {
            "x": 300.0,
            "y": 145.0
          }
        ]
      },
      {
        "id": "bunga-7",
        "name": "Tangkai & Daun Bawah",
        "startWaypoint": 7,
        "endWaypoint": 8,
        "startPoint": {
          "x": 250,
          "y": 340
        },
        "endPoint": {
          "x": 250,
          "y": 445
        },
        "d": "M 250 340 C 250 380, 250 410, 250 445",
        "arrows": [
          {
            "x": 250.0,
            "y": 368.4,
            "angle": 90.0
          },
          {
            "x": 250.0,
            "y": 394.4,
            "angle": 90.0
          },
          {
            "x": 250.0,
            "y": 419.5,
            "angle": 90.0
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 340.0
          },
          {
            "x": 250.0,
            "y": 351.7
          },
          {
            "x": 250.0,
            "y": 362.9
          },
          {
            "x": 250.0,
            "y": 373.7
          },
          {
            "x": 250.0,
            "y": 384.2
          },
          {
            "x": 250.0,
            "y": 394.4
          },
          {
            "x": 250.0,
            "y": 404.4
          },
          {
            "x": 250.0,
            "y": 414.4
          },
          {
            "x": 250.0,
            "y": 424.5
          },
          {
            "x": 250.0,
            "y": 434.6
          },
          {
            "x": 250.0,
            "y": 445.0
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
      "M 205 420 C 230 310, 260 200, 290 90",
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
        "d": "M 205 420 C 230 310, 260 200, 290 90",
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
          "x": 205,
          "y": 420
        },
        "endPoint": {
          "x": 290,
          "y": 90
        },
        "d": "M 205 420 C 230 310, 260 200, 290 90",
        "arrows": [
          {
            "x": 220.6,
            "y": 354.0,
            "angle": -76.2
          },
          {
            "x": 237.1,
            "y": 288.0,
            "angle": -75.6
          },
          {
            "x": 254.3,
            "y": 222.0,
            "angle": -75.1
          },
          {
            "x": 272.0,
            "y": 156.0,
            "angle": -74.8
          }
        ],
        "samplePoints": [
          {
            "x": 205.0,
            "y": 420.0
          },
          {
            "x": 209.7,
            "y": 399.4
          },
          {
            "x": 214.6,
            "y": 378.8
          },
          {
            "x": 219.6,
            "y": 358.1
          },
          {
            "x": 224.6,
            "y": 337.5
          },
          {
            "x": 229.7,
            "y": 316.9
          },
          {
            "x": 235.0,
            "y": 296.2
          },
          {
            "x": 240.3,
            "y": 275.6
          },
          {
            "x": 245.6,
            "y": 255.0
          },
          {
            "x": 251.0,
            "y": 234.4
          },
          {
            "x": 256.5,
            "y": 213.8
          },
          {
            "x": 262.0,
            "y": 193.1
          },
          {
            "x": 267.6,
            "y": 172.5
          },
          {
            "x": 273.2,
            "y": 151.9
          },
          {
            "x": 278.8,
            "y": 131.2
          },
          {
            "x": 284.4,
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
