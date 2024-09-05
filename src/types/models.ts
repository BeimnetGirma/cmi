export type Department = {
  id?: number;
  name: string;
};
export type Research = {
  id?: number;
  title: string;
  departmentId: number;
  year: Date;
  path: string;
};
