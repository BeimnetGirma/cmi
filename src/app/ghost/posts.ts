import GhostContentAPI from "@tryghost/content-api";
// Create API instance with site credentials

const api = new GhostContentAPI({
  url: "http://localhost:8005",
  key: "cb2db959f0ba68cf299a1b6dc7",
  version: "v4.8",
});

export async function getPosts() {
  return await api.posts
    //@ts-expect-error
    .browse({ include: "tags,authors", limit: "all" })
    .catch((e) => {
      console.error(e);
    });
}

export async function getSinglePost(postSlug: string) {
  return await api.posts.read({ slug: postSlug }).catch((e) => {
    console.error(e);
  });
}
export async function getPages() {
  return await api.pages.browse({ limit: "all" }).catch((e) => {
    console.error(e);
  });
}
export async function getSinglePage(pageSlug: string) {
  return await api.pages.read({ slug: pageSlug }).catch((e) => {
    console.error(e);
  });
}

export async function getFeaturedPosts(limit: number = 3) {
  return await api.posts
    .browse({ filter: "featured:true", include: "tags,authors", limit })
    .catch((e) => {
      console.error(e);
    });
}
