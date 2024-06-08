import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";

const Contact = () => {
  return (
    <div className="pt-8 mt-20">
      <div className="relative h-80 md:h-80 bg-auto bg-center bg-no-repeat flex items-center justify-center text-white bg-[url('/assets/imgs/header-contact.svg')]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10 text-sm">
          <h1 className="text-xl md:text-3xl font-bold">
            GET IN TOUCH WITH US
          </h1>
          <p className="text-sm md:text-lg pt-2">
            {" "}
            <Link href={"/"} className="hover:text-slate-300">
              Home
            </Link>{" "}
            / Contact Us
          </p>
        </div>
      </div>

      <div className="p-2 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-primary-main text-center pt-10">
          CONTACT US
        </h2>
        <div className="flex justify-center ">
          <p className="text-sm text-slate-800 text-center pt-5">
            Here you will find our contact information
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-10 w-1/2 m-auto 2">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="p-4 flex flex-col items-center justify-center border-r-2">
              <div className="flex items-center mb-2 mt-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 p-4">
                Make a Call
              </h4>
              <p className="justify-center text-center text-sm">
                +47 1234 5678
              </p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center border-r-2">
              <div className="flex items-center mb-2 mt-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 p-4">
                Send an Email
              </h4>
              <p className="justify-center text-center text-sm">
                salus@stillas.com
              </p>
            </div>
            <div className="p-4 flex flex-col items-center justify-center ">
              <div className="flex items-center mb-2 mt-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900 p-4">
                Locate Us
              </h4>
              <p className="justify-center text-center text-sm">
                1, Dummy Address, Location
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50">
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
                CONTACT FORM
              </h2>
              <div className="flex justify-center mb-10">
                <p className="text-sm text-slate-800 text-center">
                  Please fill the below form to get in touch
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
                <textarea
                  placeholder="Message"
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
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-primary-main text-center pt-10">
          FOLLOW US ON
        </h2>
        <div className="flex justify-center ">
          <p className="text-sm text-slate-800 text-center pt-5">
            Here you will find our contact information
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-10 w-1/2 m-auto 2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 px-10 flex flex-col items-center justify-center border-r-2">
              <div className="flex items-center mb-2 mt-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                    </svg>
                  </span>
                </div>
              </div>

              <p className="justify-center text-center text-sm">
                solutions_salus_stillas
              </p>
            </div>
            <div className="p-4 px-10 flex flex-col items-center justify-center border-r-2">
              <div className="flex items-center mb-2 mt-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 mr-2">
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </span>
                </div>
              </div>

              <p className="justify-center text-center text-sm">
                salus_stillas
              </p>
            </div>
            <div className="p-4 px-10 flex flex-col items-center justify-center ">
              <div className="flex items-center mb-2 mt-5">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                  <span className="[&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                    >
                      <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                    </svg>
                  </span>
                </div>
              </div>

              <p className="justify-center text-center text-sm">
                salus_stillas_solutions
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
