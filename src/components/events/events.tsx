import React from "react";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
import NewEvent from "./new-event";
import DeleteEvent from "./delete-events";
// Create Event
export async function createEvent(newEvent: any) {
  "use server";
  try {
    await prisma.event.create({
      data: {
        title_en: newEvent.title_en,
        title_am: newEvent.title_am,
        description_en: newEvent.description_en,
        description_am: newEvent.description_am,
        banner_en: newEvent.banner_en,
        banner_am: newEvent.banner_am,
        link: newEvent.link,
        endDate: new Date(newEvent.endDate),
      },
    });
    revalidatePath("/admin/events");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Edit Event
export async function editEvent(updatedEvent: any) {
  "use server";
  try {
    await prisma.event.update({
      where: { id: updatedEvent.id },
      data: {
        title_en: updatedEvent.title_en,
        title_am: updatedEvent.title_am,
        description_en: updatedEvent.description_en,
        description_am: updatedEvent.description_am,
        banner_en: updatedEvent.banner_en,
        banner_am: updatedEvent.banner_am,
        link: updatedEvent.link,
        endDate: new Date(updatedEvent.endDate),
      },
    });
    revalidatePath("/admin/events");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Delete Event
export async function deleteEvent(eventId: number) {
  "use server";
  try {
    await prisma.event.delete({ where: { id: eventId } });
    revalidatePath("/admin/events");
  } catch (error) {
    console.error(error);
  }
}
const Events = async () => {
  const events = await prisma.event.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col justify-center">
      <div className="text-center">
        <h1 className="text-3xl text-blue-400 my-12">Events</h1>
      </div>

      <div className="justify-end px-52">
        <NewEvent createEvent={createEvent} />

        <table className="table-auto mx-auto w-full my-4 border border-collapse">
          <thead>
            <tr>
              <th className="p-6 font-bold border">No</th>
              <th className="p-6 font-bold border">Title (EN)</th>
              <th className="p-6 font-bold border">End Date</th>
              <th className="p-6 font-bold border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, index) => (
              <tr key={ev.id}>
                <td className="p-6 border">{index + 1}</td>
                <td className="p-6 border">{ev.title_en}</td>
                <td className="p-6 border ">{ev.endDate.toDateString()}</td>
                <td className="p-6 border">
                  <div className="flex flex-row gap-3 justify-center">
                    <NewEvent createEvent={createEvent} editEvent={editEvent} existingEvent={ev} />
                    <DeleteEvent event={ev} deleteEvent={deleteEvent} />
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

export default Events;
