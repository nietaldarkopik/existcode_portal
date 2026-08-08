import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocale } from "../../../i18n";
import logo from "../../../styles/logo.png";
export function CompanyLogo() {
  const { t, path } = useLocale();

  return (
    <Link to={path("home")} className="flex items-center gap-2.5 text-neutral-50">
      <motion.span
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15 }}
        className="flex size-7 items-center justify-center"
      >
        <img src={logo} alt="Logo" className="size-7" />
      </motion.span>
      <span className="font-heading text-sm font-semibold uppercase tracking-wide">{t.meta.siteName}</span>
    </Link>
  );
}
