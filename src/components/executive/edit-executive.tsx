"use client";
import useLoading from "@/hooks/useLoading";
import { Executive } from "@prisma/client";
import React, { useState } from "react";
import Spinner from "../ui/spinner";
import { revalidatePath } from "next/cache";

type EditProfileProps = {
  executive: Executive;
  editProfile: (executive: Executive) => void;
};

const EditExecutive = ({ executive, editProfile }: EditProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("open");
    console.log(executive);

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [headName, setFullName] = useState(executive.headName);
  const [headTitle, setTitle] = useState(executive.headTitle);
  const [dutiesDescription, setDescription] = useState(executive.dutiesDescription);
  const [departmentName, setDeptName] = useState(executive.departmentName);
  const [imagePath, setImagePath] = useState(executive.imagePath);
  const [image, setImage] = useState<File>();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (image) {
        const formData = new FormData();
        formData.set("image", image);
        const response = await fetch("/api/profile", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          await response.json().then((data) => {
            if (data) {
              editProfile({
                departmentName: departmentName,
                dutiesDescription: dutiesDescription,
                headName: headName,
                headTitle: headTitle,
                imagePath: data.image,
                id: executive.id,
                createdAt: executive.createdAt,
                updatedAt: executive.updatedAt,
              });
            }
          });
        }
      } else {
        editProfile({
          departmentName: departmentName,
          dutiesDescription: dutiesDescription,
          headName: headName,
          headTitle: headTitle,
          imagePath: imagePath,
          id: executive.id,
          createdAt: executive.createdAt,
          updatedAt: executive.updatedAt,
        });
      }
      revalidatePath("/");
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={openModal}>
        <svg className="h-8 w-8 text-yellow-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /> <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
      </button>
      <div>
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
                <h1 className="text-slate-900 text-3xl relative ">Update Excutive Profile</h1>

                <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-4">
                    <label htmlFor="deptName" className="block text-gray-700 text-sm font-bold mb-2">
                      Executive Name
                    </label>
                    <input
                      required
                      type="text"
                      id="deptName"
                      value={departmentName}
                      onChange={(e) => {
                        setDeptName(e.target.value);
                      }}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                      Executive Description:
                    </label>
                    <textarea
                      required
                      id="description"
                      value={dutiesDescription}
                      rows={4}
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      placeholder="Enter Job Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <fieldset className="m-5 p-2 border-2 ">
                    <legend className="block text-gray-700 font-bold mb-2">Executive Head</legend>
                    <div className="mb-4">
                      <label htmlFor="headName" className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        id="headName"
                        value={headName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                      </label>
                      <input
                        required
                        type="text"
                        id="title"
                        value={headTitle}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500 "
                        placeholder="Enter Title"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Profile Picture:
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                          setImage(e.target.files?.[0]);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                      />
                    </div>
                  </fieldset>

                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <div className="flex space-x-2">
                        {isLoading && <Spinner />}
                        <span>Update Profile</span>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditExecutive;
