import ImageWithTextOverlay from "@/components/image-overlay";
import prisma from "@/db";
import Link from "next/link";
import React from "react";

const Standards = async () => {
  const manuals = await prisma.manual.findMany();

  return (
    <div>
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text="Standards" />
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
              {manuals.map((manual, index) => (
                <tr key={index}>
                  <td className="p-6 border">{index + 1}</td>
                  <td className="p-6 border">{manual.title}</td>

                  <td className="p-6 border">
                    <div className="flex  justify-center">
                      <Link href={manual.path}>
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
