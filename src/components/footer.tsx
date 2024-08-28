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
        <Image
          width={50}
          height={50}
          className="w-full"
          src="/assets/imgs/footer-line-art.svg"
          alt="Footer Image"
        />
      </div>
      <div className="bg-primary-light  text-white p-8">
        <div className="grid xs:grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          <div className="flex flex-col items-center ">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/imgs/logo.png"
                alt="Logo"
                width={130}
                height={130}
              />
            </Link>
          </div>
          {/* About us */}
          <div className="flex flex-col py-2">
            <h3 className="text-sm text-secondary-main font-semibold mb-1 ">
              {t("aboutUs")}
            </h3>
            <div className=" text-sm text-secondary-light">
              {t("aboutUsFooter")}
            </div>
          </div>
          {/* Services */}
          <div>
            <h3 className="text-sm text-secondary-main font-semibold mb-1">
              {t("services")}
            </h3>
            <ul className="text-sm text-secondary-light flex flex-col space-y-2">
              <li>{t("preConstructionPhase")}</li>
              <li>{t("constructionPhase")}</li>
              <li>{t("postConstructionPhase")}</li>
            </ul>
          </div>
          {/* Contact us */}
          <div>
            <h3 className="text-sm text-secondary-main font-semibold mb-1">
              {t("contactUs")}
            </h3>
            <ul className="text-sm text-secondary-light flex flex-col space-y-2">
              <li className="flex space-x-4">
                <Image
                  width={20}
                  height={20}
                  src={"assets/icons/phone.svg"}
                  alt="Phone Icon"
                />
                <a href="tel:+25111575633">+251 115 575 633</a>
              </li>
              <li className="flex space-x-4">
                <Image
                  width={20}
                  height={20}
                  src={"assets/icons/mail.svg"}
                  alt="Phone Icon"
                />
                <a href="mailto:info@cmi.gov.et">info@cmi.gov.et</a>
              </li>
            </ul>
          </div>
          {/* Follow us */}
          <div>
            <div className="text-sm text-secondary-main font-semibold mb-1">
              FOLLOW US
            </div>
            <div className="flex text-secondary-light grid-cols-1 md:grid-cols-3 gap-3 pt-3">
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <Link href={"https://www.facebook.com/ECPMI/"}>
                  <Image
                    width={16}
                    height={16}
                    src={"assets/icons/facebook.svg"}
                    alt="Phone Icon"
                  />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
