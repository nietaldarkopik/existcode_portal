import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@existcode/ui";
import { CompanyPageShell } from "../components/CompanyPageShell";
import { useLocale } from "../../../i18n";

export function OrderLookupPage() {
  const { t, path } = useLocale();
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (orderNumber.trim()) {
      navigate(path("payment", { orderNumber: orderNumber.trim() }));
    }
  }

  return (
    <CompanyPageShell>
      <h1 className="font-heading text-4xl font-semibold uppercase tracking-tight text-neutral-50 lg:text-5xl">
        {t.orderLookup.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-neutral-400">{t.orderLookup.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-4">
        <Input
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder={t.orderLookup.placeholder}
          className="rounded-none"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="h-11 bg-neutral-100 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:bg-white"
        >
          {t.orderLookup.submit}
        </motion.button>
      </form>
    </CompanyPageShell>
  );
}
