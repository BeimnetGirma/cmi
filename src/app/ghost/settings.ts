import GhostContentAPI from "@tryghost/content-api";
// Create API instance with site credentials

const api = new GhostContentAPI({
  url: String(process.env.NEXT_PUBLIC_GHOST_URL).replace("/ghost", ""),
  key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY as string,
  version: "v4.8",
});

export async function getNavbar() {
  const settings = await api.settings.browse();
  return settings.navigation;
}
