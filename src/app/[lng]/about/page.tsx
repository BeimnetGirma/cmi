import ClientsSlider from "@/components/clients-slider";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";
import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";

const AboutUs: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "");
  return (
    <div className="pt-8 mt-20">
      <div className="relative h-80 md:h-80 bg-auto bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">ABOUT US</h1>
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
            PROVIDING THE BEST QUALITY SERVICES AND CONSTRUCTIONS
          </h1>
          <div className="flex justify-center p-10">
            <p className="text-sm text-slate-800 w-1/3 text-center">
              We provide a digital system designed specifically for the building
              and construction industry. Our system streamlines and digitizes
              daily operations through efficient project management, deviation
              tracking, time recording, and procedural enhancements, making your
              work easier.
            </p>
          </div>
          <div className="relative z-10 h-80 md:h-80 bg-contain bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/aboutus1.svg')]"></div>
        </div>
      </div>
      <div className="pb-20">
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          OUR CLIENTS
        </h2>
        <ClientsSlider />
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          MEET THE TEAM
        </h2>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/assets/imgs/team1.svg"
            alt="Team"
            width={1000}
            height={500}
          />
          <Image
            src="/assets/imgs/team2.svg"
            alt="Team"
            width={1000}
            height={500}
          />
        </div>
      </div>
      <div className="p-2">
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          CLIENT REVIEWS
        </h2>
        <div className="flex flex-col justify-center items-center">
          <hr className="border-t-4 border-primary-main w-1/3 my-8" />
          <blockquote className="text-sm text-slate-800 w-1/3 text-center p-4">
            I recently had the privilege of working with Salus Stillas Solutions
            for a construction project, and I cant express how impressed I am
            with their services. From the moment we reached out for a quote to
            the completion of the project, they demonstrated an unparalleled
            level of professionalism, expertise, and commitment to safety. First
            and foremost, their scaffolding setup was impeccable. The team at
            Salus Stillas Solutions ensured that our construction site was not
            only accessible but also secure. Their attention to detail in
            assembling and inspecting the scaffolding was truly commendable,
            guaranteeing the safety of everyone on-site.
          </blockquote>
          <Image
            src="/assets/imgs/reviews.svg"
            alt="Team"
            width={800}
            height={500}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
