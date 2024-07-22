import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";
import React from "react";

const Standards: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");

  return (
    <div className="min-h-screen grid place-content-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-3xl font-semibold">{t("standards")}</div>
      </div>
    </div>
  );
};

export default Standards;
