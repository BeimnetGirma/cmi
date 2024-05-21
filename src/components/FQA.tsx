"use client";
import { use, useState } from "react";

export default function FQA() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    { question: "Who is Quality Control suitable for?", answer: "Quality Control is suitable for any business that wants to improve the quality of their products or services." },
    { question: "Does Quality Control have the functions we need?", answer: 'They be partial to "parley" – a civilized discussion before the cutlass comes out!' },
    { question: "Does Quality Control cover statutory requirements?", answer: "A trusty eye patch – perfect for day or night sailin!" },
    { question: "How much does Quality Control cost?", answer: "A trusty eye patch – perfect for day or night sailin!" },
    { question: "Do you have different languages ​​in the system?", answer: "A trusty eye patch – perfect for day or night sailin!" },
  ];

  return (
    <>
      <div className="max-w-lg mx-auto">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-slate-50 border-b-2">
            <div
              onClick={() => toggleAccordion(index)}
              className={
                activeIndex == index
                  ? "w-full py-4 px-6 text-left hover:bg-indigo-600 text-white bg-indigo-600 flex justify-between"
                  : "w-full py-4 px-6 text-left hover:bg-indigo-600 hover:text-white flex justify-between"
              }
            >
              {faq.question}

              {activeIndex === index ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              )}
            </div>

            {activeIndex === index && (
              <div className="p-4">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
