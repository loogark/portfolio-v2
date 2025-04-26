"use client";
import { useTranslation } from "../../internationalization/useTranslation";

export function InitialText() {
  const [translate] = useTranslation();

  return (
    <>
      <p>{translate("Hey there, explorer of the web 👋", "initialGreeting")}</p>
      <p>
        {translate(
          "Let's create something meaningful together — or just drop me a line to say hi!",
          "initialInstruction"
        )}
      </p>
      <p className="whitespace-nowrap overflow-hidden font-light">
        ——————————————————————————————————————————————————————
      </p>
    </>
  );
}
