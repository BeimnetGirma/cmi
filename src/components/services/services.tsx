import React from "react";
import NewService from "./new-service";
import EditService from "./edit-service";
import DeleteService from "./delete-service";
import { Service as IService } from "@/types";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
export async function createService(newService: IService) {
  "use server";
  try {
    await prisma.service.create({ data: newService });

    revalidatePath("/admin");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const Services = async () => {
  const services = await prisma.service.findMany();
  async function editService(service: IService) {
    "use server";
    try {
      await prisma.service.update({
        where: { id: service.id },
        data: {
          title: service.title,
          content: service.content,
          image: service.image,
          link: service.link,
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteService(serviceId: string) {
    "use server";
    try {
      await prisma.service.delete({
        where: { id: serviceId },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="text-center">
          <h1 className="text-3xl text-blue-400  my-12">Services</h1>
        </div>

        <div className="justify-end px-52">
          <NewService createService={createService} />
          <table className="table-auto mx-auto w-full my-4 border border-collapse ">
            <thead>
              <tr>
                <th className="p-6 font-bold border">No</th>
                <th className="p-6 font-bold border">Service Name</th>
                <th className="p-6 font-bold border">Link</th>
                <th className="p-6 font-bold border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td className="p-6 border">{index + 1}</td>
                  <td className="p-6 border">{service.title}</td>
                  <td className="p-6 border">{service.link ? service.link : "No Link Provided"}</td>
                  <td className="p-6 border">
                    <div className="flex flex-row gap-3 justify-center">
                      <EditService service={service} editService={editService} />
                      <DeleteService service={service} deleteService={deleteService} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Services;
