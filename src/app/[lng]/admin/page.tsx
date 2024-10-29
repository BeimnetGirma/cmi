import React, { useState } from "react";

import AdminPage from "@/components/AdminPage";
import Researches from "@/components/Researches";
import Departments from "@/components/departments/Departments";
import { PageProps } from "@/types";
import GalleryPage from "@/components/pages/gallery-page-component";

const Admin = ({ params }: PageProps) => {
  const { lng } = params;

  return (
    <>
      <AdminPage
        pages={{
          researches: <Researches key="research" />,
          departments: <Departments key="department" />,
          gallery: <GalleryPage key="gallery" />,
        }}
        tabs={["Researches", "Departments", "Gallery", "Home Page"]}
        lng={lng}
      />
    </>
  );
};

export default Admin;
