import { PostOrPage } from "@tryghost/content-api";

export interface PageProps {
  params: {
    lng: string;
  };
}
export interface HomePageProps extends PageProps {
  featuredPosts: PostOrPage[];
}
};
export type Department = {
  Department_Name: String;
};
export * from "./lang-types";
