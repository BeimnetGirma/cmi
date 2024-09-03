"use client";

import { useState } from "react";
import ImageWithTextOverlay from "./image-overlay";
import EditHomePage from "./EditHomePage";
// import Researches from "./Researches";
// import Departments from "./Departments";

interface AdminPageProps {
  researches: React.ReactNode;
  departments: React.ReactNode;
  lng: string;
}
const AdminPage = ({ ...AdminPageProps }) => {
  const [component, setComponent] = useState("researches");

  return (
    <div className="">
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text="Admin Page" />
      </div>

      <div className="flex justify-center mt-8 mx-10">
        <nav className="flex space-x-4">
          <button
            onClick={() => {
              setComponent("researches");
            }}
          >
            <p className={`text-blue-500 hover:text-blue-700  ${component === "researches" ? "font-semibold text-blue-900 " : ""} `}>Researches</p>
            {/* className={`text-slate-900 font-normal hover:text-slate-400 transition-colors ${component === "researches" ? "font-semibold text-blue-900 " : ""}`} */}
          </button>
          <button onClick={() => setComponent("departments")}>
            <p className={`text-blue-500 hover:text-blue-700  ${component === "departments" ? "font-semibold text-blue-900 " : ""} `}>Departments</p>
          </button>

          <button onClick={() => setComponent("home-page")}>
            <p className="text-blue-500 hover:text-blue-700">Home Page</p>
          </button>
        </nav>
      </div>
      {/* <hr className="" /> */}
      <div>{component == "researches" ? AdminPageProps.researches : component == "departments" ? AdminPageProps.departments : <EditHomePage lng={AdminPageProps.lng} />}</div>
    </div>
  );
};

export default AdminPage;
