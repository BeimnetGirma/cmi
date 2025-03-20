// Helper function to adapt Ghost API PostOrPage to our Post type
import { Post } from "@/types/featured-posts";
import { PostOrPage } from "@tryghost/content-api";

const adaptToPost = (post: PostOrPage): Post => {
  return {
    id: post.id || "",
    uuid: post.uuid || "",
    title: post.title || "",
    slug: post.slug || "",
    html: post.html || "",
    comment_id: post.comment_id || "",
    feature_image: post.feature_image || "",
    featured: post.featured || false,
    visibility: "public",
    email_recipient_filter: "all",
    created_at: post.created_at ? new Date(post.created_at) : new Date(),
    updated_at: post.updated_at ? new Date(post.updated_at) : new Date(),
    published_at: post.published_at ? new Date(post.published_at) : new Date(),
    custom_excerpt: post.custom_excerpt || null,
    codeinjection_head: null,
    codeinjection_foot: null,
    custom_template: null,
    canonical_url: null,
    authors: post.authors?.map((author) => author.name || "") || [],
    tags:
      post.tags?.map((tag) => ({ id: tag.id || "", name: tag.name || "" })) ||
      [],
    primary_author: post.primary_author ? [post.primary_author.name || ""] : [],
    primary_tag: post.primary_tag ? [post.primary_tag.name || ""] : null,
    url: post.url || "",
    excerpt: post.excerpt || "",
    reading_time: post.reading_time || 0,
    access: false,
    og_image: null,
    og_title: null,
    og_description: null,
    twitter_image: null,
    twitter_title: null,
    twitter_description: null,
    meta_title: null,
    meta_description: null,
    email_subject: null,
    frontmatter: null,
  };
};

export default adaptToPost;
