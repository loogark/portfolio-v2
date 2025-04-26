"use client";

import clsx from "clsx";
import { useInView, useAnimation, motion } from "framer-motion";
import { JSX, useRef, useEffect } from "react";

interface RevealProps {
  children: JSX.Element;
  color?: string;
  hideSlide?: boolean;
  delay?: number;
}

export function ElementReveal({
  children,
  color,
  hideSlide = false,
  delay = 0.25,
}: RevealProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");

      if (!hideSlide) {
        slideControls.start("visible");
      }
    }
  }, [isInView, hideSlide]);

  return (
    <div ref={ref} className="relative w-fit overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },

          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>

      {!hideSlide && (
        <motion.div
          variants={{
            hidden: { left: 0 },

            visible: { left: "100%" },
          }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className={clsx(
            "absolute bottom-1 left-0 right-0 top-1 z-20",
            color ?? "bg-indigo-600"
          )}
        />
      )}
    </div>
  );
}
