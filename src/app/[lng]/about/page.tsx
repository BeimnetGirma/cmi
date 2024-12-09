import ClientsSlider from "@/components/ui/clients-slider";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";

const AboutUs: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  const boxes = [
    {
      title: t("mission"),
      content: t("missionDetail") === "missionDetail" ? "" : t("missionDetail"),
    },
    {
      title: t("vision"),
      content: t("visionDetail") === "visionDetail" ? "" : t("visionDetail"),
    },
    {
      title: t("values"),
      content: t("valuesDetail") === "valuesDetail" ? "" : t("valuesDetail"),
    },
  ];

  return (
    <div className="">
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">{t("aboutUs")}</h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              {t("home").toUpperCase()}
            </Link>{" "}
            / {t("about").toUpperCase()}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center py-20">
          <h1 className="text-primary-main text-xl md:text-xl font-bold text-center">
            {t("background").toUpperCase()}
          </h1>
          <div className="flex justify-center p-10">
            <p className="text-lg text-slate-800 w-1/2 text-justify ">
              {t("backgroundContent")}
            </p>
          </div>
        </div>
      </div>
      {boxes[0].content !== "" && (
        <div className="py-20">
          <div className="grid grid-cols-3 gap-x-10 text-center container mx-auto ">
            {boxes.map((box, index) => (
              <div
                key={index}
                className="flex flex-col items-center border-2 border-primary-light p-5 rounded-lg"
              >
                <h4 className="font-semibold text-primary-main text-xl border-b-2 border-primary-main pb-2 ">
                  {box.title}
                </h4>
                <p className="text-justify">{box.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
