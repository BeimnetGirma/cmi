import React from "react";

import AdminPage from "@/components/admin/admin-page";
import Researches from "@/components/research/research";
import Departments from "@/components/departments/Departments";
import { PageProps } from "@/types";
import GalleryPage from "@/components/gallery/gallery-page-component";
import Standard from "@/components/standards/standards";
import EditHomePage from "@/components/home-page/edit-home-page";
import Executives from "@/components/executive/executives";
import Magazine from "@/components/magazines/magazines";
import Services from "@/components/services/services";

const Admin = ({ params }: PageProps) => {
  const { lng } = params;

  return (
    <>
      <AdminPage
        pages={{
          researches: <Researches key="research" />,
          standards: <Standard key="standard" />,
          magazines: <Magazine key="magazine" />,
          departments: <Departments key="department" />,
          gallery: <GalleryPage key="gallery" />,
          homepage: <EditHomePage key="homePage" lng={lng} />,
          executives: <Executives key="executives" />,
          services: <Services key="services" />,
        }}
        tabs={["Researches", "Standards", "Magazines", "Departments", "Gallery", "Home Page", "Executives", "Services"]}
        lng={lng}
      />
    </>
  );
};

export default Admin;
