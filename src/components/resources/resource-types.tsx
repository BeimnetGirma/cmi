"use client";
import useLoading from "@/hooks/useLoading";
import React, { useState } from "react";
import Spinner from "../ui/spinner";
import { ResourceType } from "@/types";
import { toast, Toaster } from "sonner";
import { set } from "date-fns";
type NewResourceTypeProps = {
  createNewResourceType: (resourceType: ResourceType) => void;
  resourceTypes: ResourceType[];
  deleteResourceType: (id: string) => void;
};
const ResourceTypes = ({ createNewResourceType, resourceTypes, deleteResourceType }: NewResourceTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [resourceTypesState, setResourceTypesState] = useState(resourceTypes);
  const [name, setName] = useState("");
  const [name_am, setNameAm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // get resource types

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (name === "") return;
    startLoading();
    const newResourceType: ResourceType = {
      name: name,
      name_am: name_am,
    };
    try {
      createNewResourceType(newResourceType);
      toast.success("Created resource type successfully", {
        duration: 3000,
      });
      setResourceTypesState([...resourceTypesState, newResourceType]);
      setName("");
      setNameAm("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create resource type", {
        duration: 3000,
      });
    }
    stopLoading();
  };
  const handleDelete = async (id: any) => {
    if (id) {
      deleteResourceType(id);
      // Optionally, fetch updated resourceTypes from parent or API here
      setResourceTypesState(resourceTypes.filter((rt) => rt.id !== id));
      toast.success("Deleted resource type successfully", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <button className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-md py-2  m-2 px-8 item-center" onClick={openModal}>
        Resource Types
      </button>
      {isOpen && (
        <div>
          <div className="fixed inset-0 felx items-center justify-center">
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50"></div>
            {/* <div className="absolute inset-0 bg-white "></div> */}
            <div className=" fixed bg-white p-6 rounded-lg w-2/4 shadow-1g z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  max-h-[80vh] overflow-y-auto">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Add your modal content here */}
              <h1 className="text-slate-900 text-3xl relative ">Resource Types</h1>
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddForm((prev) => !prev)}
                  className={`font-bold py-2 px-4 rounded mb-4 text-white ${showAddForm ? "bg-gray-500 hover:bg-gray-700" : "bg-green-500 hover:bg-green-700"}`}
                >
                  {showAddForm ? "Cancel" : "New Type"}
                </button>
              </div>
              {showAddForm && (
                <form className="mt-5 relative" onSubmit={(e) => handleSubmit(e)}>
                  <fieldset className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <legend className="text-sm font-semibold mb-4">Add New Resource Type</legend>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Resource Type Name (English):
                      </label>
                      <input
                        required
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                        placeholder="e.g., Manuals"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="nameAm" className="block text-gray-700 text-sm font-bold mb-2">
                        የምንጭ አይነት ስም (አማርኛ):
                      </label>
                      <input
                        required
                        type="text"
                        id="nameAm"
                        value={name_am}
                        onChange={(e) => setNameAm(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
                        placeholder="ማኑዋል"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                        {isLoading ? <Spinner /> : "Add Resource Type"}
                      </button>
                    </div>
                  </fieldset>
                </form>
              )}
              <table className="table-auto mx-auto w-full my-4 border border-collapse z-10">
                <thead>
                  <tr>
                    <th className="p-6 font-bold border">Id</th>
                    <th className="p-6 font-bold border">Name</th>
                    <th className="p-6 font-bold border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resourceTypesState.map((resourceType, index) => (
                    <tr key={index}>
                      <td className="p-6 border text-center">{index + 1}</td>
                      <td className="p-6 border">{resourceType.name}</td>

                      <td className="p-6 border text-center">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this resource type?")) {
                              handleDelete(resourceType.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceTypes;
