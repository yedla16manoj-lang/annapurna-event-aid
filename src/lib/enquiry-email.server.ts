const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
export const NOTIFY_TO = "yedla16manoj@gmail.com";

export type EnquiryEmailData = {
  id: string;
  fullName: string;
  phone: string;
  eventType: string;
  eventDate?: string | undefined;
  guestCount?: number | undefined;
  services: string[];
  message?: string | undefined;
  language: "en" | "te";
  createdAt: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiryNotification(d: EnquiryEmailData): Promise<{ sent: boolean; error?: string }> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  if (!lovableKey || !resendKey) {
    console.error("[enquiry-email] Missing LOVABLE_API_KEY or RESEND_API_KEY");
    return { sent: false, error: "not_configured" };
  }
  const rows: [string, string][] = [
    ["Customer name", d.fullName],
    ["Phone number", `+91 ${d.phone}`],
    ["Event type", d.eventType],
    ["Event date", d.eventDate || "Not provided"],
    ["Number of guests", d.guestCount != null ? String(d.guestCount) : "Not provided"],
    ["Services required", d.services.join(", ")],
    ["Message / requirements", d.message || "None"],
    ["Form language", d.language === "te" ? "Telugu" : "English"],
    ["Submitted at", new Date(d.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
    ["Enquiry ID", d.id],
  ];
  const html = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#222">
<h2 style="color:#6b1424;margin:0 0 12px">New Quotation Request</h2>
<p style="margin:0 0 16px">A customer submitted the quote form on your website.</p>
<table style="border-collapse:collapse;width:100%">${rows
    .map(([k, v]) => `<tr><td style="padding:8px;border:1px solid #e5ddd0;background:#faf6ee;font-weight:bold;width:40%">${esc(k)}</td><td style="padding:8px;border:1px solid #e5ddd0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>
<p style="margin-top:16px"><a href="tel:+91${esc(d.phone)}">Call customer</a> &nbsp;|&nbsp; <a href="https://wa.me/91${esc(d.phone)}">WhatsApp customer</a></p></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  try {
    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
        "Idempotency-Key": `enquiry-${d.id}`,
      },
      body: JSON.stringify({
        from: "Annapurna Website <onboarding@resend.dev>",
        to: [NOTIFY_TO],
        subject: "New Quotation Request – Annapurna Tent House and Caterings",
        html,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[enquiry-email] Resend failed [${res.status}]: ${body}`);
      return { sent: false, error: `status_${res.status}` };
    }
    return { sent: true };
  } catch (e) {
    console.error("[enquiry-email] Request error", e);
    return { sent: false, error: "network" };
  }
}
