import { useTranslation } from "@/app/i18n";
import ServiceGrid from "@/components/ui/service-grid";
import prisma from "@/db";
import { PageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Services: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  // const services = await prisma.service.findMany();
  return (
    <div>
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
      <ServiceGrid params={{ lng }} />
    </div>
  );
};

export default Services;
