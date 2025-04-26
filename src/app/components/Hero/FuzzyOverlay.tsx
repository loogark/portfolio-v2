import { motion } from "framer-motion";

export const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        opacity: 0.15,
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        opacity: { delay: 0.45, duration: 0.25 },
        transform: {
          repeat: Infinity,
          duration: 0.2,
          ease: "linear",
          repeatType: "mirror",
        },
      }}
      style={{
        backgroundImage: 'url("/noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};
