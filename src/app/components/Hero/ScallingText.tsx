import { motion, MotionValue } from "framer-motion";
import { useTranslation } from "../../internationalization/useTranslation";

interface ScallingTextProps {
  scale: MotionValue<number>;
}

export function ScallingText({ scale }: ScallingTextProps) {
  const [translate] = useTranslation();
  return (
    <motion.div
      style={{ scale }}
      className="pointer-events-none absolute inset-0 z-[70] grid place-content-center px-4"
    >
      <h1
        className="
        text-white
        text-4xl
        md:text-7xl
        leading-tight
        text-center
      "
      >
        {translate("😱 OH! YOU CAME THIS FAR !!!", "finalHeadline1")} <br />
        {translate("Ready to blast off? 🚀", "finalHeadline2")}
      </h1>
    </motion.div>
  );
}
