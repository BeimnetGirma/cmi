"use client";

import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { PageProps, ResourceType } from "@/types";

const ResourcesMenu: React.FC<PageProps & { resourceTypes: ResourceType[] }> = ({ resourceTypes, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const submenus = [
    { title: t("research"), href: "/research" },
    { title: t("standards"), href: "/standard" },
  ];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMobileDropdown = () => {
    if (isMobile) setOpenDropdown((prev) => !prev);
  };

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={(open) => {
        if (isMobile) {
          setOpenDropdown(open);
        } else {
          setOpenDropdown(open);
        }
      }}
    >
      <section onMouseEnter={() => !isMobile && setOpenDropdown(true)} onMouseLeave={() => !isMobile && setOpenDropdown(false)}>
        <DropdownMenuTrigger asChild onClick={toggleMobileDropdown} onMouseEnter={() => !isMobile && setOpenDropdown(true)}>
          <li className="py-2 px-2 transition-all duration-200 font-normal text-secondary-light hover:scale-105 hover:text-primary-main hover:rounded-md cursor-pointer">
            <span className="text-base">{t("resource").toUpperCase()}</span>
          </li>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" onMouseLeave={() => !isMobile && setOpenDropdown(false)}>
          {submenus.map((submenu, index) => (
            <DropdownMenuItem key={index} className="mt-2">
              <Link href={submenu.href} className="hover:text-slate-500">
                {submenu.title}
              </Link>
            </DropdownMenuItem>
          ))}

          {resourceTypes.map((type, index) => (
            <DropdownMenuItem key={index} className="mt-2">
              <Link
                href={{
                  pathname: `/${lng}/resources`,
                  query: { type: type.name },
                }}
                className="hover:text-slate-500"
              >
                {lng === "am" ? type.name_am : type.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </section>
    </DropdownMenu>
  );
};

export default ResourcesMenu;
