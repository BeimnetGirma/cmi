import { useTranslation } from "@/app/i18n";
import FileOpen from "@/components/ui/file-open";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import prisma from "@/db";
import { FILE_MODULE } from "@/lib/enums";
import { PageProps } from "@/types";
import Link from "next/link";
import React from "react";

const Standards: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  const manuals = await prisma.manual.findMany();

  return (
    <div>
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text={t("standards").toUpperCase()} />
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
              {manuals.map((manual, index) => (
                <tr key={index}>
                  <td className="p-6 border">{index + 1}</td>
                  <td className="p-6 border">{manual.title}</td>

                  <td className="p-6 border">
                    <div className="flex  justify-center">
                      <FileOpen apiUrl={FILE_MODULE.STANDARD} filePath={JSON.parse(manual.path)?.filePath} />
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

export default Standards;
