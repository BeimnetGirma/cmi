import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { PageProps } from "@/types";

const AboutUs: React.FC<PageProps> = async ({ params: { lng } }) => {
  const { t } = await useTranslation(lng, "translation");
  const boxes = [
    {
      title: t("mission"),
      content: t("missionContent"),
    },
    {
      title: t("vision"),
      content: t("visionContent"),
    },
    {
      title: t("values"),
      content: t("valuesContent"),
    },
  ];

  return (
    <div className="">
      <div className="relative h-80 md:h-80 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header.svg')]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
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
      {boxes[0].content !== "" && (
        <div className="py-20">
          <div className="grid grid-cols-3 gap-x-10 text-center container mx-auto ">
            {boxes.map((box, index) => (
              <div
                key={index}
                className="flex flex-col items-center border-2 border-primary-light p-5 rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-primary-light"
              >
                <h4 className="font-semibold text-primary-main text-xl border-b-2 border-primary-main pb-2">
                  {box.title}
                </h4>
                <p className="text-justify">{box.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="flex flex-col justify-center py-20">
          <h1 className="text-primary-main text-xl md:text-xl font-bold text-center">
            {t("background").toUpperCase()}
          </h1>
          <div className="flex justify-center p-10">
            <div className="text-lg text-slate-800 w-1/2 text-justify">
              <p>
                የኢንስቲትዩቱ ሥልጣንና ተግባር ለኢንስቲትዩቱ በማቋቋሚያ ደንቡ የተሰጡት ዋና ዋና ሥልጣንና
                ተግባራት፡-
              </p>
              <p>
                1. ተወዳዳሪ የሆነ ሀገራዊ የኮንስትራክሽን ፕሮጀክት ማኔጅመንት አቅም ለመገንባት የሚረዱ የፖሊሲ
                ሀሳቦችን፣ ስትራቴጂዎችንና መርሀ-ግብሮችን ማመንጨት እና በመንግሥት ሲፈቀዱም ተግባራዊ ማድረግ፣
              </p>
              <p>
                2. የኮንስትራክሽን ፕሮጀክት ማኔጅመንት ክፍተቶችን በመለየት ተግባር ተኮር ሥልጠናዎችን ከሚመለከታቸው
                አካላት ጋር በመተባበር መስጠት፣
              </p>
              <p>
                3. በኮንስትራክሽን ፕሮጀክቶች ማኔጅመንት ለሚሠማሩ ባለሙያዎች ዓለም ዓቀፍ ደረጃውን የጠበቀ የሙያ
                ብቃት ማረጋገጫ የምስክር ወረቀት አሰጣጥ ሥርዓት እንዲኖር እና ብቃትና ክህሎት ላይ የተመሠረተ የሥራ
                ሥምሪት ተግባራዊ እንዲደረግ ሁኔታዎችን ማመቻቸት፣
              </p>
              <p>
                4. የቴክኖሎጂ አቅም እንዲፈጠርና እንዲሸጋገር የሚያስችሉ የኮንስትራክሽን ፕሮጀክት ማኔጅመንት
                ዘዴዎችን በመለየት በኢንዱስትሪው ውስጥ የማስረጽ ሥራ መሥራት፣
              </p>
              <p>
                5. በኮንስትራክሽን ፕሮጀክት ባለቤቶች፣ ሥራ ተቋራጮችና አማካሪዎች በጋራና በተናጠል የሚፈፀሙ
                ተግባሮችን በመለየት ወጥ የሆነ የፕሮጀክት አሠራር ሥርዓት መቅረጽና ማስተዋወቅ፣
              </p>
              <p>6. በኮንስትራክሽን ፕሮጀክት ማኔጅመንት መስክ የማማከር አገልግሎት መስጠት፣</p>
              <p>
                7. ለኮንስትራክሽን ፕሮጀክት ማኔጅመንት አቅም ግንባታ አስፈላጊ የሆኑ መረጃዎችን መሰብሰብ፣
                መተንተን፣ ማደራጀትና እንደ አስፈላጊነቱ ለተጠቃሚዎች ማሠራጨት፣
              </p>
              <p>
                8. ዘመናዊ የኮንስትራክሽን ፕሮጀክት ማኔጅመንት ክህሎትና ዕውቀት እንዲስፋፋና እንዲዳብር የጥናትና
                ምርምር ተግባራትን ማከናወን፣
              </p>
              <p>
                9. ለኮንስትራክሽን ፕሮጀክት ማኔጅመንት ክህሎት ዕድገት አጋዥ በሆኑ የቴክኖሎጂ፣ የቴክኒክና ሌሎች
                እንደ አስፈላጊነቱ የሚዘጋጁ ተግባር ተኮር ሥልጠናዎችን ማዘጋጀትና መስጠት፣
              </p>
              <p>
                10. ተመሣሣይ ዓላማ ካላቸው በሀገር ውስጥ እና በውጭ ሃገር ከሚገኙ የመንግሥትና የግል ተቋማት እና
                የሙያ ማህበራት ጋር ትብብር ማድረግ እና በግል ተቋማት መካከልም ተመሳሳይ ትብብር እንዲደረግ
                ማበረታታት፣
              </p>
              <p>
                11. በኮንስትራክሽን ፕሮጀክት አፈጻጸም ተወዳዳሪ ሊያደርጉ የሚችሉ የምርጥ ተሞክሮዎች ጥናት ማካሄድና
                በዘርፋ ተመሳሳይ ተግባር የሚያከናውኑትን መደገፍ፣
              </p>
              <p>
                12. ከከፍተኛ ትምህርት ተቋማት ጋር የኮንስትራክሽን ፕሮግራምና ፕሮጀክት ማኔጅመንት ክህሎት ማሳደግን
                በተመለከተ በመተባበር የመሥራት፣ በጋራ የምርምር ሥራዎችን የማካሄድ እንዲሁም በዘርፉ የሀገር ውስጥ
                የምርምር አቅም እንዲጠናከር ማገዝ፣
              </p>
              <p>13. ለሚሠጣቸው አገልግሎቶች በመንግሥት በሚወሰን ተመን መሠረት የአገልግሎት ዋጋ ማስከፈል፣</p>
              <p>14. ዓላማውን ከግብ ለማድረስ የሚረዱ ሌሎች ተዛማጅ ተግባሮችን ማከናወን ናቸው፡፡</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
