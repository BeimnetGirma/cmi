import React from "react";
import NewService from "./new-service";
import EditService from "./edit-service";
import DeleteService from "./delete-service";
// import { Service as IService } from "@/types";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { Prisma, Service } from "@prisma/client";
export async function createService(newService: Prisma.ServiceCreateInput) {
  "use server";
  try {
    await prisma.service.create({
      data: {
        slug: newService.slug,
        imageUrl: newService.imageUrl,
        backgroundImageUrl: newService.backgroundImageUrl,
        translations: {
          create: Array.isArray(newService.translations)
            ? newService.translations.map((t) => ({
                language: t.language,
                title: t.title,
                summary: t.summary,
                content: t.content,
              }))
            : [],
        },
        subservices: {
          create: Array.isArray(newService.subservices)
            ? newService.subservices.map((s) => ({
                order: s.order,
                link: s.link,
                translations: {
                  create: Array.isArray(s.translations)
                    ? s.translations.map((st: any) => ({
                        language: st.language,
                        title: st.title,
                        description: st.description,
                      }))
                    : [],
                },
              }))
            : [],
        },
      },
    });

    revalidatePath("/admin");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function editService(updatedService: any) {
  "use server";

  try {
    await prisma.service.update({
      where: { id: updatedService.id },
      data: {
        slug: updatedService.slug,
        imageUrl: updatedService.imageUrl,
        backgroundImageUrl: updatedService.backgroundImageUrl,

        // Replace translations (cascade will handle child cleanup)
        translations: {
          deleteMany: {},
          create: updatedService.translations.map((t: any) => ({
            language: t.language,
            title: t.title,
            summary: t.summary,
            content: t.content,
          })),
        },

        // Replace subservices (cascade will handle subservice translations)
        subservices: {
          deleteMany: {},
          create: updatedService.subservices.map((s: any) => ({
            order: s.order,
            link: s.link,
            translations: {
              create: s.translations.map((st: any) => ({
                language: st.language,
                title: st.title,
                description: st.description,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/admin/services");
    return true;
  } catch (error) {
    console.error("Error updating service:", error);
    return false;
  }
}
//Delete service function
async function deleteService(serviceId: string) {
  "use server";
  try {
    await prisma.service.delete({
      where: { id: serviceId },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
  }
}
const Services = async () => {
  const services = await prisma.service.findMany({
    include: {
      translations: true,
      subservices: {
        include: { translations: true },
      },
    },
  });

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
                {/* <th className="p-6 font-bold border">Link</th> */}
                <th className="p-6 font-bold border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => {
                const enTitle = service.translations.find((t) => t.language === "en")?.title || "";
                return (
                  <tr key={service.id}>
                    <td className="p-6 border">{index + 1}</td>
                    <td className="p-6 border">{enTitle}</td>
                    {/* <td className="p-6 border">{service.link ? service.link : "No Link Provided"}</td> */}
                    <td className="p-6 border">
                      <div className="flex flex-row gap-3 justify-center">
                        <NewService
                          createService={createService}
                          editService={editService}
                          existingService={{
                            ...service,
                            translations: service.translations.map((t) => ({
                              ...t,
                              summary: t.summary === null ? undefined : t.summary,
                            })),
                            subservices: service.subservices.map((s) => ({
                              ...s,
                              translations: s.translations.map((st) => ({
                                ...st,
                                description: st.description === null ? undefined : st.description,
                              })),
                            })),
                          }}
                        />
                        <DeleteService service={service} deleteService={deleteService} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Services;
