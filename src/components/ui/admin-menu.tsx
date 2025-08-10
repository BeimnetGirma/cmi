"use client";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";
import { usePathname } from "next/navigation";

const AdminMenu: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  const pathname = usePathname();

  return (
    // <DropdownMenu
    //   open={openDropdown}
    //   onOpenChange={() => {
    //     setOpenDropdown(false);
    //   }}
    // >
    //   <section onMouseEnter={() => setOpenDropdown(true)} onMouseLeave={() => setOpenDropdown(false)}>
    //     <DropdownMenuTrigger asChild onMouseEnter={() => setOpenDropdown(true)}>
    //       <li className="py-4">
    //         <span className="hover:text-secondary-highlight transition-colors cursor-pointer ">{t("controlPanel").toUpperCase()}</span>
    //       </li>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent className="w-56 fixed top-0 left-0 -ml-20" onMouseLeave={() => setOpenDropdown(false)}>
    //       <DropdownMenuItem className="mt-2 hover:cursor-pointer">
    //         <Link href="/admin" className="hover:text-slate-500 ">
    //           {t("admin")}
    //         </Link>
    //       </DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </section>
    // </DropdownMenu>
    <li
      className={`py-2 px-2 transition-all duration-200 font-normal hover:scale-105 hover:text-primary-main hover:rounded-md cursor-pointer ${
        pathname == `/${lng}/admin` ? "font-semibold text-primary-main" : "text-secondary-light"
      }`}
    >
      <Link href="/admin">
        <span className="inline-flex items-start text-base">{t("admin").toUpperCase()}</span>
      </Link>
    </li>
  );
};

export default AdminMenu;
