import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";

const AboutUs: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  const powersAndDuties = t("powerAndDutiesDetail.details", { returnObjects: true });
  const boxes = [
    {
      title: t("mission"),
      content: t("missionContent"),
    },
    {
      title: t("vision"),
      content: t("visionContent"),
    },
    {
      title: t("values"),
      content: t("valuesContent"),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="relative h-60 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header.svg')]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="text-center z-10 px-4">
          <h1 className="text-lg md:text-3xl font-bold">{t("aboutUs")}</h1>
          <p className="text-xs md:text-lg pt-2">
            <Link href={"/"} className="hover:text-slate-300">
              {t("home").toUpperCase()}
            </Link>{" "}
            / {t("about").toUpperCase()}
          </p>
        </div>
      </div>

      {/* Boxes Section */}
      {boxes[0].content !== "" && (
        <div className="pt-10 md:pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center container mx-auto px-4">
            {boxes.map((box, index) => (
              <div
                key={index}
                className="flex flex-col items-center border-2 border-primary-light p-5 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-primary-light"
              >
                <h4 className="font-semibold text-primary-main text-lg md:text-xl border-b-2 border-primary-main pb-2">{box.title}</h4>
                <p className="text-justify text-sm md:text-base mt-3">{box.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Background Section */}
      <div className="flex flex-col justify-center pt-16 px-4">
        <h1 className="text-primary-main text-lg md:text-xl font-bold text-center">{t("backgroundTitle").toUpperCase()}</h1>
        <div className="flex justify-center pb-10">
          <div className="text-sm md:text-lg text-slate-800 w-full md:w-3/4 lg:w-1/2 text-justify">
            <p>{t("backgroundContent")}</p>
          </div>
        </div>

        {/* Powers & Duties Section */}
        <h1 className="text-primary-main text-lg md:text-xl font-bold text-center">{t("powerAndDutiesTitle").toUpperCase()}</h1>
        <div className="flex justify-center p-4 md:p-10">
          <div className="text-sm md:text-lg text-slate-800 w-full md:w-3/4 lg:w-1/2 text-justify">
            <p>{t("powerAndDutiesContent")}</p>
            <ol className="p-4 list-decimal text-justify">
              {Array.isArray(powersAndDuties) &&
                powersAndDuties.map((item, index) => (
                  <li className="text-sm md:text-lg my-4 text-slate-800" key={index}>
                    {item}
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
