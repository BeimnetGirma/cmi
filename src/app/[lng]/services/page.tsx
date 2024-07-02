import Image from "next/image";
import Link from "next/link";

const Services = () => {
  return (
    <div className="pt-8 mt-20">
      <div className="relative h-80 md:h-80 bg-auto bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-services.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">OUR SERVICES</h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              Home
            </Link>{" "}
            / Services
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center pt-20">
          <h1 className="text-primary-main text-xl md:text-xl font-bold text-center">
            WHAT WE DO
          </h1>
          <div className="flex justify-center pt-8">
            <p className="text-sm text-slate-800 w-1/3 text-center">
              At Salus Stillas Solutions, our primary goal is to deliver
              high-quality and secure services to our customers by providing a
              digital platform for comprehensive management of all your
              scaffolding work. We are dedicated to advancing the construction
              industry through excellence.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-10 w-1/2 m-auto 2">
        <div className="grid grid-cols-3 md:grid-cols-3">
          <div className="p-4 flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 p-4">
              Time Registration
            </h4>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-cyan-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 p-4">Checklists</h4>
          </div>

          <div className="p-4   flex flex-col items-center justify-center  border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-orange-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Forms</h4>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-yellow-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">
              Observations
            </h4>
          </div>

          <div className="p-4   flex flex-col items-center justify-center border-r-2 border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-purple-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Procedures</h4>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-b-2">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-rose-950"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Orders</h4>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 ">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Pictures</h4>
          </div>
          <div className="p-4   flex flex-col items-center justify-center border-r-2 ">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lime-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">Filers</h4>
          </div>
          <div className="p-4   flex flex-col items-center justify-center ">
            <div className="flex items-center mb-2 mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-pink-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 p-4">
              Inspections
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3"></div>
      </div>
      <div className="p-2 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-primary-main text-center mt-10 mb-5 p-0">
          WE HELP YOU MANAGE YOUR ALL SCAFFOLDING WORK
        </h2>
        <button className="rounded text-sm text-white bg-primary-main hover:bg-indigo-500 p-2 ">
          Lets Work Together
        </button>
        <Image
          src="/assets/imgs/worktogether.svg"
          alt="Team"
          width={1200}
          height={500}
        />
      </div>
      <div className="p-2">
        <div className="flex flex-col md:flex-row items-center justify-center p-8 pl-40 w-3/4 m-auto">
          <div className="md:w-1/3 md:mr-4">
            <h3 className="text-xl font-bold mb-4 text-primary-main">
              ADVANCING CONSTRUCTION INDUSTRY
            </h3>
            <p className="text-left mb-4">
              Delivering high-quality and secure services to our customers by
              providing a digital platform for comprehensive management of all
              kind of scaffolding work.
            </p>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
            <Image
              src="/assets/imgs/service-video.svg"
              alt="About Us Image"
              className="rounded-lg justify-end hover:border-blue-500 hover:border-2"
              width={400}
              height={330}
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-center justify-center py-10 w-3/4 m-auto 2">
          <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-2">
            <div className=" flex flex-col items-center justify-center p-10">
              <Image
                src="/assets/imgs/contact-guy.svg"
                alt="Contact Us"
                width={1000}
                height={500}
              />
            </div>
            <div className="p-4 flex flex-col items-center ">
              <h2 className="text-xl font-bold text-primary-main text-center p-0">
                GET A FREE DEMO
              </h2>
              <div className="flex justify-center mb-10 w-3/4">
                <p className="text-sm text-slate-800 text-center">
                  Please fill the below form to get information about our
                  Products or Services
                </p>
              </div>
              <form className="flex flex-col items-center w-full text-sm">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full p-2  mb-4 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full p-2  mb-4 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Mail Id"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <div className="flex justify-start my-10">
                  <p className="text-xs text-slate-800 text-left">
                    We require this information to reach out to you and provide
                    you with information about our products and services. Please
                    rest assured, we prioritize your privacy, and your
                    information is kept completely secure with us. You can
                    review our{" "}
                    <Link href={"#"} className="font-bold hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href={"#"} className="font-bold hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    here.
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-primary-main text-white py-2 px-4 rounded hover:bg-primary-dark"
                >
                  Get Demo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
