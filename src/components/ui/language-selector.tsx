"use client";
import { useTranslation } from "@/app/i18n/client";
import { languages } from "@/app/i18n/settings";
import { PageProps } from "@/types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LanguageSelector: React.FC<PageProps> = ({ params: { lng } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const toggelMenu = () => setOpen(!isOpen);
  const [language] = useState(lng);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams().toString();
  // const toggleLanguage = () => {
  //   const currentLanguage = lng;

  //   if (currentLanguage === "en") {
  //     window.location.href = "/am";
  //   } else {
  //     window.location.href = "/en";
  //   }

  //   // currentLanguage === "en" ? setCurrentLanguage("am") : setCurrentLanguage("en");
  // };

  const toggleLanguage = () => {
    // Extract segments: ["", "en", "about"]
    const segments = pathname.split("/");

    const newLang = segments[1] === "en" ? "am" : "en";
    segments[1] = newLang;

    const newPath = segments.join("/") || "/";
    const fullPath = newPath + (params ? `?${params}` : "");
    // router.push(fullPath);
    window.location.href = fullPath;
  };

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const getLang = (lng: string) => {
    switch (lng) {
      // en and am switched for intutive selection
      case "en":
        return "አማ";
      case "am":
        return "EN";
      case "tg":
        return "ትግርኛ";
      case "or":
        return "Affan Oromo";
      default:
        return "English";
    }
  };

  return (
    <div className="relative flex justify-center">
      {/* <button className="flex items-center space-x-1 text-slate-900 hover:text-indigo-600" onClick={toggelMenu}> */}
      <button className="flex items-center space-x-1 text-slate-900 hover:text-primary-main" onClick={toggleLanguage}>
        {getLang(language)}
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          {isOpen ? (
            <path fillRule="evenodd" d="M10 3a1 1 0 00-.707.293l-7 7a1 1 0 101.414 1.414L10 5.414l6.293 6.293a1 1 0 001.414-1.414l-7-7A1 1 0 0010 3z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M10 17a1 1 0 00.707-.293l7-7a1 1 0 00-1.414-1.414L10 14.586 3.707 8.293a1 1 0 00-1.414 1.414l7 7A1 1 0 0010 17z" clipRule="evenodd" />
          )}
        </svg> */}
      </button>

      {isOpen && (
        <div ref={ref}>
          <ul className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
            {languages
              .filter((l) => lng !== l)
              .map((l, index) => {
                return (
                  <li key={l}>
                    {index > 0 && " or "}
                    <Link href={`/${l}`} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {getLang(l)}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
