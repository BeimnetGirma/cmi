import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import React from "react";
import { PageProps } from "@/types";
import { useTranslation } from "@/app/i18n";

const NavBar: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "navbar");
  const navLinks = [
    {
      title: t("home"),
      href: "/",
    },
    {
      title: t("about"),
      href: "/about",
    },
    {
      title: t("standards"),
      href: "/standards",
    },
    {
      title: t("services"),
      href: "/services",
    },
    {
      title: t("support"),
      href: "/support",
    },

    {
      title: t("contactUs"),
      href: "/contact",
    },
  ];
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/assets/imgs/logo.png"
              alt="Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="text-slate-900 hover:text-indigo-600"
            >
              {link.title}
            </Link>
          ))}
          <LanguageSelector params={{ lng }} />
          <Link
            href={"/login"}
            className="g-gray-400 text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors"
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
