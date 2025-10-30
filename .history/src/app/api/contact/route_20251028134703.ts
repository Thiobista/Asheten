import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // TODO: send email or store in DB. For now, log to server.
    console.log("Contact submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

