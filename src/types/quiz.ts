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
  basketImage: string;
}

export interface QuizItem {
  id: string;
  name: string;
  categoryId: string;
  imageSrc: string;
}

export interface PlacedItem extends QuizItem {
  placedAt: number;
}
