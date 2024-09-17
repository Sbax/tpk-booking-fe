"use client";

import { AdventureCard } from "@/components/AdventureCard";
import { AdventureSelector } from "@/components/AdventureSelector";
import { BookingForm } from "@/components/BookingForm";
import { Adventure, BookingFormInputs } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

type BookingWizardProps = {
  adventures: Adventure[];
  onSubmit: SubmitHandler<BookingFormInputs>;
  defaultBooking?: Partial<BookingFormInputs>;
};

export const BookingWizard: React.FC<BookingWizardProps> = ({
  adventures,
  onSubmit,
  defaultBooking,
}) => {
  const [selectedAdventureId, setSelectedAdventureId] = useState<
    Adventure["id"] | null
  >(defaultBooking?.adventureId || null);

  const selectedAdventure = adventures.find(
    (adventure) => adventure.id === selectedAdventureId
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedAdventure]);

  return (
    <section className="space-y-4">
      {!selectedAdventure ? (
        <AdventureSelector
          adventures={adventures}
          onAdventureSelect={(id) => setSelectedAdventureId(id)}
          selectedAdventure={selectedAdventure}
        />
      ) : (
        <>
          <section className="flex space-x-4">
            <button
              type="button"
              onClick={() => setSelectedAdventureId(null)}
              className="btn"
            >
              <ArrowLeftIcon className="w-6 h-6" />
              Scegli un'altra sessione
            </button>
          </section>

          <AdventureCard {...selectedAdventure} expanded />

          <BookingForm
            onSubmit={(data) =>
              onSubmit({ ...data, adventureId: selectedAdventure.id })
            }
            defaultBooking={defaultBooking}
            availableSeats={selectedAdventure.availableSeats}
          />
        </>
      )}
    </section>
  );
};
