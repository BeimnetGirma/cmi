"use client";
import { PageProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";

const ServiceMenu: React.FC<PageProps & { services: { title_en: string; title_am: string | null; id: string; slug: string }[] }> = ({ services, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const [openDropdown, setOpenDropdown] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
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
          setOpenDropdown(open); // for mobile click toggle
        } else {
          setOpenDropdown(open); // allow shadcn to handle open/close for desktop hover
        }
      }}
    >
      <section onMouseEnter={() => !isMobile && setOpenDropdown(true)} onMouseLeave={() => !isMobile && setOpenDropdown(false)}>
        <DropdownMenuTrigger
          asChild
          onClick={toggleMobileDropdown} // mobile click opens menu
          onMouseEnter={() => !isMobile && setOpenDropdown(true)}
        >
          <li className="py-2 px-2 transition-all duration-200 font-normal text-secondary-light hover:scale-105 hover:text-primary-main hover:rounded-md cursor-pointer">
            <span className="text-base">{t("services").toUpperCase()}</span>
          </li>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" onMouseLeave={() => !isMobile && setOpenDropdown(false)}>
          {services.map((service, index) => (
            <DropdownMenuItem key={index} className="mt-2">
              <Link href={`/${lng}/services/${service.slug}`} className="hover:text-slate-500">
                {lng === "am" ? service.title_am : service.title_en}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </section>
    </DropdownMenu>
  );
};

export default ServiceMenu;
