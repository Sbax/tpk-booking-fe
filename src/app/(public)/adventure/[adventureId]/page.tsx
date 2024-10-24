"use client";

import { AdventureCard } from "@/components/AdventureCard";
import { BookingForm } from "@/components/BookingForm";
import { Loader } from "@/components/Loader";
import { useAdventures } from "@/hooks/useAdventures";
import { Adventure } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useMemo } from "react";

const BackButton = () => (
  <section className="flex items-center space-x-4 my-4">
    <Link href="/">
      <button type="button" className="btn">
        <ArrowLeftIcon className="w-6 h-6" />
        Scegli un&apos;altra sessione
      </button>
    </Link>
  </section>
);

export default function AdventureSelected({
  params,
}: {
  params: { adventureId: Adventure["id"] };
}) {
  const { adventureId } = params;

  const { data: adventures, loading, error } = useAdventures();

  const selectedAdventure = useMemo(() => {
    return adventures?.find(({ id }) => id === adventureId);
  }, [adventures, adventureId]);

  if (loading) {
    return <Loader />;
  }

  if (!selectedAdventure || error) {
    return <p>L&apos;avventura selezionata non è disponibile!</p>;
  }

  return (
    <>
      <BackButton />

      {selectedAdventure && (
        <>
          <AdventureCard {...selectedAdventure} expanded />

          {selectedAdventure.availableSeats === 0 ? (
            <section className="mt-4">
              <p>
                <strong>
                  Questa avventura non ha altri posti disponibili!
                </strong>
              </p>
              <BackButton />
            </section>
          ) : (
            <BookingForm selectedAdventure={selectedAdventure} />
          )}
        </>
      )}
    </>
  );
}
