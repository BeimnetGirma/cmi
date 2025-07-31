"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Executive } from "@prisma/client";
import DOMPurify from "dompurify";

interface ExecutivePageProps {
  params: {
    lng: string;
  };
}

const ExecutivePage = ({ params }: ExecutivePageProps) => {
  const { lng = "en" } = params;
  const execId: any = useSearchParams().get("exec");
  const [executive, setExecutive] = useState<Executive>();
  const pathname = usePathname();

  useEffect(() => {
    if (execId) {
      const fetchExecutives = async () => {
        const res = await fetch(`/api/executives/${execId}`);
        const data = await res.json();
        var e = data;

        setExecutive(e);
      };
      fetchExecutives();
    }
  }, [execId]);

  return (
    <>
      <div className="pt-8 mt-20">
        {executive && (
          <>
            <div className="justify-center text-center  mb-10">
              <h1 className="text-primary-main font-bold text-3xl ml-28 pt-6">{lng === "am" ? executive.departmentName_am : executive.departmentName}</h1>
            </div>
            <div className="flex w-5/6 m-auto">
              <div className="flex-col w-1/4 border-r border-gray-300 mr-20">
                {" "}
                <div className="flex-row justify-center ">
                  <Image
                    className="m-auto rounded-full p-4"
                    src={executive?.imagePath || "/default/path/to/image.png"}
                    alt="Department Head Photo"
                    width={350}
                    height={350}
                  ></Image>
                </div>
                <div className="flex-row">
                  <h1 className="text-center mt-5">{lng === "am" ? executive.headName_am : executive.headName}</h1>
                  <h1 className="text-slate-400 font-light text-lg -mt-6 text-center"> {lng === "am" ? executive.headTitle_am : executive.headTitle} </h1>
                </div>
              </div>
              <div className="flex-col w-3/4">
                <div className="flex-row">
                  <h1 className="text-slate-600 font-semibold text-2xl">{lng === "am" ? "የስራ መደብ" : "Department Duties"} </h1>
                  <div
                    className="text-slate-600 text-justify text-lg"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(lng === "am" ? (executive.dutiesDescription_am ? executive.dutiesDescription_am : "") : executive.dutiesDescription),
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExecutivePage;
