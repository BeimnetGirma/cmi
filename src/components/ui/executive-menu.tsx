"use client";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";

const ExecutiveMenu: React.FC<PageProps & { executives: { departmentName: string; id: string }[] }> = ({ executives, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);

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
            {executives.map((submenu, index) => (
              <DropdownMenuItem key={index} className="mt-2">
                <Link
                  key={index}
                  href={{
                    pathname: `/${lng}/executive`,
                    query: { exec: submenu.id }, // Pass query as an object
                  }}
                  className="hover:text-slate-500 "
                >
                  {submenu.departmentName}
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
