import React from "react";

import AdminPage from "@/components/admin/admin-page";
import Researches from "@/components/research/research";
import Departments from "@/components/departments/Departments";
import { PageProps } from "@/types";
import GalleryPage from "@/components/gallery/gallery-page-component";
import Standard from "@/components/standards/standards";
import EditHomePage from "@/components/home-page/edit-home-page";

const Admin = ({ params }: PageProps) => {
  const { lng } = params;

  return (
    <>
      <AdminPage
        pages={{
          researches: <Researches key="research" />,
          standards: <Standard key="standard" />,
          departments: <Departments key="department" />,
          gallery: <GalleryPage key="gallery" />,
          homepage: <EditHomePage key="homePage" lng={lng} />,
        }}
        tabs={["Researches", "Standards", "Departments", "Gallery", "Home Page"]}
        lng={lng}
      />
    </>
  );
};

export default Admin;
