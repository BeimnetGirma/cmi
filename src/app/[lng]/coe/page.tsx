import React from "react";
import Image from "next/image";
import prisma from "@/db";

const COE = async () => {
  const executives = await prisma.executive.findMany();
  return (
    <>
      <div className="pt-8 mt-20">
        <div className="justify-center mb-10">
          <h1 className="text-primary-light font-bold text-2xl ml-28 pt-6">
            Executive
          </h1>
        </div>
        <div className="flex w-5/6 m-auto">
          <div className="flex-col w-1/4 border-r border-gray-300 mr-20">
            {" "}
            {/* Add border-r and border-gray-300 */}
            <div className="flex-row justify-center ">
              {/* <h1 className="text-slate-400 font-light text-xl text-center">Lead By</h1> */}
              <Image
                className="m-auto"
                src="/assets/imgs/coe.png"
                alt="Department Head Photo"
                width={350}
                height={550}
              ></Image>
            </div>
            <div className="flex-row">
              <h1 className="text-center mt-5"> አርክቴክት ቅድስት ማሞ</h1>
              <h1 className="text-slate-400 font-light text-lg -mt-6 text-center">
                {" "}
                የኮንስትራክሽን ማኔጅመንት ስታንዳርድ መረጃ ስራ አስፈጻሚ
              </h1>
            </div>
          </div>
          <div className="flex-col w-3/4">
            <div className="flex-row">
              <h1 className="text-slate-600 font-semibold text-2xl">
                {" "}
                የስራ ክፍሉ ተግባራት
              </h1>
              <p className="text-slate-600  text-justify">
                በሀገራችን ያሉት የፕሮጀክቶች ዓለም አቀፍ ተቀባይነት ባለው የፕሮጀክት ማኔጅመንት ፕሮፌሽናልስ
                (PMP) ሰርቲፋይድ በሆኑ ባለሙያዎች እንደመሩ ለማድረግ ማመቻቸት የኮንስትራክሽን ኢንዱስትሪው
                ባለሙያዎችን በ “ሙያ ብቃት ምዘና” ለማረጋገጥ በኮንስትራክሽን የሙያ ብቃት ደረጃ፣ መለኪያዎችንና
                መስፈርቶችን በማዘጋጀት እና በማሻሻል የደረጃና ብቃት ምዘና መሳሪያ ማዘጋጀት እና ማደራጀት
                ባለሙያዎችን የፕሮጀክት ማኔጅመንት ፕሮፌሽናልስ (PMP) ሰርቲፋይድ ለማድረግ በሚያልፉት ሂደቶች ውስጥ
                ተቋሟችን ለሚሰጠው ፈተና በዲጅታል ሲስተም (Exam Management System) እንዲሆን ማድረግና
                ሲስተሙን ማስተዳደር በኢንስቲትዩቱ ኮ/ማ ስልጠና ዴስክ ስር በቨርቹዓል (LMS) ለሚሰጠው
                የኮንስትራክሽን ፕሮጀክት ማኔጅመንት ስልጠና ላይ የዲጅታል ሲስተም ሙያ እገዛን መስጠት
              </p>
            </div>
          </div>
        </div>

        {executives?.map((executive: any, index: number) => (
          <div key={index} className="flex w-5/6 m-auto">
            <div className="flex-col w-1/4 border-r border-gray-300 mr-20">
              {" "}
              <div className="flex-row justify-center ">
                <Image
                  className="m-auto"
                  src={executive.imagePath}
                  alt="Department Head Photo"
                  width={350}
                  height={550}
                ></Image>
              </div>
              <div className="flex-row">
                <h1 className="text-center mt-5"> {executive.name}</h1>
                <h1 className="text-slate-400 font-light text-lg -mt-6 text-center">
                  {" "}
                  {executive.title}
                </h1>
              </div>
            </div>
            <div className="flex-col w-3/4">
              <div className="flex-row">
                <h1 className="text-slate-600 font-semibold text-2xl">
                  Department Duties{" "}
                </h1>
                <p className="text-slate-600 text-justify">
                  {executive.jobDescription}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default COE;
