import { getAdventures } from "@/lib/adventures";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const adventures = await getAdventures();

    return NextResponse.json(adventures);
  } catch (error) {
    console.error("Errore durante la prenotazione:", error);
    return NextResponse.json(
      { error: "Errore durante la prenotazione" },
      { status: 500 }
    );
  }
}
