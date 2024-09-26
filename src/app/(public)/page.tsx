import { AdventureSelector } from "@/components/AdventureSelector";
import { getAdventures } from "@/lib/adventures";

export default async function Home() {
  const adventures = await getAdventures();

  return (
    <AdventureSelector
      adventures={adventures.filter(
        ({ availableSeats }) => availableSeats !== 0
      )}
    />
  );
}
