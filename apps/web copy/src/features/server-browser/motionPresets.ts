import type { Transition, Variants } from "framer-motion";

const easeHud: Transition["ease"] = [0.16, 1, 0.3, 1];

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeHud } }
};

export const hoverLift: { whileHover: Record<string, number>; whileTap: Record<string, number>; transition: Transition } = {
  whileHover: { scale: 1.03, y: -2 },
  whileTap: { scale: 0.99 },
  transition: { duration: 0.18, ease: easeHud }
};

export const hoverPress: { whileHover: Record<string, number>; whileTap: Record<string, number>; transition: Transition } = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.15, ease: easeHud }
};
