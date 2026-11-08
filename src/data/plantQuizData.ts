import { Category, QuizItem } from "@/types/quiz";

export const PLANT_CATEGORIES: Category[] = [
  {
    id: "akar",
    name: "Akar",
    icon: "akar",
    basketImage: "/assets/baskets/keranjang-akar.png",
    color: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-400 dark:border-purple-600",
      badge: "bg-purple-600 text-white",
      text: "text-purple-900 dark:text-purple-200",
      ring: "ring-purple-400",
    },
  },
  {
    id: "batang",
    name: "Batang",
    icon: "batang",
    basketImage: "/assets/baskets/keranjang-batang.png",
    color: {
      bg: "bg-amber-100/70 dark:bg-yellow-950/30",
      border: "border-amber-700 dark:border-amber-600",
      badge: "bg-amber-800 text-white",
      text: "text-amber-950 dark:text-amber-200",
      ring: "ring-amber-700",
    },
  },
  {
    id: "daun",
    name: "Daun",
    icon: "daun",
    basketImage: "/assets/baskets/keranjang-daun.png",
    color: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-400 dark:border-emerald-600",
      badge: "bg-emerald-600 text-white",
      text: "text-emerald-900 dark:text-emerald-200",
      ring: "ring-emerald-400",
    },
  },
  {
    id: "bunga",
    name: "Bunga",
    icon: "bunga",
    basketImage: "/assets/baskets/keranjang-bunga.png",
    color: {
      bg: "bg-rose-50 dark:bg-rose-950/30",
      border: "border-rose-400 dark:border-rose-600",
      badge: "bg-rose-600 text-white",
      text: "text-rose-900 dark:text-rose-200",
      ring: "ring-rose-400",
    },
  },
  {
    id: "buah",
    name: "Buah",
    icon: "buah",
    basketImage: "/assets/baskets/keranjang-buah.png",
    color: {
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-400 dark:border-orange-600",
      badge: "bg-orange-500 text-white",
      text: "text-orange-900 dark:text-orange-200",
      ring: "ring-orange-400",
    },
  },
];

export const PLANT_QUIZ_ITEMS: QuizItem[] = [
  // 3 Item Akar (Label seragam: "Akar")
  { id: "item-akar-1", name: "Akar", categoryId: "akar", imageSrc: "/assets/items/akar1.png" },
  { id: "item-akar-2", name: "Akar", categoryId: "akar", imageSrc: "/assets/items/akar2.png" },
  { id: "item-akar-3", name: "Akar", categoryId: "akar", imageSrc: "/assets/items/akar3.png" },

  // 3 Item Batang (Label seragam: "Batang")
  { id: "item-batang-1", name: "Batang", categoryId: "batang", imageSrc: "/assets/items/batang1.png" },
  { id: "item-batang-2", name: "Batang", categoryId: "batang", imageSrc: "/assets/items/batang2.png" },
  { id: "item-batang-3", name: "Batang", categoryId: "batang", imageSrc: "/assets/items/batang3.png" },

  // 3 Item Daun (Label seragam: "Daun")
  { id: "item-daun-1", name: "Daun", categoryId: "daun", imageSrc: "/assets/items/daun1.png" },
  { id: "item-daun-2", name: "Daun", categoryId: "daun", imageSrc: "/assets/items/daun2.png" },
  { id: "item-daun-3", name: "Daun", categoryId: "daun", imageSrc: "/assets/items/daun3.png" },

  // 3 Item Bunga (Label seragam: "Bunga")
  { id: "item-bunga-1", name: "Bunga", categoryId: "bunga", imageSrc: "/assets/items/bunga1.png" },
  { id: "item-bunga-2", name: "Bunga", categoryId: "bunga", imageSrc: "/assets/items/bunga2.png" },
  { id: "item-bunga-3", name: "Bunga", categoryId: "bunga", imageSrc: "/assets/items/bunga3.png" },

  // 3 Item Buah (Label seragam: "Buah")
  { id: "item-buah-1", name: "Buah", categoryId: "buah", imageSrc: "/assets/items/buah1.png" },
  { id: "item-buah-2", name: "Buah", categoryId: "buah", imageSrc: "/assets/items/buah2.png" },
  { id: "item-buah-3", name: "Buah", categoryId: "buah", imageSrc: "/assets/items/buah3.png" },
];
