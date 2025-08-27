import { useTranslation } from "@/app/i18n";
import FileOpen from "@/components/ui/file-open";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import prisma from "@/db";
import { FILE_MODULE } from "@/lib/enums";
import { PageProps } from "@/types";
import Link from "next/link";
import React from "react";

const Research: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  const researchPaper = await prisma.research.findMany();
  // const departments = await prisma.department.findMany();
  return (
    <div>
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text={t("research").toUpperCase()} />
      </div>
      <div className="flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[600px] border border-collapse">
            <thead>
              <tr>
                <th className="p-4 sm:p-6 font-bold border bg-gray-50 text-center">{lng === "am" ? "ቁጥር" : "No."}</th>
                <th className="p-4 sm:p-6 font-bold border bg-gray-50 text-left">{lng === "am" ? "ርዕስ" : "Title"}</th>
                <th className="p-4 sm:p-6 font-bold border bg-gray-50 text-center">{lng === "am" ? "ድርጊት" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {researchPaper.map((paper, index) => (
                <tr key={index}>
                  <td className="p-3 sm:p-6 border text-center">{index + 1}</td>
                  <td className="p-3 sm:p-6 border">{paper.title}</td>
                  {/* <td className="p-6 border">{departments.find((dept) => dept.id === paper.deptId)?.name}</td> */}
                  {/* <td className="p-6 border">{paper.year.toLocaleDateString()}</td> */}
                  <td className="p-3 sm:p-6 border text-center ">
                    <div className="flex justify-center ">
                      <FileOpen apiUrl={FILE_MODULE.RESEARCH} filePath={JSON.parse(paper.path)?.filePath} />
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
