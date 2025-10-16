import { Table } from "@/components/admin/Table";
import { Totals } from "@/components/admin/Totals";
import { User } from "@/components/admin/User";
import { getBookings } from "@/lib/bookings";
import { getSessions } from "@/lib/sessions";

import { TimeSlot } from "@/utils/timeSlots";
import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";

export default async function Admin() {
  const user = await getUserOrRedirect();
  if (!user) return null;

  const bookings = await getBookings();
  const sessions = await getSessions();

  return (
    <section className="space-y-8">
      <User />

      <Totals bookings={bookings} sessions={sessions} />

      <Table
        bookings={bookings}
        sessions={sessions}
        currentTimeSlot={TimeSlot.DAY_1_MORNING}
      />
      <Table
        bookings={bookings}
        sessions={sessions}
        currentTimeSlot={TimeSlot.DAY_1_AFTERNOON}
      />

      <Table
        bookings={bookings}
        sessions={sessions}
        currentTimeSlot={TimeSlot.DAY_2_MORNING}
      />
      <Table
        bookings={bookings}
        sessions={sessions}
        currentTimeSlot={TimeSlot.DAY_2_AFTERNOON}
      />
      <Table
        bookings={bookings}
        sessions={sessions}
        currentTimeSlot={TimeSlot.DAY_2_EVENING}
      />
    </section>
  );
}
