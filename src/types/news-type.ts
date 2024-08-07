export interface INews {
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
  custom_excerpt: string;
  codeinjection_head: null;
  codeinjection_foot: null;
  custom_template: null;
  canonical_url: null;
  tags: Tag[];
  authors: Author[];
  primary_author: Author;
  primary_tag: Tag;
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

export interface Author {
  id: string;
  name: string;
  slug: string;
  profile_image: string;
  cover_image: null;
  bio: string;
  website: string;
  location: string;
  facebook: string;
  twitter: string;
  meta_title: null;
  meta_description: null;
  url: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: null;
  feature_image: null;
  visibility: string;
  og_image: null;
  og_title: null;
  og_description: null;
  twitter_image: null;
  twitter_title: null;
  twitter_description: null;
  meta_title: null;
  meta_description: null;
  codeinjection_head: null;
  codeinjection_foot: null;
  canonical_url: null;
  accent_color: null;
  url: string;
}
