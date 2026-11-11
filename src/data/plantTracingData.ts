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
  backgroundDecorations?: CompletedSvgPath[];
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
    "description": "Buah apel yang ranum, bulat, dan manis melindungi biji di dalamnya dengan daging buah segar.",
    "color": "#ef4444",
    "fillColor": "#ef4444",
    "accentColor": "#22c55e",
    "backgroundGuides": [
      "M 220 190 C 95 180, 105 385, 250 415",
      "M 250 415 C 395 385, 405 180, 280 190",
      "M 250 185 C 245 145, 235 120, 230 95",
      "M 255 145 C 295 105, 335 110, 355 130"
    ],
    "completedSvgPaths": [
      {
        "d": "M 250 185 C 245 145, 235 120, 230 95",
        "fill": "none",
        "stroke": "#78350f",
        "strokeWidth": 14
      },
      {
        "d": "M 255 145 C 290 100, 335 105, 355 130 C 330 155, 290 160, 255 145 Z",
        "fill": "#22c55e",
        "stroke": "#16a34a",
        "strokeWidth": 4
      },
      {
        "d": "M 255 145 C 295 125, 330 125, 355 130",
        "fill": "none",
        "stroke": "#15803d",
        "strokeWidth": 3
      },
      {
        "d": "M 220 190 C 95 180, 105 385, 250 415 C 395 385, 405 180, 280 190 C 265 198, 235 198, 220 190 Z",
        "fill": "#ef4444",
        "stroke": "#dc2626",
        "strokeWidth": 6
      },
      {
        "d": "M 155 230 C 135 270, 140 330, 165 365 C 158 330, 150 270, 168 230 Z",
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
          "x": 220,
          "y": 190
        },
        "endPoint": {
          "x": 250,
          "y": 415
        },
        "d": "M 220 190 C 95 180, 105 385, 250 415",
        "arrows": [
          {
            "x": 161.2,
            "y": 206.7,
            "angle": 135.0
          },
          {
            "x": 134.8,
            "y": 256.2,
            "angle": 96.5
          },
          {
            "x": 140.8,
            "y": 320.0,
            "angle": 68.3
          },
          {
            "x": 179.2,
            "y": 379.1,
            "angle": 39.8
          }
        ],
        "samplePoints": [
          {
            "x": 220.0,
            "y": 190.0
          },
          {
            "x": 198.1,
            "y": 190.5
          },
          {
            "x": 179.5,
            "y": 195.6
          },
          {
            "x": 163.9,
            "y": 204.5
          },
          {
            "x": 151.6,
            "y": 216.7
          },
          {
            "x": 142.4,
            "y": 231.7
          },
          {
            "x": 136.3,
            "y": 248.9
          },
          {
            "x": 133.5,
            "y": 267.7
          },
          {
            "x": 133.8,
            "y": 287.5
          },
          {
            "x": 137.2,
            "y": 307.8
          },
          {
            "x": 143.8,
            "y": 328.0
          },
          {
            "x": 153.6,
            "y": 347.5
          },
          {
            "x": 166.6,
            "y": 365.8
          },
          {
            "x": 182.7,
            "y": 382.2
          },
          {
            "x": 202.0,
            "y": 396.3
          },
          {
            "x": 224.4,
            "y": 407.4
          },
          {
            "x": 250.0,
            "y": 415.0
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
          "y": 415
        },
        "endPoint": {
          "x": 280,
          "y": 190
        },
        "d": "M 250 415 C 395 385, 405 180, 280 190",
        "arrows": [
          {
            "x": 320.8,
            "y": 379.1,
            "angle": -45.8
          },
          {
            "x": 359.2,
            "y": 320.0,
            "angle": -73.7
          },
          {
            "x": 365.2,
            "y": 256.2,
            "angle": -103.0
          },
          {
            "x": 338.8,
            "y": 206.7,
            "angle": -144.4
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 415.0
          },
          {
            "x": 275.6,
            "y": 407.4
          },
          {
            "x": 298.0,
            "y": 396.3
          },
          {
            "x": 317.3,
            "y": 382.2
          },
          {
            "x": 333.4,
            "y": 365.8
          },
          {
            "x": 346.4,
            "y": 347.5
          },
          {
            "x": 356.2,
            "y": 328.0
          },
          {
            "x": 362.8,
            "y": 307.8
          },
          {
            "x": 366.2,
            "y": 287.5
          },
          {
            "x": 366.5,
            "y": 267.7
          },
          {
            "x": 363.7,
            "y": 248.9
          },
          {
            "x": 357.6,
            "y": 231.7
          },
          {
            "x": 348.4,
            "y": 216.7
          },
          {
            "x": 336.1,
            "y": 204.5
          },
          {
            "x": 320.5,
            "y": 195.6
          },
          {
            "x": 301.9,
            "y": 190.5
          },
          {
            "x": 280.0,
            "y": 190.0
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
          "y": 185
        },
        "endPoint": {
          "x": 230,
          "y": 95
        },
        "d": "M 250 185 C 245 145, 235 120, 230 95",
        "arrows": [
          {
            "x": 245.5,
            "y": 157.6,
            "angle": -101.9
          },
          {
            "x": 240.0,
            "y": 134.4,
            "angle": -104.8
          },
          {
            "x": 234.5,
            "y": 114.0,
            "angle": -104.7
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 185.0
          },
          {
            "x": 248.4,
            "y": 173.4
          },
          {
            "x": 246.5,
            "y": 162.7
          },
          {
            "x": 244.4,
            "y": 152.6
          },
          {
            "x": 242.2,
            "y": 143.2
          },
          {
            "x": 240.0,
            "y": 134.4
          },
          {
            "x": 237.8,
            "y": 126.0
          },
          {
            "x": 235.6,
            "y": 117.9
          },
          {
            "x": 233.5,
            "y": 110.1
          },
          {
            "x": 231.6,
            "y": 102.5
          },
          {
            "x": 230.0,
            "y": 95.0
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
          "y": 145
        },
        "endPoint": {
          "x": 355,
          "y": 130
        },
        "d": "M 255 145 C 295 105, 335 110, 355 130",
        "arrows": [
          {
            "x": 284.7,
            "y": 123.0,
            "angle": -24.9
          },
          {
            "x": 312.5,
            "y": 115.0,
            "angle": -2.2
          },
          {
            "x": 336.6,
            "y": 118.3,
            "angle": 22.2
          }
        ],
        "samplePoints": [
          {
            "x": 255.0,
            "y": 145.0
          },
          {
            "x": 265.0,
            "y": 135.9
          },
          {
            "x": 274.9,
            "y": 128.6
          },
          {
            "x": 284.7,
            "y": 123.0
          },
          {
            "x": 294.3,
            "y": 118.9
          },
          {
            "x": 303.6,
            "y": 116.3
          },
          {
            "x": 312.5,
            "y": 115.0
          },
          {
            "x": 321.0,
            "y": 115.0
          },
          {
            "x": 329.1,
            "y": 116.1
          },
          {
            "x": 336.6,
            "y": 118.3
          },
          {
            "x": 343.4,
            "y": 121.4
          },
          {
            "x": 349.6,
            "y": 125.3
          },
          {
            "x": 355.0,
            "y": 130.0
          }
        ]
      }
    ]
  },
  {
    "id": "bunga",
    "title": "Bunga (6 Kelopak)",
    "badgeText": "Bunga 6 Kelopak \ud83c\udf38",
    "emoji": "\ud83c\udf38",
    "category": "bunga",
    "audioWord": "Bunga Enam Kelopak",
    "description": "Bunga kartun 6 kelopak yang mekar indah dengan wajah tersenyum ceria di tengahnya.",
    "color": "#ec4899",
    "fillColor": "#ec4899",
    "accentColor": "#facc15",
    "backgroundGuides": [
      "M 215.0 134.4 C 191.2 33.4, 308.8 33.4, 285.0 134.4",
      "M 285.0 134.4 C 360.6 63.2, 419.4 165.1, 320.0 195.0",
      "M 320.0 195.0 C 419.4 224.9, 360.6 326.8, 285.0 255.6",
      "M 285.0 255.6 C 308.8 356.6, 191.2 356.6, 215.0 255.6",
      "M 215.0 255.6 C 139.4 326.8, 80.6 224.9, 180.0 195.0",
      "M 180.0 195.0 C 80.6 165.1, 139.4 63.2, 215.0 134.4"
    ],
    "backgroundDecorations": [
      {
        "d": "M 244 260 L 244 445 C 244 450, 256 450, 256 260 Z",
        "fill": "#16a34a",
        "stroke": "#14532d",
        "strokeWidth": 3.5
      },
      {
        "d": "M 244 435 C 195 445, 140 435, 150 410 C 160 380, 205 375, 244 380 Z",
        "fill": "#22c55e",
        "stroke": "#14532d",
        "strokeWidth": 3.5
      },
      {
        "d": "M 244 408 Q 195 400, 150 410",
        "fill": "none",
        "stroke": "#14532d",
        "strokeWidth": 2.5
      },
      {
        "d": "M 215 405 Q 195 395, 185 390",
        "fill": "none",
        "stroke": "#14532d",
        "strokeWidth": 2
      },
      {
        "d": "M 225 409 Q 205 422, 195 428",
        "fill": "none",
        "stroke": "#14532d",
        "strokeWidth": 2
      },
      {
        "d": "M 256 435 C 305 445, 360 435, 350 410 C 340 380, 295 375, 256 380 Z",
        "fill": "#22c55e",
        "stroke": "#14532d",
        "strokeWidth": 3.5
      },
      {
        "d": "M 256 408 Q 305 400, 350 410",
        "fill": "none",
        "stroke": "#14532d",
        "strokeWidth": 2.5
      },
      {
        "d": "M 285 405 Q 305 395, 315 390",
        "fill": "none",
        "stroke": "#14532d",
        "strokeWidth": 2
      },
      {
        "d": "M 275 409 Q 295 422, 305 428",
        "fill": "none",
        "stroke": "#14532d",
        "strokeWidth": 2
      },
      {
        "d": "M 250 145 A 50 50 0 1 0 250.1 145 Z",
        "fill": "#fef08a",
        "stroke": "#1e293b",
        "strokeWidth": 4.5
      },
      {
        "d": "M 224 175 Q 232 170 240 175",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2.5
      },
      {
        "d": "M 260 175 Q 268 170 276 175",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2.5
      },
      {
        "d": "M 232 180 A 6 8.5 0 1 0 232.1 180 Z",
        "fill": "#1e293b"
      },
      {
        "d": "M 230 183 A 2.2 2.2 0 1 0 230.1 183 Z",
        "fill": "#ffffff"
      },
      {
        "d": "M 234 188 A 1.2 1.2 0 1 0 234.1 188 Z",
        "fill": "#ffffff"
      },
      {
        "d": "M 226 182 L 222 179",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2
      },
      {
        "d": "M 228 178 L 226 174",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2
      },
      {
        "d": "M 233 176 L 233 172",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2
      },
      {
        "d": "M 268 180 A 6 8.5 0 1 0 268.1 180 Z",
        "fill": "#1e293b"
      },
      {
        "d": "M 266 183 A 2.2 2.2 0 1 0 266.1 183 Z",
        "fill": "#ffffff"
      },
      {
        "d": "M 270 188 A 1.2 1.2 0 1 0 270.1 188 Z",
        "fill": "#ffffff"
      },
      {
        "d": "M 274 182 L 278 179",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2
      },
      {
        "d": "M 272 178 L 274 174",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2
      },
      {
        "d": "M 267 176 L 267 172",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 2
      },
      {
        "d": "M 222 197 A 5.5 3 0 1 0 222.1 197 Z",
        "fill": "#f472b6"
      },
      {
        "d": "M 278 197 A 5.5 3 0 1 0 278.1 197 Z",
        "fill": "#f472b6"
      },
      {
        "d": "M 241 202 Q 250 215 259 202",
        "fill": "none",
        "stroke": "#1e293b",
        "strokeWidth": 3.5
      }
    ],
    "completedSvgPaths": [
      {
        "d": "M 215.0 134.4 C 191.2 33.4, 308.8 33.4, 285.0 134.4 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 4
      },
      {
        "d": "M 285.0 134.4 C 360.6 63.2, 419.4 165.1, 320.0 195.0 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 4
      },
      {
        "d": "M 320.0 195.0 C 419.4 224.9, 360.6 326.8, 285.0 255.6 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 4
      },
      {
        "d": "M 285.0 255.6 C 308.8 356.6, 191.2 356.6, 215.0 255.6 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 4
      },
      {
        "d": "M 215.0 255.6 C 139.4 326.8, 80.6 224.9, 180.0 195.0 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 4
      },
      {
        "d": "M 180.0 195.0 C 80.6 165.1, 139.4 63.2, 215.0 134.4 Z",
        "fill": "#f472b6",
        "stroke": "#db2777",
        "strokeWidth": 4
      },
      {
        "d": "M 250 80 L 250 105",
        "fill": "none",
        "stroke": "#be185d",
        "strokeWidth": 3
      },
      {
        "d": "M 335 140 L 315 155",
        "fill": "none",
        "stroke": "#be185d",
        "strokeWidth": 3
      },
      {
        "d": "M 335 250 L 315 235",
        "fill": "none",
        "stroke": "#be185d",
        "strokeWidth": 3
      },
      {
        "d": "M 250 310 L 250 285",
        "fill": "none",
        "stroke": "#be185d",
        "strokeWidth": 3
      },
      {
        "d": "M 165 250 L 185 235",
        "fill": "none",
        "stroke": "#be185d",
        "strokeWidth": 3
      },
      {
        "d": "M 165 140 L 185 155",
        "fill": "none",
        "stroke": "#be185d",
        "strokeWidth": 3
      }
    ],
    "segments": [
      {
        "id": "bunga-1",
        "name": "Kelopak Atas",
        "startWaypoint": 1,
        "endWaypoint": 2,
        "startPoint": {
          "x": 215.0,
          "y": 134.4
        },
        "endPoint": {
          "x": 285.0,
          "y": 134.4
        },
        "d": "M 215.0 134.4 C 191.2 33.4, 308.8 33.4, 285.0 134.4",
        "arrows": [
          {
            "x": 219.2,
            "y": 77.6,
            "angle": -59.9
          },
          {
            "x": 250.0,
            "y": 58.6,
            "angle": 0.0
          },
          {
            "x": 280.8,
            "y": 77.6,
            "angle": 59.9
          }
        ],
        "samplePoints": [
          {
            "x": 215.0,
            "y": 134.4
          },
          {
            "x": 212.1,
            "y": 116.6
          },
          {
            "x": 212.1,
            "y": 101.2
          },
          {
            "x": 214.7,
            "y": 88.2
          },
          {
            "x": 219.2,
            "y": 77.6
          },
          {
            "x": 225.5,
            "y": 69.3
          },
          {
            "x": 233.0,
            "y": 63.4
          },
          {
            "x": 241.3,
            "y": 59.8
          },
          {
            "x": 250.0,
            "y": 58.6
          },
          {
            "x": 258.7,
            "y": 59.8
          },
          {
            "x": 267.0,
            "y": 63.4
          },
          {
            "x": 274.5,
            "y": 69.3
          },
          {
            "x": 280.8,
            "y": 77.6
          },
          {
            "x": 285.3,
            "y": 88.2
          },
          {
            "x": 287.9,
            "y": 101.2
          },
          {
            "x": 287.9,
            "y": 116.6
          },
          {
            "x": 285.0,
            "y": 134.4
          }
        ]
      },
      {
        "id": "bunga-2",
        "name": "Kelopak Kanan Atas",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 285.0,
          "y": 134.4
        },
        "endPoint": {
          "x": 320.0,
          "y": 195.0
        },
        "d": "M 285.0 134.4 C 360.6 63.2, 419.4 165.1, 320.0 195.0",
        "arrows": [
          {
            "x": 336.3,
            "y": 109.6,
            "angle": 0.1
          },
          {
            "x": 368.1,
            "y": 126.8,
            "angle": 60.0
          },
          {
            "x": 367.1,
            "y": 162.9,
            "angle": 119.9
          }
        ],
        "samplePoints": [
          {
            "x": 285.0,
            "y": 134.4
          },
          {
            "x": 298.9,
            "y": 123.0
          },
          {
            "x": 312.3,
            "y": 115.3
          },
          {
            "x": 324.8,
            "y": 111.0
          },
          {
            "x": 336.3,
            "y": 109.6
          },
          {
            "x": 346.6,
            "y": 110.9
          },
          {
            "x": 355.5,
            "y": 114.4
          },
          {
            "x": 362.7,
            "y": 119.8
          },
          {
            "x": 368.1,
            "y": 126.8
          },
          {
            "x": 371.4,
            "y": 135.0
          },
          {
            "x": 372.5,
            "y": 143.9
          },
          {
            "x": 371.1,
            "y": 153.4
          },
          {
            "x": 367.1,
            "y": 162.9
          },
          {
            "x": 360.2,
            "y": 172.2
          },
          {
            "x": 350.1,
            "y": 180.9
          },
          {
            "x": 336.8,
            "y": 188.6
          },
          {
            "x": 320.0,
            "y": 195.0
          }
        ]
      },
      {
        "id": "bunga-3",
        "name": "Kelopak Kanan Bawah",
        "startWaypoint": 3,
        "endWaypoint": 4,
        "startPoint": {
          "x": 320.0,
          "y": 195.0
        },
        "endPoint": {
          "x": 285.0,
          "y": 255.6
        },
        "d": "M 320.0 195.0 C 419.4 224.9, 360.6 326.8, 285.0 255.6",
        "arrows": [
          {
            "x": 367.1,
            "y": 227.1,
            "angle": 60.1
          },
          {
            "x": 368.1,
            "y": 263.2,
            "angle": 120.0
          },
          {
            "x": 336.3,
            "y": 280.4,
            "angle": 179.9
          }
        ],
        "samplePoints": [
          {
            "x": 320.0,
            "y": 195.0
          },
          {
            "x": 336.8,
            "y": 201.4
          },
          {
            "x": 350.1,
            "y": 209.1
          },
          {
            "x": 360.2,
            "y": 217.8
          },
          {
            "x": 367.1,
            "y": 227.1
          },
          {
            "x": 371.1,
            "y": 236.6
          },
          {
            "x": 372.5,
            "y": 246.1
          },
          {
            "x": 371.4,
            "y": 255.0
          },
          {
            "x": 368.1,
            "y": 263.2
          },
          {
            "x": 362.7,
            "y": 270.2
          },
          {
            "x": 355.5,
            "y": 275.6
          },
          {
            "x": 346.6,
            "y": 279.1
          },
          {
            "x": 336.3,
            "y": 280.4
          },
          {
            "x": 324.8,
            "y": 279.0
          },
          {
            "x": 312.3,
            "y": 274.7
          },
          {
            "x": 298.9,
            "y": 267.0
          },
          {
            "x": 285.0,
            "y": 255.6
          }
        ]
      },
      {
        "id": "bunga-4",
        "name": "Kelopak Bawah",
        "startWaypoint": 4,
        "endWaypoint": 5,
        "startPoint": {
          "x": 285.0,
          "y": 255.6
        },
        "endPoint": {
          "x": 215.0,
          "y": 255.6
        },
        "d": "M 285.0 255.6 C 308.8 356.6, 191.2 356.6, 215.0 255.6",
        "arrows": [
          {
            "x": 280.8,
            "y": 312.4,
            "angle": 120.1
          },
          {
            "x": 250.0,
            "y": 331.4,
            "angle": 180.0
          },
          {
            "x": 219.2,
            "y": 312.4,
            "angle": -120.1
          }
        ],
        "samplePoints": [
          {
            "x": 285.0,
            "y": 255.6
          },
          {
            "x": 287.9,
            "y": 273.4
          },
          {
            "x": 287.9,
            "y": 288.8
          },
          {
            "x": 285.3,
            "y": 301.8
          },
          {
            "x": 280.8,
            "y": 312.4
          },
          {
            "x": 274.5,
            "y": 320.7
          },
          {
            "x": 267.0,
            "y": 326.6
          },
          {
            "x": 258.7,
            "y": 330.2
          },
          {
            "x": 250.0,
            "y": 331.4
          },
          {
            "x": 241.3,
            "y": 330.2
          },
          {
            "x": 233.0,
            "y": 326.6
          },
          {
            "x": 225.5,
            "y": 320.7
          },
          {
            "x": 219.2,
            "y": 312.4
          },
          {
            "x": 214.7,
            "y": 301.8
          },
          {
            "x": 212.1,
            "y": 288.8
          },
          {
            "x": 212.1,
            "y": 273.4
          },
          {
            "x": 215.0,
            "y": 255.6
          }
        ]
      },
      {
        "id": "bunga-5",
        "name": "Kelopak Kiri Bawah",
        "startWaypoint": 5,
        "endWaypoint": 6,
        "startPoint": {
          "x": 215.0,
          "y": 255.6
        },
        "endPoint": {
          "x": 180.0,
          "y": 195.0
        },
        "d": "M 215.0 255.6 C 139.4 326.8, 80.6 224.9, 180.0 195.0",
        "arrows": [
          {
            "x": 163.7,
            "y": 280.4,
            "angle": -179.9
          },
          {
            "x": 131.9,
            "y": 263.2,
            "angle": -120.0
          },
          {
            "x": 132.9,
            "y": 227.1,
            "angle": -60.1
          }
        ],
        "samplePoints": [
          {
            "x": 215.0,
            "y": 255.6
          },
          {
            "x": 201.1,
            "y": 267.0
          },
          {
            "x": 187.7,
            "y": 274.7
          },
          {
            "x": 175.2,
            "y": 279.0
          },
          {
            "x": 163.7,
            "y": 280.4
          },
          {
            "x": 153.4,
            "y": 279.1
          },
          {
            "x": 144.5,
            "y": 275.6
          },
          {
            "x": 137.3,
            "y": 270.2
          },
          {
            "x": 131.9,
            "y": 263.2
          },
          {
            "x": 128.6,
            "y": 255.0
          },
          {
            "x": 127.5,
            "y": 246.1
          },
          {
            "x": 128.9,
            "y": 236.6
          },
          {
            "x": 132.9,
            "y": 227.1
          },
          {
            "x": 139.8,
            "y": 217.8
          },
          {
            "x": 149.9,
            "y": 209.1
          },
          {
            "x": 163.2,
            "y": 201.4
          },
          {
            "x": 180.0,
            "y": 195.0
          }
        ]
      },
      {
        "id": "bunga-6",
        "name": "Kelopak Kiri Atas",
        "startWaypoint": 6,
        "endWaypoint": 1,
        "startPoint": {
          "x": 180.0,
          "y": 195.0
        },
        "endPoint": {
          "x": 215.0,
          "y": 134.4
        },
        "d": "M 180.0 195.0 C 80.6 165.1, 139.4 63.2, 215.0 134.4",
        "arrows": [
          {
            "x": 132.9,
            "y": 162.9,
            "angle": -119.9
          },
          {
            "x": 131.9,
            "y": 126.8,
            "angle": -60.0
          },
          {
            "x": 163.7,
            "y": 109.6,
            "angle": -0.1
          }
        ],
        "samplePoints": [
          {
            "x": 180.0,
            "y": 195.0
          },
          {
            "x": 163.2,
            "y": 188.6
          },
          {
            "x": 149.9,
            "y": 180.9
          },
          {
            "x": 139.8,
            "y": 172.2
          },
          {
            "x": 132.9,
            "y": 162.9
          },
          {
            "x": 128.9,
            "y": 153.4
          },
          {
            "x": 127.5,
            "y": 143.9
          },
          {
            "x": 128.6,
            "y": 135.0
          },
          {
            "x": 131.9,
            "y": 126.8
          },
          {
            "x": 137.3,
            "y": 119.8
          },
          {
            "x": 144.5,
            "y": 114.4
          },
          {
            "x": 153.4,
            "y": 110.9
          },
          {
            "x": 163.7,
            "y": 109.6
          },
          {
            "x": 175.2,
            "y": 111.0
          },
          {
            "x": 187.7,
            "y": 115.3
          },
          {
            "x": 201.1,
            "y": 123.0
          },
          {
            "x": 215.0,
            "y": 134.4
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
      "M 215 420 C 120 310, 130 180, 250 100",
      "M 250 100 C 370 180, 380 310, 285 420",
      "M 250 420 L 250 105",
      "M 250 330 L 175 285",
      "M 250 270 L 160 230",
      "M 250 270 L 340 210",
      "M 250 210 L 325 160"
    ],
    "backgroundDecorations": [
      {
        "d": "M 250 420 L 250 105",
        "fill": "none",
        "stroke": "#a7f3d0",
        "strokeWidth": 5
      },
      {
        "d": "M 250 330 L 175 285",
        "fill": "none",
        "stroke": "#a7f3d0",
        "strokeWidth": 3.5
      },
      {
        "d": "M 250 270 L 160 230",
        "fill": "none",
        "stroke": "#a7f3d0",
        "strokeWidth": 3.5
      },
      {
        "d": "M 250 270 L 340 210",
        "fill": "none",
        "stroke": "#a7f3d0",
        "strokeWidth": 3.5
      },
      {
        "d": "M 250 210 L 325 160",
        "fill": "none",
        "stroke": "#a7f3d0",
        "strokeWidth": 3.5
      }
    ],
    "completedSvgPaths": [
      {
        "d": "M 215 420 C 120 310, 130 180, 250 100 C 370 180, 380 310, 285 420 Z",
        "fill": "#10b981",
        "stroke": "#059669",
        "strokeWidth": 6
      },
      {
        "d": "M 250 420 L 250 105",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 8
      },
      {
        "d": "M 250 330 L 175 285",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 5
      },
      {
        "d": "M 250 270 L 160 230",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 5
      },
      {
        "d": "M 250 270 L 340 210",
        "fill": "none",
        "stroke": "#047857",
        "strokeWidth": 5
      },
      {
        "d": "M 250 210 L 325 160",
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
          "x": 215,
          "y": 420
        },
        "endPoint": {
          "x": 250,
          "y": 100
        },
        "d": "M 215 420 C 120 310, 130 180, 250 100",
        "arrows": [
          {
            "x": 170.6,
            "y": 352.2,
            "angle": -112.8
          },
          {
            "x": 151.7,
            "y": 282.9,
            "angle": -93.0
          },
          {
            "x": 158.5,
            "y": 215.5,
            "angle": -71.0
          },
          {
            "x": 191.2,
            "y": 153.4,
            "angle": -49.9
          }
        ],
        "samplePoints": [
          {
            "x": 215.0,
            "y": 420.0
          },
          {
            "x": 198.4,
            "y": 399.2
          },
          {
            "x": 184.3,
            "y": 377.9
          },
          {
            "x": 172.7,
            "y": 356.5
          },
          {
            "x": 163.5,
            "y": 334.8
          },
          {
            "x": 156.9,
            "y": 313.2
          },
          {
            "x": 152.7,
            "y": 291.5
          },
          {
            "x": 151.0,
            "y": 270.0
          },
          {
            "x": 151.9,
            "y": 248.8
          },
          {
            "x": 155.2,
            "y": 227.8
          },
          {
            "x": 161.1,
            "y": 207.4
          },
          {
            "x": 169.6,
            "y": 187.5
          },
          {
            "x": 180.5,
            "y": 168.3
          },
          {
            "x": 194.1,
            "y": 149.8
          },
          {
            "x": 210.1,
            "y": 132.2
          },
          {
            "x": 228.8,
            "y": 115.6
          },
          {
            "x": 250.0,
            "y": 100.0
          }
        ]
      },
      {
        "id": "daun-2",
        "name": "Lengkung Kanan Daun",
        "startWaypoint": 2,
        "endWaypoint": 3,
        "startPoint": {
          "x": 250,
          "y": 100
        },
        "endPoint": {
          "x": 285,
          "y": 420
        },
        "d": "M 250 100 C 370 180, 380 310, 285 420",
        "arrows": [
          {
            "x": 308.8,
            "y": 153.4,
            "angle": 53.9
          },
          {
            "x": 341.5,
            "y": 215.5,
            "angle": 75.4
          },
          {
            "x": 348.3,
            "y": 282.9,
            "angle": 97.2
          },
          {
            "x": 329.4,
            "y": 352.2,
            "angle": 116.4
          }
        ],
        "samplePoints": [
          {
            "x": 250.0,
            "y": 100.0
          },
          {
            "x": 271.2,
            "y": 115.6
          },
          {
            "x": 289.9,
            "y": 132.2
          },
          {
            "x": 305.9,
            "y": 149.8
          },
          {
            "x": 319.5,
            "y": 168.3
          },
          {
            "x": 330.4,
            "y": 187.5
          },
          {
            "x": 338.9,
            "y": 207.4
          },
          {
            "x": 344.8,
            "y": 227.8
          },
          {
            "x": 348.1,
            "y": 248.8
          },
          {
            "x": 349.0,
            "y": 270.0
          },
          {
            "x": 347.3,
            "y": 291.5
          },
          {
            "x": 343.1,
            "y": 313.2
          },
          {
            "x": 336.5,
            "y": 334.8
          },
          {
            "x": 327.3,
            "y": 356.5
          },
          {
            "x": 315.7,
            "y": 377.9
          },
          {
            "x": 301.6,
            "y": 399.2
          },
          {
            "x": 285.0,
            "y": 420.0
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
