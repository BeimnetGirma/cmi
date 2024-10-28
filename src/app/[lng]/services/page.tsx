import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Services: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  return (
    <div className="">
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-services.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">{t("services")}</h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              {t("homeLink")}
            </Link>{" "}
            / {t("services")}
          </p>
        </div>
      </div>
      <div className="flex space-x-10 container mx-auto p-10">
        <article className="w-1/2 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg group hover:cursor-pointer">
          <Image
            alt=""
            src="/assets/imgs/lms.png"
            width={764}
            height={510}
            className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-125"
          />
          <div className="relative bg-gradient-to-t from-gray-900/70 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div className="p-4 sm:p-6">
              <Link href="https://ecmi.gov.et" target="_blank">
                <h3 className="mt-0.5 text-lg text-white">
                  {t("lms_service")}
                </h3>
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                {t("lms_service_content")}
              </p>
            </div>
          </div>
        </article>
        <article className="w-1/2 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg hover:cursor-pointer group">
          <Image
            alt=""
            src="/assets/imgs/ems.png"
            width={764}
            height={510}
            className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-125"
          />
          <div className=" relative bg-gradient-to-t from-gray-900/70 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div className="p-4 sm:p-6">
              <Link href="https://ems.gov.et" target="_blank">
                <h3 className="mt-0.5 text-lg text-white">
                  {t("ems_service")}
                </h3>
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                {t("ems_service_content")}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Services;
