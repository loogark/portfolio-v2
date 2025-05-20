"use client";

import { useState, useEffect } from "react";
import { TerminalBodyProps, QuestionType } from "./types";
import { InitialText } from "./InitialText";
import { PreviousQuestions } from "./PreviousQuestions";
import { CurrentLine } from "./CurrentLine";
import { Summary } from "./Summary";
import { useTranslation } from "../../internationalization/useTranslation";
import { useSelectedLanguage } from "../../context";

export function TerminalBody({ containerRef, inputRef }: TerminalBodyProps) {
  const { selectedLang = "en" } = useSelectedLanguage();
  const [translate] = useTranslation();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");

  function buildStartQuestion(): QuestionType {
    return {
      key: "option",
      text: translate("Would you like to connect via", "questionStartText"),
      postfix: translate(
        "1) Social Links or 2) Contact Form?",
        "questionStartPostfix"
      ),
      complete: false,
      value: "",
    };
  }

  function buildContactQuestions(): QuestionType[] {
    return [
      {
        key: "email",
        text: translate("To start, could you give me", "questionEmailText"),
        postfix: translate("your email?", "questionEmailPostfix"),
        complete: false,
        value: "",
      },
      {
        key: "name",
        text: translate("Awesome! And what's", "questionNameText"),
        postfix: translate("your name?", "questionNamePostfix"),
        complete: false,
        value: "",
      },
      {
        key: "description",
        text: translate("Perfect, and", "questionDescriptionText"),
        postfix: translate(
          "What can I help you with?",
          "questionDescriptionPostfix"
        ),
        complete: false,
        value: "",
      },
    ];
  }

  useEffect(() => {
    setQuestions([buildStartQuestion()]);
    setError("");
  }, [selectedLang]);

  const curQuestion = questions.find((q) => !q.complete);
  const shouldShowSummary =
    questions.length > 0 &&
    curQuestion === undefined &&
    questions.every((q) => q.complete);

  const handleSubmitLine = (value: string) => {
    const trimmed = value.trim();
    setError("");

    if (curQuestion?.key === "option") {
      if (trimmed === "1") {
        setQuestions((prev) =>
          prev.map((q) =>
            q.key === "option"
              ? { ...q, complete: true, value: "Social Links" }
              : q
          )
        );
      } else if (trimmed === "2") {
        setQuestions(buildContactQuestions());
      } else {
        setError(translate("Please type 1 or 2.", "errorType1Or2"));
      }
    } else if (curQuestion?.key === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      if (!isValidEmail) {
        setError(
          translate(
            "That doesn’t look like a valid email address.",
            "errorInvalidEmail"
          )
        );
        return;
      }
      completeQuestion(trimmed);
    } else {
      completeQuestion(trimmed);
    }

    function completeQuestion(val: string) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.key === curQuestion?.key ? { ...q, complete: true, value: val } : q
        )
      );
    }
  };

  const firstQ = questions[0];
  if (firstQ?.complete && firstQ.value === "Social Links") {
    const goToContactForm = () => {
      setQuestions(buildContactQuestions());
      setError("");
    };

    const resetAll = () => {
      setQuestions([buildStartQuestion()]);
      setError("");
    };

    return (
      <div className="w-full px-2 md:px-4 py-3 md:py-6 text-xs md:text-base text-slate-100">
        <InitialText />
        <PreviousQuestions questions={questions} />
        <p className="mt-4 text-xs md:text-base">
          {translate(
            "Awesome! Here are my social links. Choose an option to open one:",
            "socialLinksIntro"
          )}
        </p>
        <ul className="mt-2 space-y-1 sm:space-y-2 text-sky-300 text-xs md:text-base">
          <li>{translate("1) LinkedIn", "linkOption1")}</li>
          <li>{translate("2) GitHub", "linkOption2")}</li>
        </ul>

        {error && (
          <p className="mt-2 text-red-400 text-xs md:text-base">⚠ {error}</p>
        )}

        <CurrentLine
          text={text}
          focused={focused}
          setText={setText}
          setFocused={setFocused}
          inputRef={inputRef}
          command="option"
          handleSubmitLine={(val: string) => {
            const map = {
              "1": "https://www.linkedin.com/in/ragool-krishnan/",
              "2": "https://github.com/loogark",
            };
            const url = map[val.trim() as "1" | "2"];
            if (url) {
              window.open(url, "_blank");
            } else {
              setError(
                translate(
                  "Please enter 1 or 2 to select a link.",
                  "errorSelectLink"
                )
              );
            }
          }}
          containerRef={containerRef}
        />

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={goToContactForm}
            className="w-full sm:w-auto px-3 py-2 text-xs md:text-base rounded bg-indigo-600 text-white hover:opacity-90"
          >
            {translate("Go to Contact Form", "buttonGoToForm")}
          </button>
          <button
            onClick={resetAll}
            className="w-full sm:w-auto px-3 py-2 text-xs md:text-base rounded bg-slate-300 text-black hover:opacity-90"
          >
            {translate("Reset", "buttonReset")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 py-3 sm:py-6 text-xs sm:text-sm md:text-base text-slate-100">
      <InitialText />
      <PreviousQuestions questions={questions} />

      {shouldShowSummary ? (
        <Summary questions={questions} setQuestions={setQuestions} />
      ) : curQuestion ? (
        <>
          <p className="mt-2 text-xs sm:text-sm md:text-base">
            {curQuestion.text}{" "}
            {curQuestion.postfix && (
              <span className="text-violet-400">{curQuestion.postfix}</span>
            )}
          </p>
          {error && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm md:text-base">
              ⚠ {error}
            </p>
          )}
          <CurrentLine
            text={text}
            focused={focused}
            setText={setText}
            setFocused={setFocused}
            inputRef={inputRef}
            command={curQuestion.key}
            handleSubmitLine={handleSubmitLine}
            containerRef={containerRef}
          />
        </>
      ) : null}
    </div>
  );
}
