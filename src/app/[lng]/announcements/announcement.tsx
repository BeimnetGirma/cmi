"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn-card";
import { announcement } from "@prisma/client";
import Link from "next/link";

interface AnnouncementProps {
  announcement: announcement;
}

const Announcement = ({ announcement }: AnnouncementProps) => {
  const getLastVisit = () => {
    return localStorage.getItem("lastVisit");
  };

  const lastVisit = getLastVisit();
  const isNew = lastVisit ? new Date(announcement.createdAt) > new Date(lastVisit) : true;
  return (
    <>
      <Card className="w-11/12 mx-auto mt-6 hover:scale-105 transition-transform duration-300 ease-in-out">
        <CardHeader className="flex flex-row">
          <div className="flex flex-col w-3/4">
            <CardTitle>
              {announcement.title} {isNew && <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm">New</span>}
            </CardTitle>
            <CardDescription>{announcement.description}</CardDescription>
          </div>
          <div className="flex flex-row ml-auto items-end">
            <div className="mr-4">
              <span className="font-semibold">Posted On:</span>
              <span>{new Date(announcement.createdAt).toDateString()}</span>
            </div>
            <Link className="btn btn-primary bg-primary-main px-5 py-2 rounded-md text-slate-50" href={`/announcements/${announcement.id}`}>
              Details
            </Link>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default Announcement;
