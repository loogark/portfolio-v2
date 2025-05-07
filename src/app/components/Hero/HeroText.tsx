// src/components/HeroText.tsx
import { motion, MotionValue } from "framer-motion";
import { WatermarkWrapper } from "./WaterMark";
import { ElementReveal } from "../Misc/ElementReveal";
import { useTranslation } from "../../internationalization/useTranslation";
import { FabMenu } from "../Misc/FabMenu";

interface HeroTextProps {
  opacity: MotionValue<number>;
}

export function HeroText({ opacity }: HeroTextProps) {
  const [translate] = useTranslation();

  return (
    <motion.div
      style={{ opacity }}
      className="relative h-full gap-4 overflow-hidden bg-white p-1 text-black text-center md:text-start"
    >
      <WatermarkWrapper />
      <FabMenu></FabMenu>

      <div
  className=" absolute inset-0 flex items-center justify-center z-30 md:inset-y-0 md:left-5 md:right-auto md:justify-start
  "
>
        <div className="flex max-w-7xl items-end justify-between p-2 md:p-8">
          <div>
            <div className="flex flex-col items-center md:items-start">
              <ElementReveal hideSlide delay={0.3}>
                <h1 className="w-fit text-5xl font-black leading-[1.1] text-zinc-800 md:text-8xl 2xl:text-[6.5vmax]">
                  {translate("I'm Ragool,", "heroGreeting1")}
                </h1>
              </ElementReveal>
              <ElementReveal hideSlide delay={0.4}>
                <h1 className="w-fit text-5xl font-black leading-[1.1] text-zinc-800 md:text-8xl 2xl:text-[6.5vmax]">
                  {translate("Your friendly Neighborhood", "heroGreeting2")}
                </h1>
              </ElementReveal>
              <ElementReveal hideSlide delay={0.5}>
                <h1 className="w-fit text-5xl font-black leading-[1.1] text-primary  md:text-8xl 2xl:text-[6.5vmax]">
                  {translate("web developer", "heroRole")}
                </h1>
              </ElementReveal>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="max-w-xl text-sm text-slate-700 md:text-lg  2xl:text-xl"
            >
              {" "}
              {translate(
                "Who is passionate about building fast, accessible, and user-friendly web applications. With 4+ years of experience working on SaaS platforms, no-code tools, and interactive data visualizations, I specialize in transforming complex ideas into elegant, scalable interfaces.",
                "heroDescription"
              )}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
