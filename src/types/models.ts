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
  attachment?: string | null;
  link?: string | null;
};
