import prisma from "@/db";
import NewStandard from "@/components/standards/new-standard";
import { revalidatePath } from "next/cache";
import { Standard as IStandard } from "@/types";
import FileOpen from "../research/file-open";
import EditStandard from "@/components/standards/edit-standards";
import DeleteStandard from "@/components/standards/delete-standards";

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
  async function deleteStandard(standardId: number) {
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
              <th className="p-6 font-bold border">Id</th>
              <th className="p-6 font-bold border">Title</th>
            </tr>
          </thead>
          <tbody>
            {standard.map((standard, index) => (
              <tr key={index}>
                <td className="p-6 border">{standard.id}</td>
                <td className="p-6 border">{standard.title}</td>
                <td className="p-6 border">
                  <div className="flex flex-row gap-3">
                    {" "}
                    <FileOpen filePath={JSON.parse(standard.path)?.filePath} />
                    <EditStandard
                      standard={standard}
                      editStandard={editStandard}
                    />
                    <DeleteStandard
                      standard={{ ...standard }}
                      deleteStandard={deleteStandard}
                    />
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
