"use client";
import { JSX } from "react";
import { motion, MotionValue } from "framer-motion";

const NUM_SECTIONS = 25;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const primary = "#4831D4";
const secondary = "#CCF381";

interface SectionProps {
  background: string;
  scale: MotionValue<number>;
  rotate: MotionValue<string>;
  children: React.ReactNode;
}

const Section = ({
  background,
  scale,
  rotate,
  children,
}: SectionProps): JSX.Element => {
  return (
    <motion.div
      className="relative h-full w-full origin-center"
      style={{
        background,
        scale,
        rotate,
        padding: PADDING,
      }}
    >
      {children}
    </motion.div>
  );
};

const generateSections = (
  count: number,
  color: string,
  scale: MotionValue<number>,
  rotate: MotionValue<string>
): JSX.Element => {
  if (count === NUM_SECTIONS) return <></>;
  const nextColor = color === secondary ? primary : secondary;
  return (
    <Section rotate={rotate} scale={scale} background={color}>
      {generateSections(count + 1, nextColor, scale, rotate)}
    </Section>
  );
};

interface TrippyProps {
  rotate: MotionValue<string>;
  scale: MotionValue<number>;
  top: MotionValue<string>;
}

export function TrippyScroll({ rotate, scale, top }: TrippyProps): JSX.Element {
  return (
    <motion.div
      style={{ top }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2.5 }}
      className="absolute bottom-0 left-0 right-0 z-[60] overflow-hidden bg-custom-white"
    >
      {generateSections(0, primary, scale, rotate)}
    </motion.div>
  );
}
