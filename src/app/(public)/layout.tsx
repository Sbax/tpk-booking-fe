import { PageTitle } from "@/components/PageTitle";
import { Booking } from "@/types";

export default async function PublicLayout({
  children,
}: Readonly<{
  params: { bookingId: Booking["id"] };
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageTitle title="Prenota una sessione" />
      {children}
    </>
  );
}
