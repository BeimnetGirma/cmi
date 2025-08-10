// components/StatsCard.tsx
"use client";

import { PageProps } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "@/app/i18n/client";

interface StatsCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
}
const StatsCard: React.FC<PageProps & StatsCardProps> = ({ title, value, icon }, params: { lng: string }) => {
  const { lng = "en" } = params;
  const { t } = useTranslation(lng, "translation");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // ms
    const stepTime = Math.abs(Math.floor(duration / value));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
      {icon && <div className="mb-3 text-slate-200">{icon}</div>}
      <span className="text-3xl font-bold text-primary-main">{count.toLocaleString()}</span>
      <p className="text-gray-600 mt-2">{t(title.toLowerCase())}</p>
    </div>
  );
};
export default StatsCard;
