import prisma from "@/db";
import NewResearch from "@/components/research/new-research";
import EditResearch from "@/components/research/edit-research";
import DeleteResearch from "@/components/research/delete-research";
import { revalidatePath } from "next/cache";
import { Research } from "@/types";
import FileOpen from "../ui/file-open";
export async function createResearch(newResearch: Research) {
  "use server";
  try {
    newResearch.year = new Date(newResearch.year); // Convert Year to Date object
    await prisma.research.create({ data: newResearch });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
const Researches = async () => {
  const researches = await prisma.research.findMany();
  const departments = await prisma.department.findMany();

  async function editResearch(research: Research) {
    "use server";
    try {
      await prisma.research.update({
        where: { id: research.id },
        data: {
          title: research.title,
          deptId: research.deptId,
          year: research.year,
          path: research.path,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteResearch(researchId: number) {
    "use server";
    try {
      await prisma.research.delete({
        where: { id: researchId },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center ">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Research Papers</h1>
      </div>

      <div className="justify-end px-52">
        <NewResearch
          departments={departments}
          createResearch={createResearch}
        />
        <table className="table-auto mx-auto w-full my-4 border border-collapse ">
          <thead>
            <tr>
              <th className="p-6 font-bold border">Id</th>
              <th className="p-6 font-bold border">Title</th>
              <th className="p-6 font-bold border">Department</th>
              <th className="p-6 font-bold border">Year</th>
            </tr>
          </thead>
          <tbody>
            {researches.map((research, index) => (
              <tr key={index}>
                <td className="p-6 border">{research.id}</td>
                <td className="p-6 border">{research.title}</td>
                <td className="p-6 border">
                  {
                    departments.find((dept) => dept.id === research.deptId)
                      ?.name
                  }
                </td>
                <td className="p-6 border">
                  {research.year.toLocaleDateString()}
                </td>
                <td className="p-6 border">
                  <div className="flex flex-row gap-3">
                    {" "}
                    <FileOpen
                      apiUrl="research"
                      filePath={JSON.parse(research.path)?.filePath}
                    />
                    <EditResearch
                      departments={departments}
                      research={{ ...research, deptId: research.deptId ?? 0 }}
                      editResearch={editResearch}
                    />
                    <DeleteResearch
                      research={{ ...research, deptId: research.deptId ?? 0 }}
                      deleteResearch={deleteResearch}
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

export default Researches;
