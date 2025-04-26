"use client";

import { useScroll, useTransform } from "framer-motion";
import { HeroText } from "./HeroText";
import { TrippyScroll } from "./TrippyScroll";
import { useRef } from "react";
import { ScallingText } from "./ScallingText";

export function Hero() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 0.8, 1],
    [1, 1, 0.9, 1.25]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["0deg", "0deg", "60deg"]
  );
  const top = useTransform(scrollYProgress, [0, 0.25], ["99%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.125], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 1]);

  return (
    <section className="bg-custom-white">
      <div ref={targetRef} className="relative z-0 h-[800vh] bg-custom-white">
        <div className="sticky top-0 h-screen bg-custom-white">
          <HeroText opacity={opacity} />
          <TrippyScroll rotate={rotate} top={top} scale={scale} />
          <ScallingText scale={logoScale} />
        </div>
      </div>
    </section>
  );
}
