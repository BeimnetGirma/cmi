import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";
import prisma from "@/db";
import { announcement } from "@prisma/client";
import Announcement from "./announcement";

const Announcements: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-services.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">{t("announcements")}</h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              {t("home").toUpperCase()}
            </Link>{" "}
            / {t("announcements")}
          </p>
        </div>
      </div>
      {announcements.map((announcement, index) => {
        return <Announcement key={index} announcement={announcement} lng={lng} />;
      })}
    </div>
  );
};

export default Announcements;
