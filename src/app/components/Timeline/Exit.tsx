"use client";

import { Ref } from "react";
import { DripButton } from "../Misc/DripButton";
import { useTranslation } from "../../internationalization/useTranslation";
import { useSelectedLanguage } from "../../context";

interface ExitProps {
  ref: Ref<HTMLDivElement> | undefined;
}

export function Exit({ ref }: ExitProps) {
  const [translate] = useTranslation();
  const { selectedLang } = useSelectedLanguage();

  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/70 backdrop-blur-md m-2 text-white rounded-xl flex flex-col items-center justify-center z-20 p-6 text-center animate-in fade-in duration-700"
    >
      <h2 className="text-2xl font-bold mb-3">
        {translate(
          "I'm currently freelancing and wandering the earth 🌍",
          "exitHeading"
        )}
      </h2>
      <p className="text-lg max-w-md mb-5">
        {translate(
          "Always seeking the next exciting challenge — let’s build something remarkable.",
          "exitLine1"
        )}
      </p>
      <p className="text-lg max-w-md font-semibold mb-5">
        {translate(
          "If all of that flew over your head, don’t worry—my resume has the juicy details. Take a peek below!",
          "exitLine2"
        )}
      </p>
      <DripButton
        onClick={() =>
          window.open(
            `/resumes/${selectedLang}.pdf`,
            "_blank",
            "noopener,noreferrer"
          )
        }
      >
        {translate("View My Resume", "exitButton")}
      </DripButton>
    </div>
  );
}
