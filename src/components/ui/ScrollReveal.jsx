import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollReveal({ children, delay = 0, className = "" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ y: reduceMotion || inView ? 0 : 30 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
