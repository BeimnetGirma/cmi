import FileOpen from "@/components/ui/file-open";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import prisma from "@/db";
import { FILE_MODULE } from "@/lib/enums";
import React from "react";
import { FC } from "react";
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Resources: FC<PageProps> = async ({ searchParams }) => {
  const type = typeof searchParams.type === "string" ? searchParams.type : "";
  const resources = await prisma.resource.findMany({
    where: {
      type: type,
    },
  });
  return (
    <div>
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text={type} />
      </div>
      <div className="flex flex-col justify-center ">
        <div className="justify-end px-52">
          <table className="table-auto mx-auto w-full my-4 border border-collapse ">
            <thead>
              <tr>
                <th className="p-6 font-bold border">No.</th>
                <th className="p-6 font-bold border">Title</th>
                <th className="p-6 font-bold border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={index}>
                  <td className="p-6 border">{index + 1}</td>
                  <td className="p-6 border">{resource.title}</td>

                  <td className="p-6 border">
                    <div className="flex  justify-center">
                      <FileOpen apiUrl={FILE_MODULE.RESOURCE} filePath={JSON.parse(resource.path)?.filePath} />
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

export default Resources;
