import React from "react";
import FileOpen from "../ui/file-open";
import NewResource from "./new-resource";
import { Resource as IResource } from "@/types";
import { ResourceType as IResourceType } from "@/types";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import ResourceTypes from "./resource-types";
import { toast, Toaster } from "sonner";
import { FILE_MODULE } from "@/lib/enums";
import EditResource from "./edit-resource";
import DeleteResource from "./delete-resource";

export async function createResource(newResource: IResource) {
  "use server";
  try {
    await prisma.resource.create({ data: newResource });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
export async function createNewResourceType(newResourceType: IResourceType) {
  "use server";
  try {
    await prisma.resourceType.create({ data: newResourceType });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
const resourcesTypes = await prisma.resourceType.findMany();
const Resources = async () => {
  const resources = await prisma.resource.findMany();

  async function editResource(resource: IResource) {
    "use server";
    try {
      await prisma.resource.update({
        where: { id: resource.id },
        data: {
          title: resource.title,
          path: resource.path,
          type: resource.type,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteResource(resourceId: string) {
    "use server";
    try {
      await prisma.resource.delete({
        where: { id: resourceId },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteResourceType(resourceTypeId: string) {
    "use server";
    try {
      await prisma.resourceType.delete({
        where: { id: resourceTypeId },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center ">
      <Toaster position="top-right" richColors />
      <div className="text-center">
        <h1 className="text-3xl text-blue-400  my-12">Other Resource Documents</h1>
      </div>

      <div className="justify-end px-52">
        <div className="flex flex-row justify-end">
          <NewResource createResource={createResource} resourceTypes={resourcesTypes} />
          <ResourceTypes createNewResourceType={createNewResourceType} resourceTypes={resourcesTypes} deleteResourceType={deleteResourceType} />
        </div>

        <table className="table-auto mx-auto w-full my-4 border border-collapse ">
          <thead>
            <tr>
              <th className="p-6 font-bold border">Title</th>
              <th className="p-0 font-bold border">Resource Type</th>
              <th className="p-6 font-bold border">File Name</th>
              <th className="p-6 font-bold border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="p-6 border">{resource.title}</td>
                <td className="p-6 border">{resource.type}</td>
                <td className="p-6 border">{JSON.parse(resource.path)?.originalName}</td>

                <td className="p-6 border">
                  <div className="flex flex-row gap-3">
                    {" "}
                    <FileOpen apiUrl={FILE_MODULE.RESOURCE} filePath={JSON.parse(resource.path)?.filePath} />
                    <EditResource resource={resource} editResource={editResource} resourceTypes={resourcesTypes} />
                    <DeleteResource resource={resource} deleteResource={deleteResource} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resources;
