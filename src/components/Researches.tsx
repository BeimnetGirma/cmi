import prisma from "@/db";
import Link from "next/link";

const Researches = async () => {
  const researchPapers = [
    { researchId: "001", title: "Paper 1", department: "Computer Science", year: 2021 },
    { researchId: "002", title: "Paper 2", department: "Electrical Engineering", year: 2020 },
    { researchId: "003", title: "Paper 3", department: "Mechanical Engineering", year: 2019 },
  ];
  const researchPaper = await prisma.research.findMany();

  return (
    <div className="flex flex-col justify-center ">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Research Papers</h1>
      </div>
      <div className="justify-end px-52">
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
            {researchPaper.map((paper, index) => (
              <tr key={index}>
                <td className="p-6 border">{paper.Research_Id}</td>
                <td className="p-6 border">{paper.Title}</td>
                <td className="p-6 border">{paper.Department}</td>
                <td className="p-6 border">{paper.Year.toLocaleDateString()}</td>
                <td className="p-6 border">
                  <div className="flex flex-row gap-3">
                    {" "}
                    <Link href={"https://pdfobject.com/pdf/sample.pdf"}>
                      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                    <Link href={""}>
                      <svg
                        className="h-8 w-8 text-yellow-500"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {" "}
                        <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /> <line x1="16" y1="5" x2="19" y2="8" />
                      </svg>
                    </Link>
                    <svg
                      className="h-8 w-8 text-red-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="7" x2="20" y2="7" /> <line x1="10" y1="11" x2="10" y2="17" />{" "}
                      <line x1="14" y1="11" x2="14" y2="17" /> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
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
