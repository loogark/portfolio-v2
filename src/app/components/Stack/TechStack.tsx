"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiGraphql,
  SiMongodb,
  SiVuedotjs,
  SiStyledcomponents,
  SiDocker,
  SiFlutter,
  SiJirasoftware,
  SiFigma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Spiral } from "./Spiral";

interface TechIcon {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const baseOrbitGroups: Array<{
  baseRadius: number;
  duration: number;
  icons: TechIcon[];
}> = [
  {
    baseRadius: 90,
    duration: 14,
    icons: [
      { icon: <FaReact />, color: "#61DBFB", label: "React" },
      { icon: <SiTypescript />, color: "#3178C6", label: "TypeScript" },
      { icon: <FaNodeJs />, color: "#339933", label: "Node.js" },
    ],
  },
  {
    baseRadius: 150,
    duration: 18,
    icons: [
      { icon: <SiTailwindcss />, color: "#38BDF8", label: "Tailwind CSS" },
      { icon: <FaHtml5 />, color: "#E34F26", label: "HTML5" },
      { icon: <FaCss3Alt />, color: "#1572B6", label: "CSS3" },
      { icon: <FaGitAlt />, color: "#F05032", label: "Git" },
    ],
  },
  {
    baseRadius: 210,
    duration: 22,
    icons: [
      { icon: <SiNextdotjs />, color: "#000000", label: "Next.js" },
      { icon: <SiGraphql />, color: "#E10098", label: "GraphQL" },
      { icon: <SiMongodb />, color: "#47A248", label: "MongoDB" },
      { icon: <SiVuedotjs />, color: "#42B883", label: "Vue.js" },
      {
        icon: <SiStyledcomponents />,
        color: "#DB7093",
        label: "styled-components",
      },
    ],
  },
  {
    baseRadius: 270,
    duration: 26,
    icons: [
      { icon: <SiDocker />, color: "#2496ED", label: "Docker" },
      { icon: <SiFlutter />, color: "#02569B", label: "Flutter" },
      { icon: <SiJirasoftware />, color: "#0052CC", label: "Jira" },
      { icon: <SiFigma />, color: "#F24E1E", label: "Figma" },
    ],
  },
];

const MIN_CIRCUMFERENCE_SPACING = 50;

const OrbitRing = ({ radius }: { radius: number }) => (
  <div
    className="absolute border border-(--secondary) rounded-full"
    style={{
      width: radius * 2,
      height: radius * 2,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />
);

interface OrbitingIconsProps extends TechIcon {
  radius: number;
  duration: number;
  offsetAngle: number;
  size?: number;
  isPaused: boolean;
}

const OrbitingIcons = ({
  icon,
  color,
  label,
  radius,
  duration,
  offsetAngle,
  size = 40,
  isPaused,
}: OrbitingIconsProps) => {
  const angle = useMotionValue(0);
  const x = useTransform(angle, (a) => Math.cos(a + offsetAngle) * radius);
  const y = useTransform(angle, (a) => Math.sin(a + offsetAngle) * radius);

  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const startAnimation = () => {
    const current = angle.get();
    controlsRef.current = animate(angle, current + 2 * Math.PI, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
  };

  useEffect(() => {
    startAnimation();
    return () => controlsRef.current?.stop();
  }, [angle, duration]);

  useEffect(() => {
    if (isPaused) {
      controlsRef.current?.stop();
    } else {
      startAnimation();
    }
  }, [isPaused]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: "50%",
        left: "50%",
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        className="rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        style={{ width: size, height: size }}
      >
        <div className="text-xl" style={{ color }}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export function AnimatedTechDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 600;
      setScaleFactor(Math.min(containerWidth / 600, 1));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[600px] aspect-square mx-auto text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="z-10 absolute flex items-center justify-center bg-white text-black rounded-full font-semibold shadow-lg"
        style={{
          width: 64 * scaleFactor,
          height: 64 * scaleFactor,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spiral />
      </div>

      {baseOrbitGroups.map(({ baseRadius, duration, icons }, ringIndex) => {
        const iconCount = icons.length;
        const radius = baseRadius * scaleFactor;
        const circumference = 2 * Math.PI * radius;
        const required = iconCount * MIN_CIRCUMFERENCE_SPACING * scaleFactor;
        const finalRadius =
          required > circumference ? required / (2 * Math.PI) : radius;
        const iconSize = 40 * scaleFactor;

        return (
          <div key={ringIndex}>
            <OrbitRing radius={finalRadius} />
            {icons.map((ic, i) => {
              const angleStep = (2 * Math.PI) / iconCount;
              const offsetAngle = angleStep * i + 9;
              return (
                <OrbitingIcons
                  key={i}
                  {...ic}
                  radius={finalRadius}
                  duration={duration}
                  offsetAngle={offsetAngle}
                  size={iconSize}
                  isPaused={isPaused}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
