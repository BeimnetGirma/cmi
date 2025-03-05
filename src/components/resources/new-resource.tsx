"use client";
import useLoading from "@/hooks/useLoading";
import React, { useState } from "react";
import Spinner from "../ui/spinner";
import { toast } from "sonner";
import { Resource, ResourceType } from "@/types";

type NewResourceProps = {
  createResource: (resource: Resource) => void;
  resourceTypes: ResourceType[];
};

const NewResource = ({ createResource, resourceTypes }: NewResourceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [resourceType, setResourceType] = useState(resourceTypes[0].name);
  // const resourceTypes = [
  //   { id: "1", name: "Project" },
  //   { id: "2", name: "Manual" },
  // ];
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!file) return;
    try {
      startLoading();
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch(`/api/resources/`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        stopLoading();
        toast.error("Failed to upload the resource.", {
          duration: 3000,
          description: response.statusText,
        });
        console.error(response);
        return;
      }

      const data = await response.json();
      if (data.success) {
        const filePath = data.path;
        const originalName = file.name;
        const newResource: Resource = {
          title: title,
          type: resourceType,
          path: JSON.stringify({
            filePath,
            originalName,
          }),
        };
        console.log(newResource);

        createResource(newResource);
        toast.success("Resource uploaded successfully", {
          duration: 3000,
        });

        closeModal();
      }
    } catch (error) {
      stopLoading();
      if (error instanceof Error) {
        toast.error("Failed to publish the resource.", {
          duration: 3000,
          description: error.message,
        });
        console.error(error);
      }
    } finally {
      stopLoading();
    }
  };
  return (
    <>
      <button className="bg-green-600 hover:bg-green-700 text-white rounded-md py-2  m-2 px-8 item-center" onClick={openModal}>
        Add Resource
      </button>

      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center">
            {/* overlay */}
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>

            <div
              className=" fixed bg-white p-6 rounded-lg w-2/4 shadow-lg z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              max-h-[80vh] overflow-y-auto"
            >
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">Add New Resource</h1>

              <form className="mt-8 relative" onSubmit={(e) => handleSubmit(e)}>
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
                  <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
                    Resource Type:
                  </label>

                  <select
                    required
                    name="department"
                    id="department"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                    onChange={(e) => {
                      setResourceType(e.target.value);
                    }}
                    defaultValue={resourceTypes[0].name}
                  >
                    <option selected disabled>
                      Select Type
                    </option>
                    {resourceTypes.map((type, index) => (
                      <option value={type.name} key={index}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                    File:
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept=".pdf"
                    required
                    onChange={(e) => {
                      setFile(e.target?.files?.[0]);
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <div className="flex space-x-2">
                      {isLoading && <Spinner />}
                      <span>Add Resource</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewResource;
