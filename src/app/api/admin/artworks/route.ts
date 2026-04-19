import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createArtwork,
  deleteArtwork,
  listArtworks,
  updateArtwork,
} from "@/lib/artwork-db";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionValue } from "@/lib/admin-auth";
import type { ArtworkFormPayload } from "@/types/artwork";

type UpdatePayload = ArtworkFormPayload & { id: number };
type DeletePayload = { id: number };

export const dynamic = "force-dynamic";

async function ensureAuthorized() {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSessionValue(sessionValue)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const unauthorizedResponse = await ensureAuthorized();
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    return NextResponse.json({ items: listArtworks() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load artworks";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorizedResponse = await ensureAuthorized();
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

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
  const unauthorizedResponse = await ensureAuthorized();
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

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
  const unauthorizedResponse = await ensureAuthorized();
  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const payload = (await request.json()) as DeletePayload;
    deleteArtwork(payload.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete artwork";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
