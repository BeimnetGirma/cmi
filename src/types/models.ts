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
export type Service = {
  id?: string;
  title: string;
  content?: string | null;
  image: string;
  link?: string | null;
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
