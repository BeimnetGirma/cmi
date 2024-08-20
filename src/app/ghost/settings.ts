import GhostContentAPI from "@tryghost/content-api";
// Create API instance with site credentials

const api = new GhostContentAPI({
  url: "http://localhost:8005" as string,
  key: "cb2db959f0ba68cf299a1b6dc7",
  version: "v4.8",
});

export async function getNavbar() {
  const settings = await api.settings.browse();
  return settings.navigation;
}
