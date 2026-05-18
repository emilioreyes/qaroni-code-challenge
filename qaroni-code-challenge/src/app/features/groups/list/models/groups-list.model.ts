export interface GroupCategory {
  language: string;
  slug: string;
  name: string;
  description: string | null;
}

export interface GroupSerie {
  preffix: string;
  creationDate: string;
  lastUpdateDate: string;
  serieId: number;
}

export interface GroupItem {
  merchantId: number;
  serieId: number;
  templateUUID: string | null;
  status: string;
  position: number;
  type: string;
  isPaid: boolean;
  isPartner: boolean;
  hasApproval: boolean;
  hasPartner: boolean;
  name: string;
  description: string | null;
  groupId: number;
  imageUrl: string | null;
  category: GroupCategory | null;
  serie: GroupSerie | null;
}

export interface GroupListResponse {
  count: number;
  included: unknown | null;
  input: string;
  result: GroupItem[];
  links: unknown | null;
}