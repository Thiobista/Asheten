import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

async function sendWithResend({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error:
        "Email not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL in .env.local",
    } as const;
  }
  if (!to) {
    return {
      ok: false,
      status: 500,
      error: "Missing CONTACT_TO_EMAIL in env.",
    } as const;
  }

  const subject = `New contact message from ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: email,
    }),
  });

  if (!res.ok) {
    const errJson = await res.json().catch(() => ({} as any));
    return {
      ok: false,
      status: 502,
      error: errJson?.message || "Failed to send email via Resend",
    } as const;
  }

  return { ok: true as const };
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

    const result = await sendWithResend({ name, email, message });
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

