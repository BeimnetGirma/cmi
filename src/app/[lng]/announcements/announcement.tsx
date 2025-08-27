"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn-card";
import { announcement } from "@prisma/client";
import Link from "next/link";

interface AnnouncementProps {
  announcement: announcement;
}

interface AnnouncementProps {
  announcement: announcement;
  lng: string;
}

const Announcement = ({ announcement, lng }: AnnouncementProps) => {
  const getLastVisit = () => {
    return localStorage.getItem("lastVisit");
  };

  const lastVisit = getLastVisit();
  const isNew = lastVisit ? new Date(announcement.createdAt) > new Date(lastVisit) : true;
  return (
    <>
      <Card className="w-11/12 mx-auto mt-6 hover:scale-[1.02] transition-transform duration-300 ease-in-out">
        <CardHeader className="flex flex-col sm:flex-row gap-4 sm:gap-0">
          {/* Left side: Title & Description */}
          <div className="flex flex-col sm:w-3/4">
            <CardTitle className="text-base sm:text-lg md:text-xl">
              {lng == "en" ? announcement.title : announcement.title_am}{" "}
              {isNew && <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs sm:text-sm">{lng === "en" ? "New" : "አዲስ"}</span>}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">{lng == "en" ? announcement.description : announcement.description_am}</CardDescription>
          </div>

          {/* Right side: Date & Button */}
          <div className="flex flex-col sm:flex-row sm:ml-auto sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <div>
              <span className="font-semibold block sm:inline">{lng == "en" ? "Posted On:" : "የወጣበት ቀን:"} </span>
              <span>{new Date(announcement.createdAt).toDateString()}</span>
            </div>
            <Link className="btn btn-primary bg-primary-main px-4 py-2 rounded-md text-white text-sm sm:text-base text-center" href={`/announcements/${announcement.id}`}>
              {lng == "en" ? "Details" : "ዝርዝር"}
            </Link>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default Announcement;
