import React from "react";

import AdminPage from "@/components/admin/admin-page";
import Researches from "@/components/research/research";
import Departments from "@/components/departments/Departments";
import { PageProps } from "@/types";
import GalleryPage from "@/components/gallery/gallery-page-component";
import Standard from "@/components/standards/standards";

import Executives from "@/components/executive/executives";
import Magazine from "@/components/magazines/magazines";
import Services from "@/components/services/services";
import NewsLink from "@/components/news/news-link";
import Announcements from "@/components/announcement/announcements";
import Resources from "@/components/resources/resources";
import EditPageContents from "@/components/page-contents/edit-page-contents";

const Admin = ({ params }: PageProps) => {
  const { lng } = params;

  return (
    <>
      <AdminPage
        pages={{
          researches: <Researches key="research" />,
          standards: <Standard key="standard" />,
          resources: <Resources key="resources" />,
          magazines: <Magazine key="magazine" />,
          news: <NewsLink key="news" />,
          departments: <Departments key="department" />,
          gallery: <GalleryPage key="gallery" />,
          pagecontents: <EditPageContents key="pageContents" lng={lng} />,
          executives: <Executives key="executives" />,
          services: <Services key="services" />,
          announcements: <Announcements key="announcements" />,
        }}
        tabs={["Researches", "Standards", "Resources", "Magazines", "News", "Departments", "Gallery", "Page Contents", "Executives", "Services", "Announcements"]}
        lng={lng}
      />
    </>
  );
};

export default Admin;
