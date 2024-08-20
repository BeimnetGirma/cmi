"use client";
import React, { useState } from "react";
import Link from "next/link";
type TDepartment = { Department_Name: string };
type DepartmentProps = {
  department: { Department_Name: string };
  index: number;
  editDepartment: (oldDepartment: TDepartment, newdepartment: TDepartment) => void;
  deleteDepartment: (departmentName: string) => void;
};
const Department = ({ department, index, editDepartment, deleteDepartment }: DepartmentProps) => {
  // const [isOpen, setIsOpen] = useState(false)
  const [deptName, setDeptName] = useState(department.Department_Name);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };
  const openDeleteModal = () => {
    setIsDeleteOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };
  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    editDepartment(department, { Department_Name: deptName });
    closeEditModal();
  };
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deleteDepartment(department.Department_Name);
    closeDeleteModal();
  };
  return (
    <>
      <tr key={index}>
        <td className="p-6 border">{index + 1}</td>
        <td className="p-6 border">{department.Department_Name}</td>
        <td className="p-6 border">
          <div className="flex flex-row gap-3 justify-center">
            {" "}
            {/* <Link href={"https://pdfobject.com/pdf/sample.pdf"}>
                      <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link> */}
            <button onClick={openEditModal}>
              <svg className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /> <line x1="16" y1="5" x2="19" y2="8" />
              </svg>
            </button>
            <button onClick={openDeleteModal}>
              <svg
                className="h-8 w-8 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="7" x2="20" y2="7" /> <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" />{" "}
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {isEditOpen && (
        <div>
          <div className="fixed inset-0 w-screen h-screen  bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 mx-auto items-center justify-center">
            <div className="absolute inset-0 bg-white h-1/2"></div>
            <div className=" bg-white p-4 rounded-lg">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeEditModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">Edit Department Detail</h1>

              <form
                className="m-10 relative "
                onSubmit={(e) => {
                  handleUpdate(e);
                }}
              >
                <div className="mb-4">
                  <label htmlFor="deptName" className="block text-gray-700 text-xl  mb-2">
                    Department Name:
                  </label>
                  <input
                    required
                    type="text"
                    id="deptName"
                    value={deptName}
                    onChange={(e) => {
                      setDeptName(e.target.value);
                    }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                    placeholder="Enter Department Name"
                  />
                </div>

                <div className="flex justify-end">
                  <button className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 m-2 rounded" onClick={closeEditModal}>
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  m-2 rounded">
                    Update Department
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isDeleteOpen && (
        <div>
          <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 h-1/3 mx-auto flex items-center bg-black justify-center">
            <div className="absolute inset-0 bg-white "></div>
            <div className=" bg-white p-4 rounded-lg">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeDeleteModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-2xl relative ">Delete Research</h1>
              <hr className="relative" />
              <div className="relative mx-10 px-10">
                <p className="text-red-600 text-l">Are you sure you want to delete the department named &quot;{department.Department_Name}&quot;? This action cannot be undone. </p>
              </div>
              <hr className="relative mt-10" />
              <div className="flex relative justify-end mt-10">
                <button className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 mx-2 rounded"
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  Delete Research
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Department;
