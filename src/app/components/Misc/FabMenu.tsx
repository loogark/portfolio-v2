"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useSelectedLanguage } from "../../context";
import { Tooltip } from "./Tooltip";
import { useTranslation } from "../../internationalization/useTranslation";

const containerVariants = {
  closed: {
    width: 40,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  open: {
    width: 200,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0 },
};

export function FabMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedLang, setSelectedLang } = useSelectedLanguage();
  const otherLang = selectedLang === "en" ? "fr" : "en";
  const [translate] = useTranslation();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial={{ opacity: 0, width: 40 }}
        animate={{
          opacity: 1,
          width: isOpen ? 200 : 40,
        }}
        exit={{ opacity: 0, width: 40 }}
        transition={{
          opacity: { duration: 0.5, delay: 2 },
          width: { type: "spring", stiffness: 300, damping: 30 },
          staggerChildren: isOpen ? 0.1 : 0.05,
          delayChildren: isOpen ? 0.2 : 0,
        }}
        className={`fixed z-50
          top-4            
          md:top-auto      
          md:bottom-8      
          right-4          
          md:right-8       
          h-10 flex items-center
          ${isOpen ? "justify-start" : "justify-center"}
          bg-custom-white text-gray-800 rounded-full
          shadow-lg overflow-hidden`}
      >
        {isOpen && (
          <>
            <Tooltip content="Github" placement="top">
              <motion.a
                variants={itemVariants}
                href="https://github.com/loogark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none flex items-center justify-center w-8 h-8 ml-2 bg-primary text-white rounded-full shadow"
              >
                <FaGithub size={16} />
              </motion.a>
            </Tooltip>
            <Tooltip content="Linkedin" placement="top">
              <motion.a
                variants={itemVariants}
                href="https://www.linkedin.com/in/ragool-krishnan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none flex items-center justify-center w-8 h-8 ml-2 bg-primary text-white rounded-full shadow"
              >
                <FaLinkedin size={16} />
              </motion.a>
            </Tooltip>
            <Tooltip content="C.V" placement="top">
              <motion.a
                variants={itemVariants}
                href={`/resumes/${selectedLang}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none flex items-center justify-center w-8 h-8 ml-2 bg-primary text-white rounded-full shadow"
              >
                <FaFileAlt size={16} />
              </motion.a>
            </Tooltip>
            <Tooltip
              content={`${translate(
                "Change langauge to :",
                "changeLanguage"
              )} ${otherLang}`}
              placement="top"
            >
              <motion.button
                variants={itemVariants}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLang(otherLang);
                }}
                className="flex-none flex items-center justify-center w-8 h-8 ml-2 text-xs font-semibold bg-primary text-white rounded-full shadow cursor-pointer"
              >
                {otherLang.toLocaleUpperCase()}
              </motion.button>
            </Tooltip>
          </>
        )}

        {/* Toggle button */}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex-none flex items-center justify-center w-10 h-10 bg-custom-white text-gray-600 rounded-full cursor-pointer ml-auto"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
