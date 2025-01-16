import FileOpen from "@/components/ui/file-open";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import prisma from "@/db";
import { FILE_MODULE } from "@/lib/enums";
import Link from "next/link";
import React from "react";

const Research = async () => {
  const researchPaper = await prisma.research.findMany();
  // const departments = await prisma.department.findMany();
  return (
    <div>
      <div className="w-full">
        <ImageWithTextOverlay
          imgUrl="/assets/imgs/header-services.svg"
          width={1920}
          height={500}
          text="Research"
        />
      </div>
      <div className="flex flex-col justify-center ">
        <div className="justify-end px-52">
          <table className="table-auto mx-auto w-full my-4 border border-collapse ">
            <thead>
              <tr>
                <th className="p-6 font-bold border">No.</th>
                <th className="p-6 font-bold border">Title</th>
                {/* <th className="p-6 font-bold border">Department</th>
                <th className="p-6 font-bold border">Year</th> */}
                <th className="p-6 font-bold border">View</th>
              </tr>
            </thead>
            <tbody>
              {researchPaper.map((paper, index) => (
                <tr key={index}>
                  <td className="p-6 border">{index + 1}</td>
                  <td className="p-6 border">{paper.title}</td>
                  {/* <td className="p-6 border">{departments.find((dept) => dept.id === paper.deptId)?.name}</td> */}
                  {/* <td className="p-6 border">{paper.year.toLocaleDateString()}</td> */}
                  <td className="p-6 border ">
                    <div className="flex justify-center ">
                      <FileOpen
                        apiUrl={FILE_MODULE.RESEARCH}
                        filePath={JSON.parse(paper.path)?.filePath}
                      />
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

export default Research;
