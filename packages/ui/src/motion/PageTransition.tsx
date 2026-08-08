import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@existcode/hooks";
import { motion as motionTokens } from "../tokens/tokens";

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 }
};

const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export interface PageTransitionProps {
  children: ReactNode;
  routeKey: string;
}

export function PageTransition({ children, routeKey }: PageTransitionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={reducedMotion ? reducedVariants : variants}
        transition={{
          duration: motionTokens.duration.slow / 1000,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
