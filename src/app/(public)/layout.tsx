import { PageTitle } from "@/components/PageTitle";
import { Booking } from "@/types";
import { useTranslations } from "next-intl";

export default function PublicLayout({
  children,
}: Readonly<{
  params: { bookingId: Booking["id"] };
  children: React.ReactNode;
}>) {
  const t = useTranslations("Session");

  return (
    <>
      <PageTitle title={t("title")} />
      {children}
    </>
  );
}
