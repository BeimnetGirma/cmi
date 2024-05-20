/** @type {import('next').NextConfig} */
import nextTranslate from "next-translate";
const nextConfig = {
  i18n: {
    locales: ["en", "am"],
    defaultLocale: "en",
  },
};
module.exports = nextTranslate(nextConfig);
