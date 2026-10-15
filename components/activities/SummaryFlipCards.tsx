"use client";

import React, { useState } from "react";

export interface SummaryStepItem {
  id: number;
  stepNumber: string;
  image: string;
  description: string;
}

interface SummaryFlipCardsProps {
  steps?: SummaryStepItem[];
}

const DEFAULT_STEPS: SummaryStepItem[] = [
  {
    id: 1,
    stepNumber: "Steg 1",
    image: "/images/sammanfattning1.png",
    description: "Stryk under svåra ord och red ut vad de betyder",
  },
  {
    id: 2,
    stepNumber: "Steg 2",
    image: "/images/sammanfattning2.png",
    description: "Stryk under de viktigaste orden",
  },
  {
    id: 3,
    stepNumber: "Steg 3",
    image: "/images/sammanfattning3.png",
    description: "Skriv ner dina stödord",
  },
  {
    id: 4,
    stepNumber: "Steg 4",
    image: "/images/sammanfattning4.png",
    description: "Använd stödorden för att skriva din sammanfattning",
  },
];

export default function SummaryFlipCards({ steps = DEFAULT_STEPS }: SummaryFlipCardsProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => {
          const isFlipped = !!flippedCards[step.id];

          return (
            <div
              key={step.id}
              onClick={() => toggleFlip(step.id)}
              className="relative h-[480px] sm:h-[520px] [perspective:1000px] cursor-pointer group"
            >
              <div
                className={`
                  relative w-full h-full
                  transition-transform duration-700
                  [transform-style:preserve-3d]
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                `}
              >
                {/* FRAMSIDAN (GRÖN SIDA MED INSTRUKTION) */}
                <div
                  className="
                    absolute inset-0
                    [backface-visibility:hidden]
                    rounded-3xl border-4 border-emerald-400
                    bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700
                    shadow-xl overflow-hidden p-6 text-white flex flex-col justify-between
                    transition-all group-hover:border-emerald-300
                  "
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-xs font-black uppercase tracking-wider text-emerald-50">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-semibold text-emerald-100 opacity-90">
                      Klicka för att se exempel ↺
                    </span>
                  </div>

                  <div className="my-auto rounded-2xl bg-white/15 border border-white/20 p-6 text-center">
                    <p className="text-xs uppercase font-black tracking-widest text-emerald-100 mb-3">
                      Instruktion
                    </p>
                    <p className="text-xl sm:text-2xl font-bold leading-relaxed text-white">
                      {step.description}
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <span className="text-xs text-emerald-100 font-semibold opacity-80">
                      Visa exempelbild ↺
                    </span>
                  </div>
                </div>

                {/* BAKSIDAN (VIT SIDA MED BILD) */}
                <div
                  className="
                    absolute inset-0
                    [backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                    rounded-3xl border-2 border-slate-200 p-5 sm:p-6
                    flex flex-col bg-white shadow-lg transition-all
                  "
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3.5 py-1 text-sm font-extrabold text-indigo-700">
                      {step.stepNumber} · Exempel
                    </span>

                    <span className="text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors">
                      Klicka för att vända tillbaka ↺
                    </span>
                  </div>

                  {/* BILD-EXEMPEL */}
                  <div className="relative flex-1 w-full my-2 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                    <img
                      src={step.image}
                      alt={`${step.stepNumber} exempel`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* KORT BESKRIVNING UNDER BILDEN */}
                  <div className="pt-3 border-t border-slate-100 text-center">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                      {step.description}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}