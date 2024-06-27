import GhostContentAPI from "@tryghost/content-api";
// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "http://localhost:2368",
  key: "916c461c22693aa2431804693c",
  version: "v4.8",
});

export async function getPosts() {
  return await api.posts.browse({ limit: "all" }).catch((e) => {
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
