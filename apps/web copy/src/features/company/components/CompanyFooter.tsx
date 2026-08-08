import { Link } from "react-router-dom";
import { useLocale } from "../../../i18n";

export function CompanyFooter() {
  const { t, path } = useLocale();

  return (
    <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-neutral-800/70 pt-6 text-xs text-neutral-500 sm:flex-row">
      <p>
        &copy; {new Date().getFullYear()} {t.footer.rights}
      </p>
      <div className="flex items-center gap-4">
        <Link to={path("about")} className="hover:text-neutral-300">
          {t.footer.about}
        </Link>
        <Link to={path("contact")} className="hover:text-neutral-300">
          {t.footer.contact}
        </Link>
      </div>
    </footer>
  );
}
