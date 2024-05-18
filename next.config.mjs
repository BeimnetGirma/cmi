/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = {
  i18n: {
    locales: ["en", "am"],
    defaultLocale: "en",
  },
  nextTranslate: {},
};

export default nextConfig;
