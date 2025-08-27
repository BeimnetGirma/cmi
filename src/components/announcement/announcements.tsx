import React from "react";
import FileOpen from "../ui/file-open";
import { FILE_MODULE } from "@/lib/enums";
import NewAnnouncement from "./newAnnouncement";
import { Announcement } from "@/types";
import { Announcement as IAnnouncement } from "@/types";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import EditAnnouncement from "./editAnnouncement";
import DeleteAnnouncement from "./deleteAnnouncement";
import { announcement, Prisma } from "@prisma/client";
export async function createAnnouncement(newAnnouncement: IAnnouncement) {
  "use server";
  try {
    await prisma.announcement.create({
      data: newAnnouncement,
    });
    revalidatePath("/admin");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("One or more fields exceed the maximum allowed length.");
      }
    }
    throw error;
  }
}
const Announcements = async () => {
  const announcements: announcement[] = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  async function editAnnouncement(announcement: IAnnouncement) {
    "use server";
    try {
      await prisma.announcement.update({
        where: { id: announcement.id },
        data: {
          title: announcement.title,
          title_am: announcement.title_am,
          description: announcement.description,
          description_am: announcement.description_am,
          link: announcement.link,
          attachment: announcement.attachment,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteAnnouncement(announcement_id: string) {
    "use server";
    try {
      await prisma.announcement.delete({
        where: { id: announcement_id },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div className="flex flex-col justify-center ">
        <div className="text-center">
          <h1 className="text-3xl text-blue-400  my-12">Announcements</h1>
        </div>

        <div className="justify-end px-52">
          <NewAnnouncement createAnnouncement={createAnnouncement} />
          <table className="table-auto mx-auto w-full my-4 border border-collapse ">
            <thead>
              <tr>
                <th className="p-6 font-bold border">No.</th>
                <th className="p-6 font-bold border w-1/4">Title</th>
                <th className="p-6 font-bold border">Posted On</th>
                <th className="p-6 font-bold border">Description</th>
                <th className="p-6 font-bold border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement, index) => (
                <tr key={announcement.id}>
                  <td className="p-6 border">{index + 1}</td>
                  <td className="p-6 border w-1/4">{announcement.title}</td>
                  <td className="p-6 border whitespace-nowrap">{new Date(announcement.createdAt).toDateString()}</td>
                  <td className="p-6 border">
                    {announcement.description ? (announcement.description.length > 200 ? announcement.description.substring(0, 200) + "..." : announcement.description) : ""}
                  </td>
                  {/* <td className="p-6 border">{JSON.parse(announcement.attachment || "")?.originalName ?? ""}</td> */}
                  <td className="p-6 border">
                    <div className="flex flex-row gap-3 justify-center">
                      {" "}
                      <EditAnnouncement announcement={announcement} editAnnouncement={editAnnouncement} />
                      <DeleteAnnouncement announcement={announcement} deleteAnnouncement={deleteAnnouncement} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
