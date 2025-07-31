import { createInstance, i18n } from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { Options, getOptions } from "./settings";

export const initI18next = async (lng: string, ns: string = "translation"): Promise<i18n> => {
  const i18nInstance = createInstance();

  const baseUrl =
    typeof window !== "undefined"
      ? "" // Client-side → Use relative
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Server-side → Use absolute

  const loadPath = `${baseUrl}/api/{{lng}}?t=${new Date().getTime()}`;
  console.log("****************");

  console.log("i18next loadPath:", loadPath);

  await i18nInstance
    .use(initReactI18next)
    .use(HttpBackend)
    .init({
      ...getOptions(lng, ns),
      backend: {
        loadPath,
      },
      ns: ["translation", "navbar", "services"], // Ensure all namespaces are listed
      defaultNS: "translation",
      fallbackLng: "en",
    });

  return i18nInstance;
};

export async function useTranslation(lng: string, ns: string, options: Options = {}): Promise<{ t: i18n["t"]; i18n: i18n }> {
  const i18nextInstance = await initI18next(lng, ns);

  // Ensure API translations are reloaded
  await i18nextInstance.reloadResources(lng, ns);

  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
