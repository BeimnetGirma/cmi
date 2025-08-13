"use client";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";

const ExecutiveMenu: React.FC<PageProps & { executives: { departmentName: string; departmentName_am: string | null; id: string }[] }> = ({ executives, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    <>
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
              <span className="text-base">{t("executive").toUpperCase()}</span>
            </li>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 fixed top-0 left-0 -ml-14" onMouseLeave={() => setOpenDropdown(false)}>
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
                  {lng === "am" ? submenu.departmentName_am : submenu.departmentName}
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
