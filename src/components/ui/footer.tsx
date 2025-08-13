"use client";
import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC<PageProps> = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "translation");
  return (
    <footer>
      <div className="w-full">
        <Image width={50} height={50} className="w-full" src="/assets/imgs/footer-line-art.svg" alt="Footer Image" />
      </div>

      <div className="bg-primary-main text-white p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/assets/imgs/logo.png" alt="Logo" width={130} height={130} className="max-w-full h-auto" />
            </Link>
          </div>

          {/* About us */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("aboutUs")}</h3>
            <p className="text-sm text-slate-200 py-2">{t("aboutUsFooter")}</p>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("services")}</h3>
            <ul className="text-sm text-slate-200 flex flex-col space-y-2">
              <li>{t("lms_service")}</li>
              <li>{t("ems_service")}</li>
            </ul>
          </div>

          {/* Contact us */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("contactUs")}</h3>
            <ul className="text-sm text-slate-200 flex flex-col space-y-2">
              <li className="flex justify-center sm:justify-start items-center space-x-2">
                <Image width={20} height={20} src={"/assets/icons/phone-white.svg"} alt="Phone Icon" />
                <a href="tel:+25111575633">+251 115 575 633</a>
              </li>
              <li className="flex justify-center sm:justify-start items-center space-x-2">
                <Image width={20} height={20} src={"/assets/icons/email-white.svg"} alt="Email Icon" />
                <a href="mailto:info@cmi.gov.et">info@cmi.gov.et</a>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold mb-1">{t("followUs")}</h3>
            <div className="flex justify-center sm:justify-start gap-3 pt-3">
              <Link href="https://www.facebook.com/ECPMI/">
                <Image width={28} height={28} src={"/assets/icons/facebook-white.svg"} alt="Facebook Icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
