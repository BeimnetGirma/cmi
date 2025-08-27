"use client";
import { useTranslation } from "@/app/i18n/client";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import Link from "next/link";
import { PageProps } from "@/types";
import { announcement } from "@prisma/client";
import { usePathname } from "next/navigation";

const AnnouncementMenu: React.FC<PageProps & { announcements: announcement[] }> = ({ announcements, params: { lng } }) => {
  const { t } = useTranslation(lng, "navbar");
  const pathname = usePathname();
  const saveLastVisit = () => {
    const now = new Date();
    now.setHours(1, 0, 0, 0); // Set time to 9:00 AM this morning
    const nowISOString = now.toISOString(); // Save current time as ISO string
    localStorage.setItem("lastVisit", nowISOString);
    // localStorage.setItem("lastVisit", now);
  };
  const getLastVisit = () => {
    return localStorage.getItem("lastVisit");
  };
  const hasNewAnnouncements = (announcements: announcement[]) => {
    const lastVisit = getLastVisit();

    if (!lastVisit) return true; // If no visit recorded, show as new

    const lastVisitTime = new Date(lastVisit);
    return announcements.some((announcement: announcement) => {
      const announcementTime = new Date(announcement.createdAt);
      return announcementTime > lastVisitTime;
    });
  };
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    setHasNew(hasNewAnnouncements(announcements)); // Check for new announcements
    saveLastVisit(); // Save the current visit time
  }, [announcements]);
  return (
    <li
      className={`px-1 transition-all duration-200 font-normal text-secondary-light hover:scale-105 hover:text-primary-main hover:rounded-md cursor-pointer ${
        pathname === `/${lng}/announcements` ? "font-semibold text-primary-main" : "font-normal text-secondary-light"
      }`}
    >
      <Link href="announcements" onClick={saveLastVisit}>
        <span className="inline-flex items-start text-base">
          {t("announcements")}{" "}
          {hasNew && (
            <svg width="10px" height="10px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 -mt-1">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M16 8C16 6.8804 15.4743 5.88358 14.6563 5.24291C14.7817 4.21146 14.4486 3.13488 13.6569 2.3432C12.8652 1.55152 11.7886 1.21838 10.7572 1.3438C10.1165 0.525732 9.11964 0 8 0C6.8804 0 5.88358 0.525698 5.24291 1.34372C4.21145 1.2183 3.13485 1.55143 2.34316 2.34312C1.55147 3.13481 1.21834 4.21141 1.34376 5.24288C0.525715 5.88354 0 6.88038 0 8C0 9.1196 0.525698 10.1164 1.34372 10.7571C1.2183 11.7886 1.55143 12.8652 2.34312 13.6568C3.13481 14.4485 4.21141 14.7817 5.24288 14.6562C5.88354 15.4743 6.88038 16 8 16C9.1196 16 10.1164 15.4743 10.7571 14.6563C11.7885 14.7817 12.8651 14.4486 13.6568 13.6569C14.4485 12.8652 14.7816 11.7886 14.6562 10.7572C15.4743 10.1165 16 9.11964 16 8Z"
                  fill="#e62828"
                ></path>
              </g>
            </svg>
          )}
        </span>
      </Link>
    </li>
  );
};

export default AnnouncementMenu;
