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
      title: t("standards"),
      href: "/standards",
    },
    {
      title: t("services"),
      href: "/services",
    },
    {
      title: t("research"),
      href: "/research",
    },
    {
      title: t("contactUs"),
      href: "/contact",
    },
  ];
  return (
    <nav className="bg-white shadow-md flex flex-wrap items-center  px-6 lg:px-16 py-4 lg:py-0 ">
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
            src="/assets/imgs/header_logo.jpg"
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
                className={` hover:text-primary-main transition-colors ${
                  pathname === `/${lng}${link.href}`
                    ? "font-semibold text-primary-main "
                    : "font-normal text-slate-900"
                }`}
              >
                {link.title.toUpperCase()}
              </Link>
            </li>
          ))}
          <button
            className="relative text-left py-4"
            onMouseEnter={() => setShowDepartments(true)}
            onMouseLeave={() => setShowDepartments(false)}
          >
            <Link
              href="#"
              className={`text-slate-900 font-normal hover:text-slate-400  transition-colors`}
            >
              {t("departments")}
            </Link>
            {showDepartments && (
              <div className="absolute top-full left-0 w-96 bg-white shadow-md rounded-md py-2">
                {departments.map((department, index) => (
                  <Link
                    key={department.Department_Name.toString()}
                    href={{
                      pathname: "department",
                      query: {
                        dept: department.Department_Name.toString(),
                      },
                    }}
                    className="block px-4 py-2  hover:text-slate-400 transition-colors"
                  >
                    {department.Department_Name}
                  </Link>
                ))}
              </div>
            )}
          </button>
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
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
