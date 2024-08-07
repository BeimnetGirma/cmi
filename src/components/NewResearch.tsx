"use client";
import React, { useState } from "react";

type Research = { Research_Id?: number; Title: string; Department: string; Year: Date; Path: string };
type NewResearchProps = {
  departments: { Department_Name: string }[];
  createResearch: (research: Research) => void;
};

const NewResearch = ({ departments, createResearch }: NewResearchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [title, setTitle] = useState("");
  var [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [filePath, setFilePath] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createResearch({ Title: title, Department: department, Year: new Date(year), Path: filePath });
  };

  return (
    <div>
      <div className="flex flex-row justify-end">
        <button className="bg-green-600 text-white rounded-md py-4  m-2 px-10 item-center" onClick={openModal}>
          New
        </button>
      </div>
      {isOpen && (
        <div>
          <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-60 w-2/4 mx-auto items-center bg-black justify-center">
            <div className="absolute inset-0 bg-white "></div>
            <div className=" bg-white p-4 rounded-lg">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">Add New Research</h1>

              <form
                className="mt-8 relative"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                  </label>
                  <input
                    required
                    type="text"
                    id="title"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                    placeholder="Enter title"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
                    Department:
                  </label>
                  {/* <input
                    type="text"
                    id="department"
                    onChange={(e) => {
                      setDepartment(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                    placeholder="Enter department"
                  /> */}
                  <select
                    required
                    name="department"
                    id="department"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                    onChange={(e) => {
                      department = e.target.value;
                    }}
                  >
                    <option selected disabled>
                      Select Department
                    </option>
                    {departments.map((dept, index) => (
                      <option value={dept.Department_Name} key={index}>
                        {dept.Department_Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
                    Year:
                  </label>
                  <input
                    type="date"
                    id="year"
                    required
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                    placeholder="Enter year"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                    File:
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".pdf"
                    onChange={(e) => setFilePath(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Research
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

export default NewResearch;
