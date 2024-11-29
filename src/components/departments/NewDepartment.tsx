"use client";
import React, { useState } from "react";
import { Department } from "@/types";
import ImportModalInfo from "./info-modal";
import Image from "next/image";
import ImportFromCSV from "./import-from-csv";

type NewDepartmentProps = {
  createDepartment: (department: Department) => void;
};
const NewDepartment = ({ createDepartment }: NewDepartmentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [deptName, setDeptName] = useState("");
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createDepartment({ name: deptName });
    closeModal();
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-end">
        <button className="flex space-x-2 bg-green-600 text-white rounded-md py-4  m-2 px-10 item-center">
          <Image
            width="24"
            height="24"
            src="https://img.icons8.com/ffffff/material-outlined/50/import-csv.png"
            alt="import-csv"
          />
          <ImportFromCSV />
        </button>
        <button
          className="flex space-x-2 bg-green-600 text-white rounded-md py-4  m-2 px-10 item-center"
          onClick={openModal}
        >
          <Image
            width="24"
            height="24"
            src="https://img.icons8.com/ffffff/material-outlined/50/plus--v1.png"
            alt="plus"
          />
          <span>New</span>
        </button>
        <ImportModalInfo />
      </div>
      {isOpen && (
        <div>
          <div className="fixed inset-0 w-screen h-screen  bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 mx-auto items-center justify-center">
            <div className="absolute inset-0 bg-white h-1/2"></div>
            <div className=" bg-white p-4 rounded-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">
                Add New Department
              </h1>
              <form
                className="m-10 relative "
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-gray-700 text-xl  mb-2"
                  >
                    Department Name:
                  </label>
                  <input
                    required
                    type="text"
                    id="title"
                    onChange={(e) => {
                      setDeptName(e.target.value);
                    }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                    placeholder="Enter Department Name"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Department
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewDepartment;
