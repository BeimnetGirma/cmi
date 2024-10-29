import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { PageProps } from "@/types";
import { useTranslation } from "../i18n";

const Custom404: React.FC<PageProps> = async ({
  params = {},
}: {
  params: { lng?: string };
}) => {
  const { lng = "en" } = params;
  const { t } = await useTranslation(lng, "translation");
  return (
    <>
      <div className="flex flex-col items-center pt-40">
        <Image src="/assets/imgs/404.png" alt="404" width={600} height={700} />
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          {t("notFound")}
        </h2>
        <p className="text-center text-sm mb-4">{t("notFoundContent")}</p>
        <Link
          href={"/"}
          className="bg-primary-main  hover:bg-blue-900 rounded-md transition-colors text-white px-4 py-2 mt-2"
        >
          Go Home
        </Link>
      </div>

      <Footer params={{ lng }} />
    </>
  );
};

export default Custom404;
