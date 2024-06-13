import GhostContentAPI from "@tryghost/content-api";
// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "http://localhost:2368",
  key: "7c3f58e66dffa0e770bf518393",
  version: "v5.0",
});

export async function getPosts() {
  return await api.posts.browse({ limit: "all" }).catch((e) => {
    console.error(e);
  });
}
