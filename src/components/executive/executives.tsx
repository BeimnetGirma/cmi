import React from "react";
import NewExecutive from "./new-executive";
import prisma from "@/db";
import { Executive } from "@prisma/client";
import { revalidatePath } from "next/cache";
import EditExecutive from "./edit-executive";
import DeleteExecutive from "./delete-executive";

export async function createExecutives(newExecutive: any) {
  "use server";
  try {
    await prisma.executive.create({ data: newExecutive });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
export async function editExective(executive: Executive) {
  "use server";
  try {
    await prisma.executive.update({
      where: { id: executive.id },
      data: {
        name: executive.name,
        title: executive.title,
        jobDescription: executive.jobDescription,
        imagePath: executive.imagePath,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}
async function deleteExecutive(executive_id: string) {
  "use server";
  try {
    await prisma.executive.delete({
      where: { id: executive_id },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
  }
}

const Executives = async () => {
  const executives = await prisma.executive.findMany();
  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="text-center">
          <h1 className="text-3xl text-blue-400  my-12">Executives</h1>
        </div>

        <div className="justify-end px-52">
          <NewExecutive createExecutive={createExecutives} />
          <table className="table-auto mx-auto w-full my-4 border border-collapse ">
            <thead>
              <tr>
                <th className="p-6 font-bold border">Name</th>
                <th className="p-6 font-bold border">Title</th>
                <th className="p-6 font-bold border">Job Description</th>
              </tr>
            </thead>
            <tbody>
              {executives.map((exec, index) => (
                <tr key={index}>
                  <td className="p-6 border">{exec.name}</td>
                  <td className="p-6 border">{exec.title}</td>
                  <td className="p-6 border">{exec.jobDescription}</td>

                  <td className="p-6 border">
                    <div className="flex flex-row gap-3">
                      <EditExecutive executive={exec} editProfile={editExective} />
                      <DeleteExecutive executive={exec} deleteProfile={deleteExecutive} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Executives;
