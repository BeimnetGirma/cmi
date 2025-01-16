import FileOpen from "@/components/ui/file-open";
import ImageWithTextOverlay from "@/components/ui/image-overlay";
import prisma from "@/db";
import { FILE_MODULE } from "@/lib/enums";
import React from "react";

const Magazine = async () => {
  const magazines = await prisma.magazine.findMany();
  return (
    <>
      <div>
        <div className="w-full">
          <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text="Magazine" />
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
                {magazines.map((magazine, index) => (
                  <tr key={index}>
                    <td className="p-6 border">{index + 1}</td>
                    <td className="p-6 border">{magazine.title}</td>

                    <td className="p-6 border">
                      <div className="flex  justify-center">
                        <FileOpen apiUrl={FILE_MODULE.MAGAZINE} filePath={JSON.parse(magazine.path)?.filePath} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Magazine;
