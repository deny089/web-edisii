import { NextResponse } from "next/server";
import {
  createArtwork,
  deleteArtwork,
  listArtworks,
  updateArtwork,
} from "@/lib/artwork-db";
import type { ArtworkFormPayload } from "@/types/artwork";

type UpdatePayload = ArtworkFormPayload & { id: number };
type DeletePayload = { id: number };

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: listArtworks() });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ArtworkFormPayload;
    const item = createArtwork(payload);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create artwork";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const payload = (await request.json()) as UpdatePayload;
    const { id, ...form } = payload;
    const item = updateArtwork(id, form);
    return NextResponse.json({ item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update artwork";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = (await request.json()) as DeletePayload;
    deleteArtwork(payload.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete artwork";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
