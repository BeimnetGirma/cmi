import React, { useState } from "react";

import AdminPage from "@/components/AdminPage";
import Researches from "@/components/Researches";
import Departments from "@/components/Departments";

const Admin = () => {
  return (
    <>
      <AdminPage researches={<Researches />} departments={<Departments />} />
    </>
  );
};

export default Admin;
