import { PageProps } from "@/types";
import Link from "next/link";
import React from "react";
import prisma from "@/db";
import { useTranslation } from "@/app/i18n";

async function getServices(language: string = "en") {
  return prisma.service.findMany({
    include: {
      translations: {
        where: { language },
        select: { title: true, summary: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

const ServiceGrid: React.FC<PageProps> = async ({ params }) => {
  const { lng = "en" } = params;
  const services = await getServices(lng);
  const { t } = await useTranslation(lng, "translation");

  return (
    <>
      <div className="flex flex-row w-full mt-20 ">
        {/* <Image src="/assets/imgs/left-wall.png" alt="Line Art" width={200} height={400} /> */}
        {/* <div className="flex-grow "> */}
        <div className="flex flex-col items-center justify-center py-8 w-full">
          <h4 className="text-xl font-bold mb-4 text-primary-main">{t("ourServices")}</h4>
          {/* Our Services */}

          <div className="flex flex-col items-center justify-center  w-10/12 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              {services.map((service, i) => {
                // calculate total rows
                const totalRows = Math.ceil(services.length / 3);
                const col = i % 3;
                const row = Math.floor(i / 3);

                let borders = "";
                if (col < 2) borders += " border-r-2";
                if (row < totalRows - 1) borders += " border-b-2";
                const translation = service.translations[0] || { title: "", summary: "" };

                return (
                  <Link href={`/${lng}/services/${service.slug}`} key={service.id} className={`relative group overflow-hidden h-64${borders}`}>
                    <div className="flex flex-col items-center justify-center h-full">
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt={translation.title} className="w-12 h-12 rounded-full mb-2 object-cover" />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </div>
                      )}
                      <h4 className="text-lg font-bold text-slate-900 p-4">{translation.title}</h4>
                    </div>

                    {/* Hover overlay */}
                    <div className="m-3 shadow-3 absolute inset-0 bg-white translate-y-[110%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center hover:cursor-pointer">
                      {/* Keep title and icon visible on hover */}
                      <div className="flex flex-col items-center justify-center h-full p-1">
                        {service.imageUrl ? (
                          <img src={service.imageUrl} alt={translation.title} className="w-12 h-12 rounded-full mb-2 object-cover" />
                        ) : (
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                          </div>
                        )}
                        <h4 className="text-lg font-bold text-slate-900 ">{translation.title}</h4>
                        <p className="text-center text-sm">{translation.summary}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceGrid;
