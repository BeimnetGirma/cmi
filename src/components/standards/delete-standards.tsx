"use client";
import { Standard } from "@/types";
import React, { useState } from "react";

type DeleteStandardProps = {
  standard: Standard;
  deleteStandard: (standard_id: string) => void;
};

const DeleteStandard = ({ standard, deleteStandard }: DeleteStandardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [title, setTitle] = useState(standard.title);

  const handleClick = async (e: { preventDefault: () => void }) => {
    if (standard.id) {
      deleteStandard(standard.id);
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal}>
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
          <path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="7" x2="20" y2="7" /> <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" />{" "}
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
      <div>
        {isOpen && (
          <div>
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
            <div className="fixed inset-60 w-2/4 mx-auto flex items-center bg-black justify-center">
              <div className="absolute inset-0 bg-white "></div>
              <div className=" bg-white p-4 rounded-lg">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Add your modal content here */}
                <h1 className="text-slate-900 text-2xl relative ">Delete Standard</h1>
                <hr className="relative" />
                <div className="relative mx-10 px-10">
                  <p className="text-red-600 text-l">
                    Are you sure you want to delete standard titled &quot;
                    {standard.title}&quot;? This action cannot be undone.{" "}
                  </p>
                </div>
                <hr className="relative mt-10" />
                <div className="flex relative justify-end mt-10">
                  <button className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded mx-2" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 mx-2 rounded"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Delete Standard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteStandard;
