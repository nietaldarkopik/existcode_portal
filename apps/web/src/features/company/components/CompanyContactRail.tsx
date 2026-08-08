import { Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { RailIconButton } from "../../server-browser/RailIconButton";
import { useLocale } from "../../../i18n";

const WHATSAPP_URL = "https://wa.me/6281234567890";
const EMAIL_HREF = "mailto:hello@existcode.id";
const PHONE_HREF = "tel:+622150001234";

// Right rail for company pages — replaces the game menu's party rail with
// quick-contact channels, reusing the same RailIconButton flyout primitive.
export function CompanyContactRail() {
  const { t } = useLocale();

  return (
    <aside className="fixed inset-y-0 right-0 z-20 flex w-[64px] flex-col items-center gap-6 py-10 text-neutral-300">
      <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.15 }} title={t.rail.contactUs}>
        <MessageCircle className="size-4" />
      </motion.span>

      <RailIconButton
        icon={<MessageCircle className="size-4" />}
        label={t.rail.whatsapp}
        ariaLabel={t.rail.whatsapp}
        side="left"
        size={44}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded-[3px] bg-neutral-800/70 text-emerald-400 hover:bg-neutral-700"
      />

      <RailIconButton
        icon={<Mail className="size-4" />}
        label={t.rail.email}
        ariaLabel={t.rail.email}
        side="left"
        size={44}
        href={EMAIL_HREF}
        className="rounded-[3px] bg-neutral-800/70 hover:bg-neutral-700"
      />

      <RailIconButton
        icon={<Phone className="size-4" />}
        label={t.rail.phone}
        ariaLabel={t.rail.phone}
        side="left"
        size={44}
        href={PHONE_HREF}
        className="rounded-[3px] bg-neutral-800/70 hover:bg-neutral-700"
      />
    </aside>
  );
}
