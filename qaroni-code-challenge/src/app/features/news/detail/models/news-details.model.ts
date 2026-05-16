export interface NewsDetailDescription {
  language: string;
  slug: string;
  title: string;
  subtitle: string | null;
  shortDescription: string | null;
  largeDescription: string | null;
}

export interface NewsMetatagDescription {
  language: string;
  title: string;
  description: string;
  keywords: string;
  creationDate: string;
  lastUpdateDate: string;
}

export interface NewsMetatag {
  merchantId: number;
  status: string;
  type: string;
  typeId: number;
  creationDate: string;
  lastUpdateDate: string;
  metatagId: number;
  typeName: string;
  descriptions: NewsMetatagDescription[];
}

export interface NewsSocial {
  status: string;
  icon: string;
  iconBackground: string;
  iconColor: string;
  theme: string;
  name: string;
  url: string;
  creationDate: string;
  lastUpdateDate: string;
  networkId: number;
}

export interface NewsAuthor {
  merchantId: number;
  status: string;
  firstName: string;
  lastName: string;
  position: string | null;
  description: string | null;
  creationDate: string;
  lastUpdateDate: string;
  authorId: number;
  imageUrl: string | null;
  socials: NewsSocial[];
}

export interface NewsCategoryDescription {
  language: string;
  slug: string;
  name: string;
  description: string | null;
  creationDate: string;
  lastUpdateDate: string;
}

export interface NewsCategory {
  merchantId: number;
  status: string;
  creationDate: string;
  lastUpdateDate: string;
  categoryId: number;
  descriptions: NewsCategoryDescription[];
}

export interface NewsTag {
  merchantId: number;
  status: string;
  slug: string;
  name: string;
  creationDate: string;
  lastUpdateDate: string;
  tagId: number;
}

export interface NewsDetailItem {
  merchantId: number;
  status: string;
  name: string | null;
  featured: boolean;
  date: string;
  title: string;
  subtitle: string | null;
  slug: string;
  shortDescription: string | null;
  largeDescription: string | null;
  creationDate: string;
  lastUpdateDate: string;
  newId: number;
  imagesURL: string[];
  imageUrl: string | null;
  metatags: NewsMetatag[];
  descriptions: NewsDetailDescription[];
  authors: NewsAuthor[];
  categories: NewsCategory[];
  tags: NewsTag[];
}

export interface NewsDetailResponse {
  count: number;
  included: unknown | null;
  input: string;
  result: NewsDetailItem[];
  links: unknown | null;
}