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
            <div className="justify-center text-center mb-10 px-4">
              <h1 className="text-primary-main font-bold text-2xl sm:text-3xl pt-6">{lng === "am" ? executive.departmentName_am : executive.departmentName}</h1>
            </div>

            <div className="flex flex-col lg:flex-row w-full lg:w-5/6 mx-auto gap-8 px-4">
              {/* Left column (Profile) */}
              <div className="flex flex-col items-center lg:w-1/4 lg:border-r border-gray-300 lg:pr-8">
                <Image className="rounded-full p-4" src={executive?.imagePath || "/default/path/to/image.png"} alt="Department Head Photo" width={250} height={250} />
                <h1 className="text-center mt-4 text-lg sm:text-xl">{lng === "am" ? executive.headName_am : executive.headName}</h1>
                <h2 className="text-slate-400 font-light text-base sm:text-lg text-center">{lng === "am" ? executive.headTitle_am : executive.headTitle}</h2>
              </div>

              {/* Right column (Duties) */}
              <div className="flex flex-col lg:w-3/4">
                <h1 className="text-slate-600 font-semibold text-xl sm:text-2xl mb-4">{lng === "am" ? "የስራ መደብ" : "Department Duties"}</h1>
                <div
                  className="text-slate-600 text-justify text-base sm:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(lng === "am" ? executive.dutiesDescription_am || "" : executive.dutiesDescription),
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExecutivePage;
