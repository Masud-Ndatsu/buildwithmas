"use client";

import { useActionState, useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { budgets, projectTypes, type ContactState } from "@/lib/contact-schema";
import { sendContact } from "./actions";

const initial: ContactState = { status: "idle" };
const field =
  "mt-2 w-full rounded-lg border border-line bg-background px-4 py-3 text-base outline-none focus:border-accent aria-[invalid=true]:border-red-700";

export function ContactForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (state.status === "success") track("contact_submitted");
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p role="status" className="display text-3xl">
        Thanks — I reply within 48 hours.
      </p>
    );
  }

  const v = state.values ?? {};
  const err = state.errors ?? {};
  const errorText = (id: string, text?: string) =>
    text ? (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
        {text}
      </p>
    ) : null;

  return (
    <form
      action={(fd) => {
        // Set at submit time: React resets uncontrolled inputs after each action.
        fd.set("startedAt", String(startedAt.current));
        return action(fd);
      }}
      noValidate className="flex max-w-[640px] flex-col gap-6">
      {state.message ? (
        <p role="alert" className="rounded-lg border border-red-700 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="label">Name</label>
        <input id="name" name="name" autoComplete="name" required defaultValue={v.name}
          aria-invalid={!!err.name} aria-describedby={err.name ? "name-error" : undefined} className={field} />
        {errorText("name", err.name)}
      </div>

      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email}
          aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} className={field} />
        {errorText("email", err.email)}
      </div>

      <div>
        <label htmlFor="projectType" className="label">Project type</label>
        <select id="projectType" name="projectType" required defaultValue={v.projectType ?? ""}
          aria-invalid={!!err.projectType} aria-describedby={err.projectType ? "projectType-error" : undefined} className={field}>
          <option value="" disabled>Choose one</option>
          {projectTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
        {errorText("projectType", err.projectType)}
      </div>

      <div>
        <label htmlFor="budget" className="label">Budget range (optional)</label>
        <select id="budget" name="budget" defaultValue={v.budget ?? ""} className={field}>
          <option value="">Prefer not to say</option>
          {budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" name="message" rows={6} required defaultValue={v.message}
          aria-invalid={!!err.message} aria-describedby={err.message ? "message-error" : undefined} className={field} />
        {errorText("message", err.message)}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={pending} className="btn btn-solid disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-muted">
          Or email{" "}
          <a href={`mailto:${email}`} className="link-line">{email}</a>
        </p>
      </div>
    </form>
  );
}
