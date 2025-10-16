"use client";

import { BookingForm } from "@/components/booking/BookingForm";
import { Loader } from "@/components/Loader";
import { SessionCard } from "@/components/session/SessionCard";
import { useSessions } from "@/hooks/useSessions";
import { Session } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

const BackButton = () => {
  const t = useTranslations("SessionSelected");

  return (
    <section className="flex items-center space-x-4 my-4">
      <Link href="/">
        <button type="button" className="btn">
          <ArrowLeftIcon className="w-6 h-6" />
          {t("backButton")}
        </button>
      </Link>
    </section>
  );
};

export default function SessionSelected({
  params,
}: {
  params: { sessionId: Session["id"] };
}) {
  const t = useTranslations("SessionSelected");

  const { sessionId } = params;

  const { data: sessions, loading, error } = useSessions();

  const selectedSession = useMemo(() => {
    return sessions?.find(({ id }) => id === sessionId);
  }, [sessions, sessionId]);

  if (loading) {
    return <Loader />;
  }

  if (!selectedSession || error) {
    return <p>{t("notFound")}</p>;
  }

  return (
    <>
      <BackButton />

      {selectedSession && (
        <>
          <SessionCard {...selectedSession} expanded />

          {selectedSession.availableSeats === 0 ? (
            <section className="mt-4">
              <p>
                <strong>{t("noSeatsAvailable")}</strong>
              </p>
              <BackButton />
            </section>
          ) : (
            <BookingForm selectedSession={selectedSession} />
          )}
        </>
      )}
    </>
  );
}
