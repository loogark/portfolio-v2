"use client";

import { motion } from "framer-motion";
import { useEffect, useState, FormEvent, ChangeEvent, useRef } from "react";
import { CurrentLineProps } from "./types";

export default function CurrentLine({
  text,
  focused,
  setText,
  setFocused,
  inputRef,
  command,
  handleSubmitLine,
  containerRef,
}: CurrentLineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
        setFocused(true);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [text, command, isInView, inputRef, setFocused]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitLine(text);
    setText("");
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 0);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div ref={wrapperRef}>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          onChange={onChange}
          value={text}
          type="text"
          className="sr-only"
          autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(true)}
        />
      </form>
      <p>
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-cyan-300">~</span>{" "}
        {command && <span className="opacity-50">Choose an {command}: </span>}
        {text}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
            times: [0, 0.5, 0.5, 1],
          }}
          className="inline-block w-2 h-5 bg-slate-400 translate-y-1 ml-0.5"
        />
      </p>
    </div>
  );
}
