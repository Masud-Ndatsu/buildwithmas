import { z } from "zod";

export const projectTypes = [
  "New product",
  "Backend & infrastructure",
  "AI features",
  "Improve existing product",
  "Other",
] as const;

export const budgets = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  projectType: z.enum(projectTypes, { message: "Please choose a project type." }),
  budget: z.enum(budgets).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Please tell me a little more (at least 20 characters).")
    .max(5000),
});

export type ContactField = keyof z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Record<string, string>;
};
