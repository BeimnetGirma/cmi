import React from "react";
import { Magazine as IMagazine } from "@/types";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import NewMagazine from "./newMagazine";
import FileOpen from "../ui/file-open";
import { FILE_MODULE } from "@/lib/enums";
import DeleteMagazine from "./deleteMagazine";
import EditMagazine from "./editMagazine";
export async function createMagazine(newMagazine: IMagazine) {
  "use server";
  try {
    await prisma.magazine.create({ data: newMagazine });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
const Magazines = async () => {
  const magazines = await prisma.magazine.findMany();
  async function editMagazine(magazine: IMagazine) {
    "use server";
    try {
      await prisma.magazine.update({
        where: { id: magazine.id },
        data: {
          title: magazine.title,
          path: magazine.path,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteMagazine(magazineId: string) {
    "use server";
    try {
      await prisma.magazine.delete({
        where: { id: magazineId },
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
          <h1 className="text-3xl text-blue-400  my-12">Magazines</h1>
        </div>

        <div className="justify-end px-52">
          <NewMagazine createMagazine={createMagazine} />
          <table className="table-auto mx-auto w-full my-4 border border-collapse ">
            <thead>
              <tr>
                <th className="p-6 font-bold border">Title</th>
                <th className="p-6 font-bold border">File Name</th>
                <th className="p-6 font-bold border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {magazines.map((magazine) => (
                <tr key={magazine.id}>
                  <td className="p-6 border">{magazine.title}</td>
                  <td className="p-6 border">{JSON.parse(magazine.path)?.originalName}</td>
                  <td className="p-6 border">
                    <div className="flex flex-row gap-3 justify-center">
                      {" "}
                      <FileOpen apiUrl={FILE_MODULE.MAGAZINE} filePath={JSON.parse(magazine.path)?.filePath} />
                      <EditMagazine magazine={magazine} editMagazine={editMagazine} />
                      <DeleteMagazine magazine={magazine} deleteMagazine={deleteMagazine} />
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

export default Magazines;
