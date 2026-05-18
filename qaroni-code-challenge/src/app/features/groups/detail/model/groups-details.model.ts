export interface GroupRelatedItem {
  merchantId: number;
  formId: number | null;
  categoryId: number;
  emailTemplateId: number | null;
  serieId: number;
  templateUUID: string | null;
  status: string;
  type: string;
  isPaid: boolean;
  isPartner: boolean;
  hasPartner: boolean;
  hasApproval: boolean;
  language: string;
  name: string;
  description: string | null;
  slug: string;
  creationDate: string;
  lastUpdateDate: string;
  groupId: number;
  imageUrl: string | null;
}

export interface GroupCategoryDetail {
  merchantId: number;
  status: string;
  language: string;
  name: string;
  description: string | null;
  slug: string;
  groups: GroupRelatedItem[];
  creationDate: string;
  lastUpdateDate: string;
  categoryId: number;
  imageUrl: string | null;
  metatags: unknown[];
}

export interface GroupSerieDetail {
  preffix?: string;
  creationDate?: string;
  lastUpdateDate?: string;
  serieId?: number;
}

export interface GroupSetting {
  groupId: number;
  schemaId: number;
  mutualityId: number | null;
  alertDays: number;
  bankCharge: number;
  keepCode: number;
  hasRenewal: number;
  hasExpiration: number;
  renovationType: string;
  renovationNumber: number;
  feeNumber: number;
  creationDate: string;
  lastUpdateDate: string;
}

export interface GroupDetailItem {
  merchantId: number;
  formId: number | null;
  categoryId: number;
  emailTemplateId: number | null;
  serieId: number;
  templateUUID: string | null;
  status: string;
  position: number;
  type: string;
  isPaid: boolean;
  isPartner: boolean;
  hasPartner: boolean;
  hasApproval: boolean;
  language: string;
  name: string;
  description: string | null;
  slug: string;
  category: GroupCategoryDetail | null;
  productId: number | null;
  variantId: number | null;
  price: number;
  iva: number;
  creationDate: string;
  lastUpdateDate: string;
  groupId: number;
  imageUrl: string | null;
  setting: GroupSetting | null;
  metatags: Metatag[];
}

export interface Metatag {
  creationDate: Date;
  lastUpdateDate: Date;
  merchantId: number;
  metatagId: number;
  type: string;
  typeName: string;
}

export interface GroupDetailResponse {
  count: number;
  included: unknown | null;
  input: string;
  result: GroupDetailItem[];
  links: unknown | null;
}
