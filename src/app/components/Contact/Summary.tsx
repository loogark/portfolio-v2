"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { SummaryProps } from "./types";
import emailjs from "@emailjs/browser";
import { useTranslation } from "../../internationalization/useTranslation";

export function Summary({ questions, setQuestions }: SummaryProps) {
  const [translate] = useTranslation();
  const [complete, setComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resetToBeginning() {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    const firstQuestion = {
      key: "option",
      text: translate("Would you like to connect via", "questionStartText"),
      postfix: translate(
        "1) Social Links or 2) Contact Form?",
        "questionStartPostfix"
      ),
      complete: false,
      value: "",
    };

    setQuestions([firstQuestion]);
    setStatus(null);
    setComplete(false);
  }

  useEffect(() => {
    if (status === "success") {
      setShowSuccess(true);
      resetTimeoutRef.current = setTimeout(() => {
        resetToBeginning();
      }, 3000);
    }

    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, [status]);

  const editField = (key: string) => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    setQuestions((prev) =>
      prev.map((q) =>
        q.key === key ? { ...q, complete: false, value: "" } : q
      )
    );
    setStatus(null);
    setComplete(false);
  };

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        event.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      )
      .then(
        () => {
          setStatus("success");
          setComplete(true);
          setIsSubmitting(false);
          (event.target as HTMLFormElement).reset();
        },
        () => {
          setStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  const formValues = questions.reduce((acc, val) => {
    acc[val.key] = val.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <p>{translate("Beautiful! Here's what we've got:", "summaryIntro")}</p>

      {questions.map((q) => (
        <p key={q.key}>
          <span className="text-blue-300">{q.key}:</span> {q.value}{" "}
          <button
            onClick={() => editField(q.key)}
            className="ml-2 text-sm text-yellow-300 underline"
          >
            {translate("Edit", "summaryEdit")}
          </button>
        </p>
      ))}

      <p>{translate("Look good?", "summaryLookGood")}</p>

      {status === "success" && showSuccess && (
        <p className="text-emerald-300 mt-2">
          <FiCheckCircle className="inline-block mr-2" />
          {translate(
            "Message sent! I will get back to you as soon as possible.",
            "summaryMessageSent"
          )}
        </p>
      )}

      {status === "error" && (
        <p className="text-red-400 mt-2">
          {translate(
            "⚠ Something went wrong. Please try again later.",
            "summaryError"
          )}
        </p>
      )}

      {!complete && (
        <form onSubmit={sendEmail}>
          <input
            type="hidden"
            name="user_name"
            value={formValues["name"] || ""}
          />
          <input
            type="hidden"
            name="reply_to"
            value={formValues["email"] || ""}
          />
          <input
            type="hidden"
            name="message"
            value={formValues["description"] || ""}
          />

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={resetToBeginning}
              className="px-3 py-1 text-base hover:opacity-90 transition-opacity rounded bg-slate-100 text-black"
            >
              {translate("Restart", "summaryRestart")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1 text-base hover:opacity-90 transition-opacity rounded bg-indigo-500 text-white"
            >
              {isSubmitting
                ? translate("Sending...", "summarySending")
                : translate("Send it!", "summarySend")}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
