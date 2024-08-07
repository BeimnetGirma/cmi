import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Department = ({ searchParams }: { searchParams: { [dept: string]: any } }) => {
  const department = searchParams.dept;

  //   fetch department detail here

  return (
    <>
      <div className="pt-8 mt-20">
        <div className="justify-center pt-20">
          <h1 className="text-slate-400 font-light text-xl text-center">Department Name</h1>
          <h1 className="text-primary-main text-3xl font-bold text-center">{department} </h1>
        </div>
        <div className="flex w-5/6 m-auto">
          <div className="flex-col w-1/4 border-r border-gray-300 mr-20">
            {" "}
            {/* Add border-r and border-gray-300 */}
            <div className="flex-row justify-center ">
              <h1 className="text-slate-400 font-light text-xl text-center">Lead By</h1>
              <Image className="m-auto" src="/assets/imgs/dept-head.png" alt="Department Head Photo" width={350} height={550}></Image>
            </div>
            <div className="flex-row">
              <h1 className="text-center mt-5">John Doe</h1>
              <h1 className="text-slate-400 font-light text-lg -mt-6 text-center">CEO, state position</h1>
              <span className="text-slate-600 font-semibold text-lg ">Office Location: </span> <span className="text-slate-600 font-light text-lg ">Location</span> <br />
              <span className="text-slate-600 font-semibold text-lg ">Email: </span> <span className="text-slate-600 font-light text-lg ">Email</span> <br />
              <span className="text-slate-600 font-semibold text-lg ">Phone: </span> <span className="text-slate-600 font-light text-lg ">Phone</span> <br />
              <span className="text-slate-600 font-semibold text-lg ">Fax: </span> <span className="text-slate-600 font-light text-lg ">Fax</span> <br />
            </div>
          </div>
          <div className="flex-col w-3/4">
            <div className="flex-row">
              <h1 className="text-slate-600 font-semibold text-2xl">Description</h1>
              <p className="text-slate-600  text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed condimentum augue, id vestibulum lorem. Aliquam erat volutpat. Cras ornare dui et leo ornare,
                a tempus nisi maximus. Pellentesque fermentum scelerisque odio at fringilla. Duis nunc risus, bibendum ut tincidunt vitae, blandit non enim. Sed sagittis molestie
                justo. Morbi ultrices efficitur velit, ac aliquet ex porttitor sed. Duis ligula orci, consectetur at nulla in, molestie convallis sapien. Integer a ipsum tincidunt,
                lobortis turpis ut, rhoncus ipsum. Nullam sollicitudin aliquam pretium. Proin laoreet finibus dui scelerisque sagittis. Quisque libero quam, efficitur ac hendrerit
                quis, venenatis quis mi. Phasellus viverra laoreet augue, sed condimentum eros.
              </p>
            </div>
            <div className="flex-row mt-10">
              <h1 className="text-slate-600 font-semibold text-2xl">More Description</h1>
              <ul className="text-slate-600 -mt-8 ">
                <li className="py-2"> Description of service or mandatate 1 </li>
                <li className="py-2"> Description of service or mandatate 2 </li>
                <li className="py-2"> Description of service or mandatate 3 </li>
                <li className="py-2"> Description of service or mandatate 4 </li>
                <li className="py-2"> Description of service or mandatate 5 </li>
              </ul>
            </div>
            <div className="flext-row">
              <h1 className="text-slate-600 font-semibold text-2xl">Contact</h1>
              <div className="flex flex-col ">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-4 flex flex-col items-center justify-center border-r-2">
                    <div className="flex items-center mb-2 mt-5">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 p-4">Make a Call</h4>
                    <p className="justify-center text-center text-sm">+47 1234 5678</p>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-center border-r-2">
                    <div className="flex items-center mb-2 mt-5">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 p-4">Send an Email</h4>
                    <p className="justify-center text-center text-sm">salus@stillas.com</p>
                  </div>
                  <div className="p-4 flex flex-col items-center justify-center ">
                    <div className="flex items-center mb-2 mt-5">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 p-4">Locate Us</h4>
                    <p className="justify-center text-center text-sm">1, Dummy Address, Location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
