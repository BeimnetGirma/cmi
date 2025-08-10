import prisma from "@/db";
import { notFound } from "next/navigation";
import { useTranslation } from "@/app/i18n";
import Link from "next/link";

interface ServicePageProps {
  params: {
    lng: string;
    slug: string;
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lng, slug } = params;
  const { t } = await useTranslation(lng, "translation");

  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { language: lng },
        select: { title: true, summary: true, content: true },
      },
      subservices: {
        orderBy: { order: "asc" },
        include: {
          translations: {
            where: { language: lng },
            select: { title: true, description: true },
          },
        },
      },
    },
  });

  if (!service) return notFound();

  const translation = service.translations[0];
  if (!translation) return notFound();

  return (
    <>
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-services.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">{t("services")}</h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              {t("home").toUpperCase()}
            </Link>{" "}
            / {t("services").toUpperCase()}
          </p>
        </div>
      </div>
      <div className="w-10/12 mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-primary-main">{translation.title}</h1>
        {translation.summary && <p className="mb-6 text-slate-600 italic ">{translation.summary}</p>}

        {translation.content && (
          <div
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{
              __html: typeof translation.content === "string" ? translation.content : "", // ensure it's a string
            }}
          />
        )}

        <h2 className="text-2xl font-semibold mb-4 text-primary-main">{t("subServices")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.subservices.map((sub) => {
            const subT = sub.translations[0];
            return (
              <a key={sub.id} href={sub.link ? sub.link : ""} target="_blank" rel="noopener noreferrer">
                <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-xl font-semibold">{subT?.title}</h3>
                  {subT?.description && <p className="text-sm text-gray-600 mt-2">{subT.description}</p>}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
