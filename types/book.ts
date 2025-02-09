export type books = {
  id: number;
  title: string;
  slug: string;
  author: string;
  isbn: string;
  stock: number;
  description: string;
  is_visible: number;
  price: number;
  image: string;
  categories: { id: number; name: string }[];
  library: {
    id: number | null;
    name: string | null;
    location: string | null;
  };
  read_count: number;
  average_rating: number;
  review_count: number;
  publisher: string;
  page_count: number;
  publication_year: string;
  language: string;
  added_by: string;
  last_page?: number | null;
  created_at: string;
  updated_at: string;
};
