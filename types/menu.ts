export type MenuType = {
  name: string;
  href: string;
};

export type MenuTypes = {
  name: string;
  href?: string;
  dropdown?: MenuType[];
};

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: string | number;
  coverUrl: string;
}

export interface Participant {
  rank: number;
  name: string;
  points: number;
  image: string;
}
