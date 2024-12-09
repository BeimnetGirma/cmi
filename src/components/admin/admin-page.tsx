"use client";

import { useState } from "react";
import ImageWithTextOverlay from "../ui/image-overlay";
import EditHomePage from "../home-page/edit-home-page";

interface AdminPageProps {
  pages: { [key: string]: React.ReactNode };
  tabs: string[];
  lng: string;
}
const AdminPage = ({ ...AdminPageProps }) => {
  const [component, setComponent] = useState("researches");
  const { pages, tabs } = AdminPageProps;
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <ImageWithTextOverlay
          imgUrl="/assets/imgs/header-services.svg"
          width={1920}
          height={500}
          text="Admin Page"
        />
      </div>

      <div className="flex justify-center mt-8 mx-10">
        <nav className="flex space-x-4">
          {tabs.map((tab: string) => (
            <button
              key={tab}
              onClick={() => setComponent(tab.toLowerCase())}
              className={`text-blue-500 hover:text-blue-700  ${
                component === tab.toLowerCase()
                  ? "font-semibold text-blue-900 "
                  : ""
              } `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="border-b-2 border-secondary-400 container mx-auto py-5"></div>
      <div>
        {component ? (
          pages[component]
        ) : (
          <EditHomePage lng={AdminPageProps.lng} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
