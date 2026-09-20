import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
