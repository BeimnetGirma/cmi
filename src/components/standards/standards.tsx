import prisma from "@/db";
import NewStandard from "@/components/standards/new-standard";
import { revalidatePath } from "next/cache";
import { Standard as IStandard } from "@/types";
import EditStandard from "@/components/standards/edit-standards";
import DeleteStandard from "@/components/standards/delete-standards";
import { FILE_MODULE } from "@/lib/enums";
import FileOpen from "../ui/file-open";

export async function createStandard(newStandard: IStandard) {
  "use server";
  try {
    await prisma.manual.create({ data: newStandard });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
const Standard = async () => {
  const standard = await prisma.manual.findMany();

  async function editStandard(standard: IStandard) {
    "use server";
    try {
      await prisma.manual.update({
        where: { id: standard.id },
        data: {
          title: standard.title,
          path: standard.path,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteStandard(standardId: string) {
    "use server";
    try {
      await prisma.manual.delete({
        where: { id: standardId },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center ">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Standard Manuals</h1>
      </div>

      <div className="justify-end px-52">
        <NewStandard createStandard={createStandard} />
        <table className="table-auto mx-auto w-full my-4 border border-collapse ">
          <thead>
            <tr>
              <th className="p-6 font-bold border">Title</th>
              <th className="p-6 font-bold border">File Name</th>
              <th className="p-6 font-bold border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {standard.map((standard) => (
              <tr key={standard.id}>
                <td className="p-6 border">{standard.title}</td>
                <td className="p-6 border">{JSON.parse(standard.path)?.originalName}</td>
                <td className="p-6 border">
                  <div className="flex flex-row gap-3">
                    {" "}
                    <FileOpen apiUrl={FILE_MODULE.STANDARD} filePath={JSON.parse(standard.path)?.filePath} />
                    <EditStandard standard={standard} editStandard={editStandard} />
                    <DeleteStandard standard={standard} deleteStandard={deleteStandard} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standard;
