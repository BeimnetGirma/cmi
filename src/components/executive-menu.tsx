import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import Link from "next/link";

const ExecutiveMenu: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  const submenus = [
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
            <li className="py-4">
              <span className="hover:text-secondary-highlight transition-colors cursor-pointer ">{t("executive").toUpperCase()}</span>
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 " onMouseLeave={() => setOpenDropdown(false)}>
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

export default ExecutiveMenu;
