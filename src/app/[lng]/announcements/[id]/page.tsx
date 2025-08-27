"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { announcement } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn-card";
import FileOpen from "@/components/ui/file-open";
import { FILE_MODULE } from "@/lib/enums";
import { PageProps } from "@/types";

const ViewAnnoucement: React.FC<PageProps> = ({ params: { lng } }) => {
  const announcementId = usePathname().split("/").pop();

  const [announcement, setAnnouncement] = useState<announcement>();

  useEffect(() => {
    if (announcementId) {
      const fetchAnnouncement = async () => {
        const res = await fetch(`/api/announcement/${announcementId}`);
        const data = await res.json();
        var e = {
          ...data,
          createdAt: new Date(data.createdAt),
        };

        setAnnouncement(e);
      };
      fetchAnnouncement();
    }
  }, [announcementId]);
  const handleFileOpen = async (filePath: string) => {
    try {
      const response = await fetch(`/api/announcement/?filename=${filePath}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching the file:", error);
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-48 sm:h-64 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-services.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 px-4 text-sm">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold">{lng == "am" ? "ማስታወቂያ" : "Announcement"}</h1>
          <p className="text-xs sm:text-sm md:text-lg pt-2 flex flex-wrap justify-center gap-1">
            <Link href={"/"} className="hover:text-slate-300">
              {lng == "am" ? "ዋና ገጽ" : "HOME PAGE"}
            </Link>
            <span>/</span>
            <Link href={"/announcements"} className="hover:text-slate-300">
              {lng == "am" ? "ማስታወቂያ" : "ANNOUNCEMENTS"}
            </Link>
          </p>
        </div>
      </div>

      {/* Details Card */}
      {announcement && (
        <div className="w-11/12 sm:w-10/12 md:w-3/4 lg:w-1/2 mx-auto mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg md:text-xl">{lng == "en" ? announcement.title : announcement.title_am}</CardTitle>
            </CardHeader>

            <CardContent>
              {/* Description */}
              <CardDescription className="font-bold text-sm sm:text-base">{lng == "en" ? "Description" : "መግለጫ"}</CardDescription>
              <CardDescription className="m-2 text-justify text-sm sm:text-base">{lng == "en" ? announcement.description : announcement.description_am}</CardDescription>

              {/* Resources */}
              <CardDescription className="font-bold text-sm sm:text-base">{lng == "en" ? "Resources" : "መረጃዎች"}</CardDescription>
              <div className="mx-2 my-4 space-y-2">
                {announcement.link && (
                  <Link href={announcement.link} target="_blank" className="text-blue-500 underline break-words text-sm sm:text-base">
                    {announcement.link}
                  </Link>
                )}

                {announcement.attachment && (
                  <div
                    onClick={() => announcement.attachment && handleFileOpen(JSON.parse(announcement.attachment).filePath)}
                    className="flex flex-wrap items-center cursor-pointer"
                  >
                    {/* Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 56 64" className="flex-shrink-0">
                      <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z" />
                      <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z" />
                      <path opacity="0.5" fill="#FFFFFF" d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z" />
                    </svg>

                    {/* File name */}
                    <span className="m-2 text-sm sm:text-base break-words">{JSON.parse(announcement.attachment).originalName}</span>
                  </div>
                )}
              </div>

              {/* Date */}
              <CardDescription className="font-bold text-sm sm:text-base">{lng == "en" ? "Date Posted" : "የወጣበት ቀን"}</CardDescription>
              <CardDescription className="m-2 text-sm sm:text-base">{announcement.createdAt.toDateString()}</CardDescription>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewAnnoucement;
