import ImageWithTextOverlay from "@/components/image-overlay";
import prisma from "@/db";
import Link from "next/link";
import React from "react";

const Research = async () => {
  const researchPaper = await prisma.research.findMany();
  return (
    <div>
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text="Research" />
      </div>
      <div className="flex flex-col justify-center ">
        
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
