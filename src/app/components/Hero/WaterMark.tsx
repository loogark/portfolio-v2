import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FuzzyOverlay } from "./FuzzyOverlay";
import { useTranslation } from "../../internationalization/useTranslation";

interface WatermarkProps {
  reverse?: boolean;
  text: string;
  children: ReactNode;
}

const Watermark = ({ reverse, text }: Omit<WatermarkProps, "children">) => (
  <div className="flex -translate-y-12 select-none overflow-hidden opacity-[0.2]">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] md:text-[15vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>

    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] md:text-[15vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

export const WatermarkWrapper = () => {
  const [translate] = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.01 }}
      className="absolute inset-0 h-full w-full overflow-hidden"
    >
      {" "}
      <div className="h-full flex flex-col justify-center md:justify-between gap-4">
        <Watermark text={translate("Hello There !", "watermarkHello")} />
        <Watermark text={translate("Welcome", "watermarkWelcome")} reverse />
        <Watermark
          text={translate("Design. Develop. Deploy.", "watermarkDesign")}
          reverse
        />
        <Watermark
          text={translate("JavaScript & TypeScript", "watermarkTech")}
          reverse
        />
        <Watermark
          text={translate("Transforming Ideas to Code", "watermarkTagline")}
          reverse
        />
      </div>
      <FuzzyOverlay />
    </motion.div>
  );
};

const TranslateWrapper = ({
  children,
  reverse,
}: Omit<WatermarkProps, "text">) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};
