export interface NewsItem {
  merchantId: number;
  originId: any;
  status: string;
  name: any;
  featured: boolean;
  date: string;
  title: string;
  subtitle: any;
  slug: string;
  shortDescription: string;
  largeDescription: string;
  creationDate: string;
  lastUpdateDate: string;
  newId: number;
  imagesURL: string[];
  imageUrl: string;
  authors: any[];
  tags: any[];
  categories: Category[];
  descriptions: Description2[];
}

export interface Category {
  merchantId: number;
  status: string;
  creationDate: string;
  lastUpdateDate: string;
  categoryId: number;
  descriptions: Description[];
}

export interface Description {
  language: string;
  slug: string;
  name: string;
  description: string;
  creationDate: string;
  lastUpdateDate: string;
}

export interface Description2 {
  language: string;
  slug: string;
  title: string;
  subtitle: any;
  shortDescription: string;
  largeDescription: string;
}

export interface NewsLinks {
  total: number;
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export interface NewsResponse {
  count: number;
  included: unknown | null;
  input: string;
  result: NewsItem[];
  links: NewsLinks;
}
