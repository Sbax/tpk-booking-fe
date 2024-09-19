import { DeleteBooking } from "@/components/DeleteBooking";

export default function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <section className="mt-4">
        <DeleteBooking />
      </section>
    </>
  );
}
