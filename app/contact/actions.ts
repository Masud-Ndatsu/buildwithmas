"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, type ContactField, type ContactState } from "@/lib/contact-schema";
import { siteName } from "@/lib/site";

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

// In-memory limiter: per server instance, so it is a best-effort brake on
// bursts rather than a hard guarantee on serverless.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const values = {
    name: raw.name ?? "",
    email: raw.email ?? "",
    projectType: raw.projectType ?? "",
    budget: raw.budget ?? "",
    message: raw.message ?? "",
  };

  // Honeypot: bots fill it. Pretend it worked so they do not retry.
  if (raw.website) return { status: "success" };

  const started = Number(raw.startedAt);
  if (!started || Date.now() - started < MIN_FILL_MS) {
    return {
      status: "error",
      message: "That was a little quick. Please try again.",
      values,
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return {
      status: "error",
      message: "Too many messages. Please wait a few minutes or email me directly.",
      values,
    };
  }

  const parsed = contactSchema.safeParse({
    ...values,
    budget: values.budget || undefined,
  });
  if (!parsed.success) {
    const errors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return {
      status: "error",
      message: "The form is unavailable right now. Please email me directly.",
      values,
    };
  }

  const { name, email, projectType, budget, message } = parsed.data;
  const from = process.env.CONTACT_FROM_EMAIL ?? `${siteName} <onboarding@resend.dev>`;
  const resend = new Resend(apiKey);

  try {
    const notify = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry: ${projectType} — ${name}`,
      text: `From: ${name} <${email}>\nProject type: ${projectType}\nBudget: ${budget ?? "—"}\n\n${message}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p>Project type: ${esc(projectType)}<br>Budget: ${esc(budget ?? "—")}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    if (notify.error) throw new Error(notify.error.message);

    // Auto-reply is a courtesy; its failure must not fail the submission.
    await resend.emails
      .send({
        from,
        to: email,
        subject: "Thanks for getting in touch",
        text: `Hi ${name},\n\nThanks for your message. I've received it and will reply within 48 hours.\n\nMas'ud`,
      })
      .catch((e) => console.error("Contact auto-reply failed", e));
  } catch (e) {
    console.error("Contact form send failed", e);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please email me directly.",
      values,
    };
  }

  return { status: "success" };
}
