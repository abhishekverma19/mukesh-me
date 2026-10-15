import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Btn } from "@/components/Btn";
import { useMachines } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_OPTIONS } from "@/lib/site";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Phone number can only contain digits and + - ( )"),
  email: z.string().trim().max(255).email("Please enter a valid email").or(z.literal("")),
  company: z.string().trim().max(120).optional(),
  project_location: z.string().trim().min(2, "Please enter the project location").max(200),
  service_required: z.string().trim().min(1, "Please choose a service"),
  machine_required: z.string().trim().max(120).optional(),
  preferred_date: z.string().optional(),
  expected_duration: z.string().trim().max(120).optional(),
  message: z.string().trim().max(1000).optional(),
});

const inputClass =
  "h-11 w-full border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground";

export function QuoteForm({
  defaultService,
  defaultMachine,
}: {
  defaultService?: string;
  defaultMachine?: string;
}) {
  const { data: machines } = useMachines();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("loading");
    setErrorMessage("");

    const v = parsed.data;
    const { error } = await supabase.from("inquiries").insert({
      full_name: v.full_name,
      phone: v.phone,
      email: v.email ? v.email : null,
      company: v.company || null,
      project_location: v.project_location,
      service_required: v.service_required,
      machine_required: v.machine_required || null,
      preferred_date: v.preferred_date ? v.preferred_date : null,
      expected_duration: v.expected_duration || null,
      message: v.message || null,
    });

    if (error) {
      setStatus("error");
      setErrorMessage(
        "We couldn't send your request just now. Please call or WhatsApp us instead, or try again in a moment.",
      );
      return;
    }

    form.reset();
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-card p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h3 className="mt-5 text-2xl">Request Received</h3>
        <p className="mt-3 text-muted-foreground">
          Thank you! Your request has been received. We will contact you shortly.
        </p>
        <Btn variant="outline" className="mt-7" onClick={() => setStatus("idle")}>
          Send another request
        </Btn>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 md:p-9">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name *" name="full_name" error={errors["full_name"]}>
          <input name="full_name" className={inputClass} placeholder="Your name" required />
        </Field>

        <Field label="Phone Number *" name="phone" error={errors["phone"]}>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="10-digit mobile number"
            required
          />
        </Field>

        <Field label="Email" name="email" error={errors["email"]}>
          <input name="email" type="email" className={inputClass} placeholder="you@example.com" />
        </Field>

        <Field label="Company" name="company" error={errors["company"]}>
          <input name="company" className={inputClass} placeholder="Company or firm (optional)" />
        </Field>

        <Field label="Project Location *" name="project_location" error={errors["project_location"]}>
          <input
            name="project_location"
            className={inputClass}
            placeholder="Village / town, district"
            required
          />
        </Field>

        <Field label="Service Required *" name="service_required" error={errors["service_required"]}>
          <select
            name="service_required"
            className={inputClass}
            defaultValue={defaultService ?? ""}
            required
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Machine Required" name="machine_required" error={errors["machine_required"]}>
          <select name="machine_required" className={inputClass} defaultValue={defaultMachine ?? ""}>
            <option value="">No preference</option>
            {machines.map((m) => (
              <option key={m.slug} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Date" name="preferred_date" error={errors["preferred_date"]}>
          <input name="preferred_date" type="date" className={inputClass} />
        </Field>

        <Field
          label="Expected Duration"
          name="expected_duration"
          error={errors["expected_duration"]}
        >
          <input
            name="expected_duration"
            className={inputClass}
            placeholder="e.g. 2 days, 1 week"
          />
        </Field>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={1000}
            className="w-full border border-input bg-background p-3 text-sm outline-none transition-colors focus:border-primary"
            placeholder="Tell us about the work, site conditions and timeline."
          />
          {errors["message"] ? (
            <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <Btn type="submit" size="lg" className="mt-7 w-full md:w-auto" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Request a Quote"
        )}
      </Btn>
      <p className="mt-3 text-xs text-muted-foreground">
        Fields marked * are required. We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
