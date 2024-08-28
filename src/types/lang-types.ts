import { PostOrPage } from "@tryghost/content-api";

export interface PageProps {
  params: {
    lng: string;
  };
}
export interface HomePageProps extends PageProps {
  featuredPosts: PostOrPage[];
}
export * from "./lang-types";
