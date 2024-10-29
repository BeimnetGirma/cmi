import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";

const AdminMenu: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <DropdownMenu
      open={openDropdown}
      onOpenChange={() => {
        setOpenDropdown(false);
      }}
    >
      <section
        onMouseEnter={() => setOpenDropdown(true)}
        onMouseLeave={() => setOpenDropdown(false)}
      >
        <DropdownMenuTrigger asChild onMouseEnter={() => setOpenDropdown(true)}>
          <li className="py-4">
            <span className="hover:text-secondary-highlight transition-colors cursor-pointer ">
              {t("controlPanel").toUpperCase()}
            </span>
          </li>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 "
          onMouseLeave={() => setOpenDropdown(false)}
        >
          <DropdownMenuItem className="mt-2 hover:cursor-pointer">
            <Link href="/admin" className="hover:text-slate-500 ">
              {t("admin")}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </section>
    </DropdownMenu>
  );
};

export default AdminMenu;
