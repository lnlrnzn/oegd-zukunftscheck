import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildInternalNotificationHtml,
  buildUserConfirmationHtml,
  type ContactEmailData,
} from "@/lib/email-templates";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "E-Mail-Service ist nicht konfiguriert." },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);
    const body = await request.json();

    const {
      type,
      name,
      email,
      organization,
      phone,
      regionName,
      score,
      stufe,
      answers,
      analogeProzesse,
      teilweiseDigitaleProzesse,
    } = body as ContactEmailData;

    if (!email || !regionName || score === undefined) {
      return NextResponse.json(
        { error: "E-Mail, Region und Score sind erforderlich." },
        { status: 400 }
      );
    }

    const emailData: ContactEmailData = {
      type: type || "consultation",
      name,
      email,
      organization,
      phone,
      regionName,
      score,
      stufe,
      answers,
      analogeProzesse: analogeProzesse || [],
      teilweiseDigitaleProzesse: teilweiseDigitaleProzesse || [],
    };

    const toEmail = process.env.CONTACT_EMAIL_TO || "kontakt@firma.de";
    const fromEmail = process.env.CONTACT_EMAIL_FROM || "noreply@firma.de";

    // Send both emails in parallel (async-parallel)
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `ÖGD Zukunftscheck: ${type === "consultation" ? "Beratungsanfrage" : "PDF-Download"} — ${organization || email}`,
        html: buildInternalNotificationHtml(emailData),
      }),
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Ihre ÖGD Zukunftscheck Ergebnisse",
        html: buildUserConfirmationHtml(emailData),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Beim Senden ist ein Fehler aufgetreten." },
      { status: 500 }
    );
  }
}
