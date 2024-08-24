"use client";
import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "./language-selector";
import React, { useState } from "react";
import { PageProps, Department } from "@/types";
import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";

const NavBar: React.FC<PageProps & { departments: Department[] }> = ({ departments, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const pathname = usePathname();
  const router = useRouter();
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
      title: t("contactUs"),
      href: "/contact",
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
            <Image src="/assets/imgs/header_logo.jpg" alt="Logo" width={380} height={480} />
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
          <div className="relative" onMouseEnter={() => setShowDepartments(true)} onMouseLeave={() => setShowDepartments(false)}>
            <Link href="#" className={`text-slate-900 font-normal hover:text-slate-400  transition-colors`}>
              {t("departments").toUpperCase()}
            </Link>
            {showDepartments && (
              <div className="absolute top-full left-0 w-96 bg-white shadow-md rounded-md py-2">
                {departments.map((department, index) => (
                  <Link
                    href={{ pathname: "department", query: { dept: department.name.toString() } }}
                    key={index}
                    className="block px-4 py-2  hover:text-slate-400 transition-colors"
                  >
                    {department.name}
                  </Link>
                ))}
                {/* <Link href="/departments/1" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                  Department 1
                </Link>
                <Link href="/departments/2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                  Department 2
                </Link>
                <Link href="/departments/3" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                  Department 3
                </Link> */}
              </div>
            )}
          </div>
          <LanguageSelector params={{ lng }} />
          {isLoaded && user ? (
            <SignOutButton redirectUrl="/">
              <button className="g-gray-400 text-white rounded-md px-4 py-2 bg-gray-600 hover:bg-gray-500 transition-colors">Sign Out</button>
            </SignOutButton>
          ) : (
            <Link href={"/login"} className="text-white rounded-md px-4 py-2 bg-primary-main font-semibold hover:bg-gray-500 transition-colors">
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
