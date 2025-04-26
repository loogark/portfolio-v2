"use client";

import { useState, useEffect, FormEvent } from "react";
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

  function resetToBeginning() {
    const firstQuestion = {
      key: "start",
      text: translate("Would you like to connect via", "questionStartText"),
      postfix: translate("1) Social Links or 2) Contact Form?", "questionStartPostfix"),
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
      const timer = setTimeout(() => {
        resetToBeginning();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]); // ✅ No unstable deps anymore

  const editField = (key: string) => {
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
        },
        () => {
          setStatus("error");
          setIsSubmitting(false);
        }
      );

    (event.target as HTMLFormElement).reset();
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
        <p className="text-emerald-300">
          <FiCheckCircle className="inline-block mr-2" />
          {translate(
            "Message sent! I will get back to you as soon as possible.",
            "summaryMessageSent"
          )}
        </p>
      )}

      {status === "error" && (
        <p className="text-red-400">
          {translate(
            "⚠ Something went wrong. Please try again later.",
            "summaryError"
          )}
        </p>
      )}

      {!complete && (
        <form onSubmit={sendEmail}>
          {Object.entries(formValues).map(([name, value]) => (
            <input type="hidden" key={name} name={name} value={value} />
          ))}
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
