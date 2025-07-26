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
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-services.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">{lng == "am" ? "ማስታወቂያ" : "Announcement"}</h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              {lng == "am" ? "ዋና ገጽ" : "HOME PAGE"}
            </Link>{" "}
            <Link href={"/announcements"} className="hover:text-slate-300">
              / {lng == "am" ? "ማስታወቂያ" : "Announcements".toUpperCase()}
            </Link>{" "}
          </p>
        </div>
      </div>
      {announcement && (
        <div className="w-1/2 mx-auto mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{lng == "en" ? announcement.title : announcement.title_am}</CardTitle>
              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
              <CardDescription className="font-bold">{lng == "en" ? "Description" : "መግለጫ"}</CardDescription>
              <CardDescription className="m-2 text-justify">{lng == "en" ? announcement.description : announcement.description_am}</CardDescription>
              <CardDescription className="font-bold">{lng == "en" ? "Resources" : "መረጃዎች"}</CardDescription>
              {/* <CardDescription className="m-2">{announcement.link}</CardDescription> */}
              <div className="mx-2 my-4">
                {announcement.link && (
                  <Link href={announcement.link} target="_blank" className="text-blue-500 underline">
                    {" "}
                    {announcement.link}
                  </Link>
                )}
                {announcement.attachment && (
                  <div className="flex mt-2">
                    <div
                      onClick={() => announcement.attachment && handleFileOpen(JSON.parse(announcement.attachment).filePath)}
                      className="flex flex-row justify-center items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="36" viewBox="0 0 56 64" enableBackground="new 0 0 56 64" xmlSpace="preserve" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path fill="#8C181A" d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"></path>{" "}
                            <path fill="#6B0D12" d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"></path>{" "}
                            <path opacity="0.5" fill="#FFFFFF" enableBackground="new " d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"></path>{" "}
                          </g>{" "}
                          <path
                            fill="#FFFFFF"
                            d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"
                          ></path>
                          {""}
                        </g>
                      </svg>
                      <span className="m-2">{JSON.parse(announcement.attachment).originalName}</span>
                    </div>
                  </div>
                )}
              </div>

              <CardDescription className="font-bold">{lng == "en" ? "Date Posted" : "የወጣበት ቀን"}</CardDescription>
              <CardDescription className="m-2">{announcement.createdAt.toDateString()}</CardDescription>
              {/* <CardDescription className="font-bold">Attachment</CardDescription> */}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewAnnoucement;
