export interface FeaturedPosts {
  posts: Post[];
  meta: Meta;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: null;
  prev: null;
}

export interface Post {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  comment_id: string;
  feature_image: string;
  featured: boolean;
  visibility: string;
  email_recipient_filter: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  custom_excerpt: null | string;
  codeinjection_head: null;
  codeinjection_foot: null;
  custom_template: null;
  canonical_url: null;
  authors: string[];
  tags: {
    id: string;
    name: string;
  }[];
  primary_author: string[];
  primary_tag: string[] | null;
  url: string;
  excerpt: string;
  reading_time: number;
  access: boolean;
  og_image: null;
  og_title: null;
  og_description: null;
  twitter_image: null;
  twitter_title: null;
  twitter_description: null;
  meta_title: null;
  meta_description: null;
  email_subject: null;
  frontmatter: null;
}
