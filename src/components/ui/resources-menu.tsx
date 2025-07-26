import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { PageProps, ResourceType } from "@/types";

const ResourcesMenu: React.FC<PageProps & { resourceTypes: ResourceType[] }> = ({ resourceTypes, params: { lng } }) => {
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
            <li className="py-2 px-2 transition-all duration-200 font-normal text-secondary-light hover:scale-105 hover:text-primary-main hover:rounded-md cursor-pointer">
              <span className="text-base">{t("resource").toUpperCase()}</span>
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
            {resourceTypes.map((type, index) => (
              <DropdownMenuItem key={index} className="mt-2">
                <Link
                  key={index}
                  href={{
                    pathname: `/${lng}/resources`,
                    query: { type: type.name }, // Pass query as an object
                  }}
                  className="hover:text-slate-500 "
                >
                  {lng == "am" ? type.name_am : type.name}
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
