import { NextResponse } from "next/server";
import { getAdventures } from "@/lib/adventures";

export async function GET() {
  try {
    const adventures = await getAdventures();
    return NextResponse.json(adventures, {
      status: 200,
      headers: new Headers({
        "Cache-Control": "public, max-age=60, immutable",
      }),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
