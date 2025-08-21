"use client";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "translation");
  const globalKeys = ["phoneNumber", "emailAddress", "googleAddress"];
  const [footerData, setFooterData] = useState<{ quickLinks: any[]; serviceLinks: any[]; phoneNumber: string; emailAddress: string; googleAddress: string } | null>(null);
  const [quickLinksDetails, setQuickLinksDetails] = useState<string[]>([]);
  const [serviceLinksDetails, setServiceLinksDetails] = useState<string[]>([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const [langResponse, globalResponse] = await Promise.all([fetch("/api/" + lng), fetch("/api/en")]);

        const langData = await langResponse.json();
        const globalData = await globalResponse.json();

        const mergedData = { ...langData, ...pick(globalData, globalKeys) };

        const linksRaw: string = langData.quickLinks || "";
        setQuickLinksDetails(
          linksRaw
            .split("\n")
            .map((link) => link.trim())
            .filter((line) => line.length > 0)
        );

        const serviceLinksRaw: string = langData.serviceLinks || "";
        setServiceLinksDetails(
          serviceLinksRaw
            .split("\n")
            .map((link) => link.trim())
            .filter((line) => line.length > 0)
        );
        setFooterData(mergedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFooterData();
  }, []);
  return (
    <footer>
      <div className="w-full">
        <Image width={50} height={50} className="w-full" src="/assets/imgs/footer-line-art.svg" alt="Footer Image" />
      </div>

      <div className="bg-primary-main text-white p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-6 items-start">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center space-x-2 ">
              <Image src="/assets/imgs/logo.png" alt="Logo" width={130} height={130} className="max-w-full h-auto" />
            </Link>
          </div>

          {/* About us */}
          {/* <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("aboutUs")}</h3>
            <p className="text-sm text-slate-200 py-2">{t("aboutUsFooter")}</p>
          </div> */}

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("quickLinks")}</h3>
            <ul className="text-sm text-slate-200 flex flex-col space-y-2">
              {quickLinksDetails.map((link, idx) => (
                <li key={idx}>
                  <span dangerouslySetInnerHTML={{ __html: link }} />
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-semibold mb-1">{t("services")}</h3>
            <ul className="text-sm text-slate-200 flex flex-col space-y-2">
              {serviceLinksDetails.map((link, idx) => (
                <li key={idx}>
                  <span dangerouslySetInnerHTML={{ __html: link }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact us */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("contactUs")}</h3>
            <ul className="text-sm text-slate-200 flex flex-col space-y-2">
              <li className="flex justify-center sm:justify-start items-center space-x-2">
                <Image width={20} height={20} src={"/assets/icons/phone-white.svg"} alt="Phone Icon" />
                <a>{footerData?.phoneNumber}</a>
              </li>
              <li className="flex justify-center sm:justify-start items-center space-x-2">
                <Image width={20} height={20} src={"/assets/icons/email-white.svg"} alt="Email Icon" />
                <a href={`mailto:${footerData?.emailAddress}`}>{footerData?.emailAddress}</a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("followUs")}</h3>
            <div className="flex justify-center sm:justify-start gap-5 pt-3">
              <Link href="https://www.facebook.com/ECPMI/">
                <Image width={28} height={28} src={"/assets/icons/facebook-white.svg"} alt="Facebook Icon" />
              </Link>
              <Link href="https://t.me/Construction_Management_Institue">
                <Image width={28} height={28} src={"/assets/icons/telegram-white.svg"} alt="Telegram Icon" />
              </Link>
              <Link href="http://www.youtube.com/@constructionmanagementinst-h1j">
                <Image width={28} height={28} src={"/assets/icons/youtube-white.svg"} alt="Youtube Icon" />
              </Link>
            </div>
          </div>
          <div className="h-40 md:h-64 w-full">
            <h3 className="text-sm font-semibold mb-1">{t("address")}</h3>
            <div className="w-full h-32 md:h-56 rounded overflow-hidden">
              <iframe
                src={footerData?.googleAddress}
                width="100%"
                height="100%"
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
function pick(globalData: any, globalKeys: string[]) {
  const result: any = {};
  for (const key of globalKeys) {
    if (key in globalData) {
      result[key] = globalData[key];
    }
  }
  return result;
}
export default Footer;
