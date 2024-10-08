"use client";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import React, { useState } from "react";
import { PageProps, Department } from "@/types";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";

const NavBar: React.FC<PageProps & { departments: Department[] }> = ({
  departments,
  params: { lng },
}) => {
  const { t } = useTranslation(lng, "navbar");
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [showDepartments, setShowDepartments] = useState(false);

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
      title: t("services"),
      href: "/services",
    },
    {
      title: t("resource"),
      href: "/resource",
      submenus: [
        {
          title: t("research"),
          href: "/research",
        },
        {
          title: t("standard"),
          href: "/standard",
        },
      ],
    },
    {
      title: t("media"),
      href: "/news",
      submenus: [
        {
          title: t("News"),
          href: "/news",
        },
        {
          title: t("gallery"),
          href: "/gallery",
        },
        {
          title: t("Magazine"),
          href: "/magazine",
        },
      ],
    },
    {
      title: t("executive"),
      href: "/executive",
      submenus: [
        {
          title: t("cmstandard"),
          href: "/cmstandard",
        },
        {
          title: t("consultancy"),
          href: "/consultancy",
        },
        {
          title: t("coe"),
          href: "/coe",
        },
      ],
    },
    {
      title: t("contactUs"),
      href: "/contact",
    },
  ];
  return (
    <nav className="bg-primary-light shadow-md flex flex-wrap items-center  px-6 lg:px-16 py-4 lg:py-0 ">
      <div className="flex-1 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/imgs/logo.png"
            alt="Logo"
            width={50}
            height={140}
            className="block lg:hidden"
          />
          <Image
            src="/assets/imgs/logo-no-bg.png"
            alt="Logo"
            width={380}
            height={480}
            className="hidden lg:block"
          />
        </Link>
      </div>
      <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />
      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <ul className="text-xl text-center items-center gap-x-5 py-6 md:gap-x-4 lg:text-lg lg:flex ">
          {navLinks.map((link) => (
            <li key={link.href} className="py-4">
              <Link
                href={link.href}
                className={` hover:text-secondary-highlight transition-colors ${
                  pathname === `/${lng}${link.href}`
                    ? "font-semibold text-secondary-highlight "
                    : "font-normal text-secondary-light"
                }`}
              >
                {link.title.toUpperCase()}
              </Link>
            </li>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setShowDepartments(true)}
            onMouseLeave={() => setShowDepartments(false)}
          >
            <Link
              href="#"
              className={`text-slate-700 font-normal hover:text-slate-400  transition-colors`}
            >
              {t("departments").toUpperCase()}
            </Link>
            {showDepartments && (
              <div className="absolute top-full left-0 w-96 bg-white shadow-md rounded-md py-2">
                {departments.map((department, index) => (
                  <Link
                    href={{
                      pathname: "department",
                      query: { dept: department.name },
                    }}
                    key={index}
                    className="block px-4 py-2 hover:text-slate-400 transition-colors"
                  >
                    {department.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <li className="py-4">
            <LanguageSelector params={{ lng }} />
          </li>
          {isLoaded && user ? (
            <SignOutButton redirectUrl="/">
              <button className="g-gray-400 text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          ) : (
            <Link
              href={"/login"}
              className="text-white rounded-md px-4 py-2 bg-primary-main font-semibold hover:bg-gray-500 transition-colors"
            >
              {t("login")}
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
