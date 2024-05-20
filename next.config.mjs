/** @type {import('next').NextConfig} */
import nextTranslate from "next-translate";
const nextConfig = {
  i18n: {
    locales: ["en", "am"],
    defaultLocale: "en",
  },
};
const config = nextTranslate(nextConfig);
export default config;
