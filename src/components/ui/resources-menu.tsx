import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";

const ResourcesMenu: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  const submenus = [
    {
      title: t("research"),
      href: "/research",
    },
    {
      title: t("standards"),
      href: "/standard",
    },
  ];
  return (
    <>
      <DropdownMenu
        open={openDropdown}
        onOpenChange={() => {
          setOpenDropdown(false);
        }}
      >
        <section onMouseEnter={() => setOpenDropdown(true)} onMouseLeave={() => setOpenDropdown(false)}>
          <DropdownMenuTrigger asChild onMouseEnter={() => setOpenDropdown(true)}>
            <li className="py-4 px-2 hover:bg-slate-200 hover:text-primary-main transition-colors cursor-pointer">
              <span className="">{t("resource").toUpperCase()}</span>
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 fixed top-0 left-0 -ml-14" onMouseLeave={() => setOpenDropdown(false)}>
            {submenus.map((submenu, index) => (
              <DropdownMenuItem key={index} className="mt-2">
                <Link href={submenu.href} className="hover:text-slate-500 ">
                  {submenu.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </section>
      </DropdownMenu>
    </>
  );
};

export default ResourcesMenu;
