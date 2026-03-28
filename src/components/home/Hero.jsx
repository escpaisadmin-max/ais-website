import { motion } from "framer-motion";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* London skyline background — scaled up to eliminate frame */}
      <img
        src="/london-skyline.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-ais-navy/75" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-ais-white leading-tight mb-6"
        >
          Investing in{" "}
          <span className="text-ais-periwinkle">Knowledge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-ais-silver max-w-2xl mx-auto mb-10"
        >
          The premier investment society at ESCP — the world's oldest business school. We bridge academia and
          finance through educational content, industry events, and a
          community of ambitious future investors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button to="/events" variant="primary">
            Explore Events
          </Button>
          <Button to="/about" variant="secondary" className="border-ais-silver text-ais-silver hover:bg-ais-silver hover:text-ais-navy">
            Meet the Team
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-ais-silver/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-ais-silver/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
