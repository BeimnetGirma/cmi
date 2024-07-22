"use client";

import { useState } from "react";
import ImageWithTextOverlay from "./image-overlay";
// import Researches from "./Researches";
// import Departments from "./Departments";

interface AdminPageProps {
  researches: React.ReactNode;
  departments: React.ReactNode;
}
const AdminPage = ({ ...AdminPageProps }) => {
  const [component, setComponent] = useState("researches");
  return (
    <div className="pt-8 mt-20">
      <div className="w-full">
        <ImageWithTextOverlay imgUrl="/assets/imgs/header-services.svg" width={1920} height={500} text="Admin Page" />
      </div>

      <div className="flex justify-center mt-8 mx-10">
        <nav className="flex space-x-4">
          <button
            onClick={() => {
              setComponent("researches");
              console.log("researches");
            }}
          >
            <p className="text-blue-500 hover:text-blue-700">Researches</p>
          </button>
          <button onClick={() => setComponent("departments")}>
            <p className="text-blue-500 hover:text-blue-700">Departments</p>
          </button>
          <button onClick={() => setComponent("reports")}>
            <p className="text-blue-500 hover:text-blue-700">Reports</p>
          </button>
        </nav>
      </div>

      <div>{component == "researches" ? AdminPageProps.researches : component == "departments" ? AdminPageProps.departments : <p>Reports will be displayed here</p>}</div>
    </div>
  );
};

export default AdminPage;
