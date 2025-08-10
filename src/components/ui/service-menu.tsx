"use client";
import { PageProps } from "@/types";
import React, { useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";

const ServiceMenu: React.FC<PageProps & { services: { title_en: string; title_am: string | null; id: string; slug: string }[] }> = ({ services, params: { lng } }) => {
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
            <li className="py-2 px-2 transition-all duration-200 font-normal text-secondary-light hover:scale-105 hover:text-primary-main hover:rounded-md cursor-pointer">
              <span className="text-base  ">{t("services").toUpperCase()}</span>
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 fixed top-0 left-0 -ml-14" onMouseLeave={() => setOpenDropdown(false)}>
            {services.map((service, index) => (
              <DropdownMenuItem key={index} className="mt-2">
                <Link
                  key={index}
                  href={{
                    pathname: `/${lng}/services/${service.slug}`,
                    // query: { exec: submenu.id }, // Pass query as an object
                  }}
                  className="hover:text-slate-500 "
                >
                  {lng === "am" ? service.title_am : service.title_en}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </section>
      </DropdownMenu>
    </>
  );
};

export default ServiceMenu;
