import prisma from "@/db";
import Link from "next/link";
import NewResearch from "@/components/NewResearch";
import EditResearch from "@/components/EditResearch";
import DeleteResearch from "@/components/DeleteResearch";
import { revalidatePath } from "next/cache";
import { Research } from "@/types";
const Researches = async () => {
  var researches = await prisma.research.findMany();
  // var researches = await prisma.research.findMany();
  var departments = await prisma.department.findMany();

  async function createResearch(newResearch: Research) {
    "use server";
    try {
      newResearch.year = new Date(newResearch.year); // Convert Year to Date object
      await prisma.research.create({ data: newResearch });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
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
        <NewResearch departments={departments} createResearch={createResearch} />
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
                <td className="p-6 border">{departments.find((dept) => dept.id === research.deptId)?.name}</td>
                <td className="p-6 border">{research.year.toLocaleDateString()}</td>
                <td className="p-6 border">
                  <div className="flex flex-row gap-3">
                    {" "}
                    <Link href={research.path}>
                      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <EditResearch departments={departments} research={{ ...research, deptId: research.deptId ?? 0 }} editResearch={editResearch} />
                    <DeleteResearch research={{ ...research, deptId: research.deptId ?? 0 }} deleteResearch={deleteResearch} />
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
