import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Link } from "react-router-dom";
import { useReducedMotion } from "@existcode/hooks";
import { cn } from "@existcode/ui";

const MotionLink = motion(Link);

export interface RailIconButtonProps {
  icon: ReactNode;
  label: string;
  ariaLabel: string;
  active?: boolean;
  side?: "right" | "left";
  className?: string;
  size?: number;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}

// Icon button for the left/right rails — hovering (or focusing) slides out
// its text label, like a console dashboard's flyout menu. Pass `href` to
// render as a link (e.g. WhatsApp/email/phone) instead of a button.
export function RailIconButton({
  icon,
  label,
  ariaLabel,
  active,
  side = "right",
  className,
  size = 52,
  href,
  to,
  target,
  rel
}: RailIconButtonProps) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const transition: Transition = { duration: 0.15, ease: [0.16, 1, 0.3, 1] };

  const motionProps = {
    "aria-label": ariaLabel,
    ...(reducedMotion ? {} : { whileHover: { scale: 1.06 }, whileTap: { scale: 0.94 } }),
    transition,
    className: cn("flex items-center justify-center", className),
    style: { width: size, height: size }
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {active ? (
        <span
          className={cn("absolute top-0 h-full w-1 bg-warning-400", side === "right" ? "-left-[17px]" : "-right-[17px]")}
        />
      ) : null}

      {to ? (
        <MotionLink to={to} {...motionProps}>
          {icon}
        </MotionLink>
      ) : href ? (
        <motion.a href={href} {...(target ? { target } : {})} {...(rel ? { rel } : {})} {...motionProps}>
          {icon}
        </motion.a>
      ) : (
        <motion.button type="button" {...motionProps}>
          {icon}
        </motion.button>
      )}

      <AnimatePresence>
        {hovered ? (
          <motion.span
            initial={{ opacity: 0, x: side === "right" ? -6 : 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: side === "right" ? -6 : 6 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "pointer-events-none absolute z-30 whitespace-nowrap rounded-sm bg-neutral-900/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-100 shadow-lg ring-1 ring-neutral-700/60",
              side === "right" ? "left-full ml-3" : "right-full mr-3"
            )}
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
