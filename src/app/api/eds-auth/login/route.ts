import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionValue,
  getAdminCredentials,
  getAdminSessionMaxAge,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = typeof body?.username === "string" ? body.username.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    const credentials = getAdminCredentials();

    if (!credentials.username || !credentials.password) {
      return NextResponse.json(
        { message: "Admin credentials are not configured yet." },
        { status: 500 }
      );
    }

    if (username !== credentials.username || password !== credentials.password) {
      return NextResponse.json(
        { message: "Username or password is incorrect." },
        { status: 401 }
      );
    }

    const sessionValue = createAdminSessionValue(username);
    const cookieStore = await cookies();

    cookieStore.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionValue,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getAdminSessionMaxAge(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Unable to sign in right now." }, { status: 500 });
  }
}
