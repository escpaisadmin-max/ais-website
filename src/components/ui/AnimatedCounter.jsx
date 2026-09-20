import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";

export default function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(value);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const hasAnimated = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    let frame;

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{reduceMotion ? value : count}{suffix}</span>
      <span className="sr-only">{value}{suffix}</span>
    </span>
  );
}
