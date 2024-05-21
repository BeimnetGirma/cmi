import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import ClientsSlider from "@/components/ClientsSlider";
import FQA from "@/components/FQA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      {/* Hero */}
      <div className="bg-contain bg-no-repeat bg-center h-96 flex items-center mt-40 justify-end bg-[url('/assets/imgs/hero.svg')]">
        <div className="flex flex-col items-end justify-center w-1/2 mr-20">
          <h2 className="text-4xl text-indigo-500 font-bold mr-10 mb-5">SALUS STILLAS SOLUTIONS</h2>
          <div className="text-slate-900 rounded-md w-1/2 mr-20 mb-5">
            <p className="text-justify">An intuitive and reliable quality system designed for the building and construction industry, ensuring safety and predictability.</p>
            <button className="bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors text-white px-4 py-2 mt-2 ">View Projects</button>
          </div>
        </div>
      </div>
      {/* About Us Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 pl-40 bg-slate-50">
        <div className="md:w-1/3 md:mr-4">
          <h3 className="text-xl font-bold mb-4 text-indigo-600">ABOUT US</h3>
          <p className="text-left mb-4">
            A digital platform for comprehensive management for all your scaffolding project. It's for anyone involved in the assembly, usage, rental, or ownership of scaffolding
            work. A simple and efficient way to apply for scaffolding approval and manage your scaffolding project on Salus Stillas Solutions.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors text-white px-4 py-2 mt-2">Read More</button>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
          <Image src="/assets/imgs/aboutus.svg" alt="About Us Image" className="rounded-lg justify-end" width={500} height={330} />
        </div>
      </div>
      {/* Demo Section */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 pl-40 ">
        <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
          <Image src="/assets/imgs/demoguy.svg" alt="Demo Guy" className="rounded-lg justify-end" width={250} height={330} />
        </div>
        <div className="md:w-1/3 md:mr-4">
          <h3 className="text-xl font-bold mb-4 text-indigo-600">A SIMPLE AND EASY WAY TO APPLY FOR SCAFFOLDING</h3>
          <p className="text-left mb-4">An intuitive and reliable quality system designed for the building and construction industry, ensuring safety and predictability.</p>
          <button className="bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors text-white px-4 py-2 mt-2">Get Demo</button>
        </div>
      </div>
      {/* Our Services */}

      <div className="flex flex-col items-center justify-center p-8 pl-40 bg-slate-50">
        <h3 className="text-xl font-bold mb-4 text-indigo-600">OUR SERVICES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 p-4">Time Registration</h4>
            <p className="text-center w-3/4 pb-10">
              Effortless time tracking for every team member. Just log machine hours, overtime, and allowances, then instantly view your project's time breakdown.
            </p>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-cyan-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 p-4">Checklists</h4>
            <p className="text-center w-3/4 pb-10">Complete checklists with templates adapted to all industries. Can be easily customized and customized.</p>
          </div>

          <div className="p-4   flex flex-col items-center justify-center  border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-orange-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Forms</h4>
            <p className="text-center w-3/4 pb-10">
              Get mobile-friendly forms with options for signing directly on mobile. We also have a form builder where you can freely build all the forms you need.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Observations</h4>
            <p className="text-center w-3/4 pb-10">
              Deviation handling with notification. Deviations are registered, commented on and documented directly on mobile. Image function directly in the deviation makes it a
              breeze.
            </p>
          </div>

          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-purple-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Procedures</h4>
            <p className="text-center w-3/4 pb-10">
              Procedures are adapted to your company in relation to statutory requirements, with audit history and notification to employees.
            </p>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-rose-950">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Orders</h4>
            <p className="text-center w-3/4 pb-10">
              Get mobile-friendly forms with options for signing directly on mobile. We also have a form builder where you can freely build all the forms you need.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="p-4   flex flex-col items-center justify-center border-r-2 ">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Pictures</h4>
            <p className="text-center w-3/4 pb-10">
              Take pictures directly of checklists or deviations and get full control and documentation of all work carried out on the construction site.
            </p>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 ">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-green-400">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Filers</h4>
            <p className="text-center w-3/4 pb-10">Complete checklists with templates adapted to all industries. Can be easily customized and customized.</p>
          </div>
          <div className="p-4   flex flex-col items-center justify-center ">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-pink-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Inspections</h4>
            <p className="text-center w-3/4 pb-10">
              Get mobile-friendly forms with options for signing directly on mobile. We also have a form builder where you can freely build all the forms you need.
            </p>
          </div>
        </div>
      </div>
      <div className="pb-20">
        <h2 className="text-xl font-bold text-indigo-600 text-center mt-10 mb-5 p-0">OUR CLIENTS</h2>
        <ClientsSlider />
      </div>

      {/* FQA */}
      <div className="bg-slate-50 p-8">
        <h2 className="text-xl font-bold text-center mb-6">FREQUENTLY ASKED QUESTIONS</h2>
        <FQA />
      </div>
      <div className="p-8">
        <h2 className="text-xl font-bold text-center mb-6">BLOGS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <Image className="w-full h-80 object-cover object-center" src="/assets/imgs/blog1.svg" alt="this is an image" width={250} height={350} />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">News Title #1</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et purus viverra, molestie magna nec.</p>
              <Link href={"#"} className="font-bold text-indigo-600 underline hover:text-indigo-500">
                Read More
              </Link>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <Image className="w-full h-80 object-cover object-center" src="/assets/imgs/blog2.svg" alt="this is an image" width={250} height={350} />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Here’s an example when the Blog Title is too long</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et purus viverra, molestie magna nec.</p>
              <Link href={"#"} className="font-bold text-indigo-600 underline hover:text-indigo-500">
                Read More
              </Link>
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <Image className="w-full h-80 object-cover object-center" src="/assets/imgs/blog3.svg" alt="this is an image" width={250} height={350} />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">News Title #3</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et purus viverra, molestie magna nec.</p>
              <Link href={"#"} className="font-bold text-indigo-600 underline hover:text-indigo-500">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
