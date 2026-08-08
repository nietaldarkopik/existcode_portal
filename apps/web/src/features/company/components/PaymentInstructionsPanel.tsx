import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { PaymentInstructions } from "@existcode/types";
import { useLocale } from "../../../i18n";

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between border-b border-neutral-800/70 py-3 last:border-b-0">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-neutral-500">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-neutral-50">{value}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="text-neutral-400 hover:text-neutral-100"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="size-4 text-success-400" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

export function PaymentInstructionsPanel({ instructions }: { instructions: PaymentInstructions }) {
  const { t } = useLocale();

  return (
    <div className="bg-neutral-900 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-200">{t.payment.bankTransfer}</p>
      <div className="mt-2">
        <CopyField label={t.payment.bankName} value={instructions.bank_name} />
        <CopyField label={t.payment.accountNumber} value={instructions.account_number} />
        <CopyField label={t.payment.accountHolder} value={instructions.account_holder} />
      </div>
    </div>
  );
}
