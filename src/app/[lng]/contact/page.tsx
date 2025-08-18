import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";
import Link from "next/link";

const Contact: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-contact.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm px-2">
          <h1 className="text-xl md:text-3xl font-bold">{t("contactActionCall").toUpperCase()}</h1>
          <p className="text-sm md:text-lg pt-2">
            <Link href={"/"} className="hover:text-slate-300">
              {t("home").toUpperCase()}
            </Link>{" "}
            / {t("contactUs").toUpperCase()}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-primary-main text-center pt-10">{t("contactUs").toUpperCase()}</h2>
        <div className="flex flex-col items-center justify-center mt-8 w-full md:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-3 border rounded-lg shadow-lg overflow-hidden w-full">
            {/* Call Us */}
            <div className="p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t("callUs")}</h4>
              <p className="text-center text-sm mt-2">+251 115 575 633</p>
            </div>

            {/* Email Us */}
            <div className="p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t("emailUs")}</h4>
              <p className="text-center text-sm mt-2">cmi@ecmi.gov.et</p>
            </div>

            {/* Locate Us */}
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t("locateUs")}</h4>
              <p className="text-center text-sm mt-2">{t("officeAddress")}</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-8">
            <h3 className="text-xl font-bold text-primary-main text-center pt-10">{t("address")}</h3>
            <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl aspect-video mt-4 rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7019042305424!2d38.7715864!3d8.9995531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85881816c1f5%3A0x6f851054ffb4a16f!2sEthiopian%20Construction%20Management%20Institute!5e0!3m2!1sen!2set!4v1755256564027!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-60 md:h-96"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
