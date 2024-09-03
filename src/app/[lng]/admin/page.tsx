import React, { useState } from "react";

import AdminPage from "@/components/AdminPage";
import Researches from "@/components/Researches";
import Departments from "@/components/Departments";
import { PageProps } from "@/types";

const Admin = ({ params }: PageProps) => {
  const { lng } = params;

  return (
    <>
      <AdminPage researches={<Researches />} departments={<Departments />} lng={lng} />
    </>
  );
};

export default Admin;
