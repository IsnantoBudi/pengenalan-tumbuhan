export interface Category {
  id: string;
  name: string;
  color: {
    bg: string;
    border: string;
    badge: string;
    text: string;
    ring: string;
  };
  icon: string;
}

export interface QuizItem {
  id: string;
  name: string;
  categoryId: string;
  svgKey: string;
}

export interface PlacedItem extends QuizItem {
  placedAt: number;
}
