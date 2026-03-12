export interface ContactEmailData {
  type: "consultation" | "pdf-download";
  name?: string;
  email: string;
  organization?: string;
  phone?: string;
  regionName: string;
  score: number;
  stufe: string;
  answers: Record<number, number>;
  analogeProzesse: string[];
  teilweiseDigitaleProzesse: string[];
}

export function buildInternalNotificationHtml(data: ContactEmailData): string {
  const answerRows = Object.entries(data.answers)
    .map(
      ([id, val]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0;">Prozess ${id}</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${val === 0 ? "Digital" : val === 1 ? "Teilweise" : "Analog"}</td></tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#0f172a;max-width:640px;margin:0 auto;padding:24px;">
  <div style="background:#1d4ed8;color:white;padding:20px 24px;border-radius:12px 12px 0 0;">
    <h1 style="margin:0;font-size:20px;">ÖGD Zukunftscheck — Neue Anfrage</h1>
    <p style="margin:4px 0 0;opacity:0.85;font-size:14px;">${data.type === "consultation" ? "Beratungsgespräch gewünscht" : "PDF-Download"}</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;">
    <h2 style="font-size:16px;margin:0 0 12px;">Kontaktdaten</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      ${data.name ? `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Name</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.name}</td></tr>` : ""}
      <tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">E-Mail</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.email}</td></tr>
      ${data.organization ? `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Organisation</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.organization}</td></tr>` : ""}
      ${data.phone ? `<tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Telefon</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.phone}</td></tr>` : ""}
    </table>

    <h2 style="font-size:16px;margin:20px 0 12px;">Assessment-Ergebnis</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      <tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Region</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.regionName}</td></tr>
      <tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Score</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.score}/20</td></tr>
      <tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Stufe</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.stufe}</td></tr>
      <tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Analog</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.analogeProzesse.join(", ") || "—"}</td></tr>
      <tr><td style="padding:6px 12px;border:1px solid #e2e8f0;font-weight:600;">Teilweise</td><td style="padding:6px 12px;border:1px solid #e2e8f0;">${data.teilweiseDigitaleProzesse.join(", ") || "—"}</td></tr>
    </table>

    <h2 style="font-size:16px;margin:20px 0 12px;">Einzelantworten</h2>
    <table style="border-collapse:collapse;width:100%;font-size:14px;">
      <tr><th style="padding:6px 12px;border:1px solid #e2e8f0;text-align:left;">Prozess</th><th style="padding:6px 12px;border:1px solid #e2e8f0;text-align:left;">Status</th></tr>
      ${answerRows}
    </table>
  </div>
</body>
</html>`;
}

export function buildUserConfirmationHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,-apple-system,sans-serif;color:#0f172a;max-width:640px;margin:0 auto;padding:24px;">
  <div style="background:#1d4ed8;color:white;padding:20px 24px;border-radius:12px 12px 0 0;">
    <h1 style="margin:0;font-size:20px;">ÖGD Zukunftscheck</h1>
    <p style="margin:4px 0 0;opacity:0.85;font-size:14px;">Ihre Ergebnisse</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
    <p style="font-size:15px;line-height:1.6;">
      ${data.name ? `Guten Tag ${data.name},` : "Guten Tag,"}
    </p>
    <p style="font-size:15px;line-height:1.6;">
      vielen Dank für Ihre Teilnahme am ÖGD Zukunftscheck. Ihr Ergebnis für die Region <strong>${data.regionName}</strong>:
    </p>
    <div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0;text-align:center;">
      <p style="font-size:32px;font-weight:700;margin:0;color:#1d4ed8;">${data.score}/20</p>
      <p style="font-size:14px;color:#64748b;margin:4px 0 0;">${data.stufe}</p>
    </div>
    ${data.type === "consultation" ? `<p style="font-size:15px;line-height:1.6;">Wir haben Ihre Anfrage erhalten und melden uns zeitnah bei Ihnen, um Ihre Ergebnisse zu besprechen und Handlungsempfehlungen zu geben.</p>` : `<p style="font-size:15px;line-height:1.6;">Vielen Dank für Ihr Interesse. Wir haben Ihre Daten erhalten.</p>`}
    <p style="font-size:13px;color:#64748b;margin-top:24px;">
      Diese E-Mail wurde automatisch generiert. Bei Fragen antworten Sie einfach auf diese Nachricht.
    </p>
  </div>
</body>
</html>`;
}
