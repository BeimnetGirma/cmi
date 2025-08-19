export type Department = {
  id?: number;
  name: string;
};
export type Research = {
  id?: number;
  title: string;
  deptId: number;
  year: Date;
  path: string;
};
export type Standard = {
  id?: string;
  title: string;
  path: string;
};
export type Resource = {
  id?: string;
  title: string;
  type: string;
  path: string;
};
export type ResourceType = {
  id?: string;
  name: string;
  name_am?: string | null;
};
export type Magazine = {
  id?: string;
  title: string;
  path: string;
};
export type ServiceTranslationInput = {
  id?: string;
  language: string; // "en" | "am"
  title: string;
  summary?: string;
  content?: any;
};

export type SubServiceTranslationInput = {
  id?: string;
  language: string;
  title: string;
  description?: string;
};

export type SubServiceInput = {
  id?: string;
  order?: number | null;
  link?: string | null;
  translations: SubServiceTranslationInput[];
};

export type ServiceFormInput = {
  id?: string;
  slug?: string;
  imageUrl?: string | null;
  backgroundImageUrl?: string | null;
  translations: ServiceTranslationInput[];
  subservices: SubServiceInput[];
};

type NewServiceProps = {
  createService: (payload: any) => Promise<boolean>;
  editService?: (payload: any) => Promise<boolean>;
  existingService?: ServiceFormInput | null;
};
export type Announcement = {
  id?: string;
  title: string;
  description?: string | null;
  title_am?: string | null;
  description_am?: string | null;
  attachment?: string | null;
  link?: string | null;
};
