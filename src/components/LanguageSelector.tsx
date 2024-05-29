"use client";
import { useEffect, useRef, useState } from "react";
const LanguageSelector = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicked outside of div
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

  const [isOpen, setOpen] = useState(false);
  const toggelMenu = () => setOpen(!isOpen);
  const [language, setLanguage] = useState("en");
  const selectLanguage = (lang: string) => () => {
    setLanguage(lang);
    setOpen(false);
  };
  return (
    <div className="relative">
      <button className="flex items-center space-x-1 text-slate-900 hover:text-indigo-600" onClick={toggelMenu}>
        {language === "en" ? "English" : language === "am" ? "አማርኛ" : language === "tg" ? "ትግርኛ" : "Affan Oromo"}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          {/* toggle dropdown icon */}
          {isOpen ? (
            <path fillRule="evenodd" d="M10 3a1 1 0 00-.707.293l-7 7a1 1 0 101.414 1.414L10 5.414l6.293 6.293a1 1 0 001.414-1.414l-7-7A1 1 0 0010 3z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M10 17a1 1 0 00.707-.293l7-7a1 1 0 00-1.414-1.414L10 14.586 3.707 8.293a1 1 0 00-1.414 1.414l7 7A1 1 0 0010 17z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div ref={ref}>
          <ul className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg">
            <li>
              <a onClick={selectLanguage("en")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                English
              </a>
            </li>
            <li>
              <a onClick={selectLanguage("am")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                አማርኛ
              </a>
            </li>
            <li>
              <a onClick={selectLanguage("tg")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                ትግርኛ
              </a>
            </li>
            <li>
              <a onClick={selectLanguage("or")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Affan Oromo
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
