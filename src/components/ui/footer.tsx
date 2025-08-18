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
              <li>
                <a href="https://ecmi.gov.et">{t("mui")}</a>
              </li>
            </ul>
            <h3 className="text-sm font-semibold mb-1">{t("services")}</h3>
            <ul className="text-sm text-slate-200 flex flex-col space-y-2">
              <li>
                <a href="https://ecmi.gov.et">{t("lms_service")}</a>
              </li>
              <li>
                <a href="https://ems.gov.et">{t("ems_service")}</a>
              </li>
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
                <a href="mailto:cmi@ecmi.gov.et">info@cmi.gov.et</a>
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
            </div>
          </div>
          <div className="h-40 md:h-64 w-full">
            <h3 className="text-sm font-semibold mb-1">{t("address")}</h3>
            <div className="w-full h-32 md:h-56 rounded overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7019042305424!2d38.7715864!3d8.9995531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85881816c1f5%3A0x6f851054ffb4a16f!2sEthiopian%20Construction%20Management%20Institute!5e0!3m2!1sen!2set!4v1755256564027!5m2!1sen!2set"
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

export default Footer;
