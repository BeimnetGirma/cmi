export type Department = {
  id?: number;
  Departmnet_Name: string;
};
export type Research = {
  id?: number;
  title: string;
  departmentId: number;
  year: Date;
  path: string;
};
