import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Alert, Input, Textarea } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { useSubmitContactMessage } from "../hooks/useContactMessage";
import { Seo } from "../../seo/Seo";
import { useStaticPageSeo } from "../../seo/useSiteSeo";
import { useLocale } from "../../../i18n";

export function ContactPage() {
  const { t } = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const mutation = useSubmitContactMessage();
  const seo = useStaticPageSeo("contact", t.contact.title, t.contact.subtitle);

  function handleChange(field: keyof typeof form) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      name: form.name,
      email: form.email,
      ...(form.phone ? { phone: form.phone } : {}),
      ...(form.subject ? { subject: form.subject } : {}),
      message: form.message
    });
  }

  return (
    <CompanyPageShell>
      <Seo title={seo.title} description={seo.description} />
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.contact.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-400">{t.contact.subtitle}</p>

      <div className="mt-8 max-w-xl">
        {mutation.isSuccess ? (
          <Alert variant="success" title={t.contact.successTitle}>
            {t.contact.successMessage(form.name, form.email)}
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mutation.isError ? (
              <Alert variant="danger" title={t.contact.errorTitle}>
                {t.contact.errorMessage}
              </Alert>
            ) : null}

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {t.contact.name}
              </label>
              <Input
                required
                value={form.name}
                onChange={handleChange("name")}
                className="rounded-none"
                placeholder={t.contact.name}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {t.contact.email}
              </label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                className="rounded-none"
                placeholder="name@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {t.contact.phoneOptional}
              </label>
              <Input
                value={form.phone}
                onChange={handleChange("phone")}
                className="rounded-none"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {t.contact.subjectOptional}
              </label>
              <Input value={form.subject} onChange={handleChange("subject")} className="rounded-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-400">
                {t.contact.message}
              </label>
              <Textarea
                required
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                className="rounded-none"
                placeholder={t.contact.messagePlaceholder}
              />
            </div>

            <motion.button
              type="submit"
              disabled={mutation.isPending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 h-11 bg-neutral-100 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white disabled:opacity-50"
            >
              {mutation.isPending ? t.contact.sending : t.contact.submit}
            </motion.button>
          </form>
        )}
      </div>
    </CompanyPageShell>
  );
}
