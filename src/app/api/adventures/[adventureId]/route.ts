import { NextResponse } from "next/server";
import { getAdventures } from "@/lib/adventures";
import { Adventure } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { adventureId: Adventure["id"] } }
) {
  try {
    const adventures = await getAdventures();
    const adventure = adventures.find(({ id }) => id === params.adventureId);

    console.log({ adventures: adventures.map(({ id }) => id) });

    if (!adventure) {
      return NextResponse.json(
        { error: "Adventure not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(adventure, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
