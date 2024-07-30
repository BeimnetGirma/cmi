"use client";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import React from "react";
import { PageProps } from "@/types";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";

const NavBar: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoaded } = useUser();

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
      title: t("contactUs"),
      href: "/contact-us",
    },
    {
      title: t("research"),
      href: "/research",
    },
  ];
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/imgs/logo.png" alt="Logo" width={80} height={80} />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className={`text-slate-900 font-normal hover:text-slate-400 transition-colors ${pathname === `/${lng}${link.href}` ? "font-semibold text-blue-900 " : ""}`}
            >
              {link.title.toUpperCase()}
            </Link>
          ))}

          <LanguageSelector params={{ lng }} />
          {isLoaded && user ? (
            <SignOutButton redirectUrl="/">
              <button className="g-gray-400 text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">Sign Out</button>
            </SignOutButton>
          ) : (
            <Link href={"/login"} className="text-white rounded-md px-4 py-2 bg-primary-main font-semibold hover:bg-gray-500 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
