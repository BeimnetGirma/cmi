import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";

const MediaMenu: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  const submenus = [
    {
      title: t("news"),
      href: "/news",
    },
    {
      title: t("gallery"),
      href: "/gallery",
    },
    {
      title: t("magazine"),
      href: "/magazine",
    },
  ];
  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => {
        setOpenDropdown(false);
      }}
    >
      <section onMouseEnter={() => setOpenDropdown(true)} onMouseLeave={() => setOpenDropdown(false)}>
        <DropdownMenuTrigger asChild onMouseEnter={() => setOpenDropdown(true)}>
          <li className="py-4 px-2 hover:bg-slate-200 hover:text-primary-main transition-colors cursor-pointer">
            <span className="">{t("media").toUpperCase()}</span>
          </li>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 " onMouseLeave={() => setOpenDropdown(false)}>
          {submenus.map((submenu, index) => (
            <DropdownMenuItem key={index} className="mt-2 hover:cursor-pointer">
              <Link href={submenu.href} className="hover:text-slate-500 ">
                {submenu.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </section>
    </DropdownMenu>
  );
};

export default MediaMenu;
