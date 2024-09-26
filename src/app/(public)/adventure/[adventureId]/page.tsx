import { AdventureCard } from "@/components/AdventureCard";
import { BookingForm } from "@/components/BookingForm";
import { getAdventures } from "@/lib/adventures";
import { Adventure } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default async function AdventureSelected({
  params,
}: {
  params: { adventureId: Adventure["id"] };
}) {
  const { adventureId } = params;
  const adventures = await getAdventures();
  const selectedAdventure = adventures.find(({ id }) => id === adventureId);

  return (
    <>
      {!selectedAdventure && (
        <p>L&apos;avventura selezionata non è disponibile!</p>
      )}

      <section className="flex items-center space-x-4 my-4">
        <Link href="/">
          <button type="button" className="btn">
            <ArrowLeftIcon className="w-6 h-6" />
            Scegli un&apos;altra sessione
          </button>
        </Link>
      </section>

      {selectedAdventure && (
        <>
          <AdventureCard {...selectedAdventure} expanded />

          <BookingForm selectedAdventure={selectedAdventure} />
        </>
      )}
    </>
  );
}
