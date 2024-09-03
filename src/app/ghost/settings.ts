import GhostContentAPI from "@tryghost/content-api";
// Create API instance with site credentials

const api = new GhostContentAPI({
  url: process.env.NEXT_PUBLIC_GHOST_URL as string,
  key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY as string,
  version: "v4.8",
});

export async function getNavbar() {
  const settings = await api.settings.browse();
  return settings.navigation;
}
