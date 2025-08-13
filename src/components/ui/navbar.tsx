"use client";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import React, { useEffect, useState } from "react";
import { PageProps, Department, ResourceType } from "@/types";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import ResourcesMenu from "../ui/resources-menu";
import DepartmentMenu from "../departments/department-menu";
import ExecutiveMenu from "../ui/executive-menu";
import MediaMenu from "./media-menu";
import AdminMenu from "../ui/admin-menu";
import AnnouncementMenu from "./announcement-menu";
import { announcement } from "@prisma/client";
import ServiceMenu from "./service-menu";

const NavBar: React.FC<
  PageProps & {
    services: { title_en: string; title_am: string | null; id: string; slug: string }[];
    executives: { departmentName: string; departmentName_am: string | null; id: string }[];
    announcements: announcement[];
    resourceTypes: ResourceType[];
  }
> = ({ services, executives, announcements, resourceTypes, params: { lng } }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation(lng, "navbar");
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
    // {
    //   title: t("services"),
    //   href: "/services",
    // },
    // {
    //   title: t("contactUs"),
    //   href: "/contact",
    // },
  ];

  return (
    <nav className="bg-shadedbg-main shadow-md z-50 px-4 sm:px-6 lg:px-16">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/imgs/logo.png" alt="Logo" width={60} height={140} />
            <Image src="/assets/imgs/logo-text.png" alt="Logo" width={380} height={480} className="hidden xl:block" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-5 py-8 md:py-0">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={`py-2 px-2 transition-all duration-200 hover:scale-105 hover:text-primary-main hover:rounded-md ${
                pathname === `/${lng}${link.href}` ? "font-semibold text-primary-main" : "font-normal text-secondary-light"
              }`}
            >
              <Link href={link.href} className="text-base">
                {link.title.toUpperCase()}
              </Link>
            </li>
          ))}

          {/* Other Menus */}
          <ServiceMenu services={services} params={{ lng }} />
          <MediaMenu params={{ lng }} />
          <ResourcesMenu resourceTypes={resourceTypes} params={{ lng }} />
          <ExecutiveMenu executives={executives} params={{ lng }} />
          <AnnouncementMenu params={{ lng }} announcements={announcements} />

          {/* Contact */}
          <li
            key="contact"
            className={`py-2 px-2 transition-all duration-200 hover:scale-105 hover:text-primary-main hover:rounded-md ${
              pathname === `/${lng}/contact` ? "font-semibold text-primary-main" : "font-normal text-secondary-light"
            }`}
          >
            <Link href="/contact" className="text-base">
              {t("contactUs").toUpperCase()}
            </Link>
          </li>

          {user && <AdminMenu params={{ lng }} />}

          {/* Language */}
          <li className="py-4">
            <LanguageSelector params={{ lng }} />
          </li>

          {/* Auth */}
          {isLoaded && user ? (
            <SignOutButton redirectUrl="/">
              <button className="text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">{t("logOut")}</button>
            </SignOutButton>
          ) : (
            <Link href={"/login"} className="text-white rounded-md px-4 py-2 bg-primary-main font-semibold hover:bg-gray-500 transition-colors">
              {t("login")}
            </Link>
          )}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden pb-4 space-y-3">
          <ul className="flex flex-col gap-3 text-secondary-light">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-2 ${pathname === `/${lng}${link.href}` ? "font-semibold text-primary-main" : "font-normal"}`}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {/* Other Menus */}
            <ServiceMenu services={services} params={{ lng }} />
            <MediaMenu params={{ lng }} />
            <ResourcesMenu resourceTypes={resourceTypes} params={{ lng }} />
            <ExecutiveMenu executives={executives} params={{ lng }} />
            <AnnouncementMenu params={{ lng }} announcements={announcements} />

            {/* Contact */}
            <li>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2 px-2">
                {t("contactUs")}
              </Link>
            </li>

            {user && <AdminMenu params={{ lng }} />}

            {/* Language Selector */}
            <LanguageSelector params={{ lng }} />

            {/* Auth */}
            {isLoaded && user ? (
              <SignOutButton redirectUrl="/">
                <button className="w-full text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">{t("logOut")}</button>
              </SignOutButton>
            ) : (
              <Link
                href={"/login"}
                onClick={() => setMenuOpen(false)}
                className="block text-center text-white rounded-md px-4 py-2 bg-primary-main font-semibold hover:bg-gray-500 transition-colors"
              >
                {t("login")}
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
