"use client";

import { Ref } from "react";
import { DripButton } from "../Misc/DripButton";
import { useTranslation } from "../../internationalization/useTranslation";

interface IntroProps {
  onStart: () => void;
  ref: Ref<HTMLDivElement> | undefined;
}

export function Intro({ onStart, ref }: IntroProps) {
  const [translate] = useTranslation();

  return (
    <div
      ref={ref}
      className="absolute inset-0 bg-black/50 m-2 text-black-100 rounded-xl flex flex-col items-center justify-center z-10 p-6 text-center"
    >
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-slate-100">
        {translate("✈️ From Diapers to Deploys", "introTitle")}
      </h1>
      <p className="mb-6 max-w-xl text-sm md:text-lg text-slate-300">
        {translate(
          "Buckle up! You're about to zoom through my life—birthplaces, brain boosts, and bug fixes—one map marker at a time.",
          "introDescription"
        )}
      </p>
      <DripButton onClick={onStart}>
        {translate("Let The Journey Begin", "introButton")}
      </DripButton>
    </div>
  );
}
