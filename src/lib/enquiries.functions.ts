import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const eventTypes = [
  "Wedding / Marriage",
  "Engagement",
  "Birthday",
  "Housewarming",
  "Religious Function",
  "Family Function",
  "Community Event",
  "Other",
] as const;

const serviceTypes = [
  "Catering",
  "Tents",
  "Tables & Chairs",
  "Cooking Vessels",
  "Gas Stoves",
  "Serving Equipment",
  "Complete Event Requirements",
] as const;

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  eventType: z.enum(eventTypes),
  eventDate: z.string().max(10).optional(),
  guestCount: z.number().int().min(1).max(100000).optional(),
  services: z.array(z.enum(serviceTypes)).min(1).max(7),
  message: z.string().trim().max(1500).optional(),
  language: z.enum(["en", "te"]),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: EnquiryInput) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (Date.now() - data.startedAt < 1500) {
      throw new Error("Please review your details and try again.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("event_enquiries")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        event_type: data.eventType,
        event_date: data.eventDate || null,
        guest_count: data.guestCount ?? null,
        services: data.services,
        message: data.message || null,
        language: data.language,
        source: "website",
      })
      .select("id")
      .single();

    if (error || !row) throw new Error("We could not save your enquiry. Please call or WhatsApp us.");
    return { success: true, id: row.id };
  });