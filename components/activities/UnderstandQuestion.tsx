"use client";

import React, { useState } from "react";

export interface QuestionPart {
  id: number;
  label: string;
  keyword: string;
  explanation: string;
}

const DEFAULT_PARTS: QuestionPart[] = [
  {
    id: 1,
    label: "Vad?",
    keyword: "Personens humör",
    explanation: "Svara på vilken känsla personen har.",
  },
  {
    id: 2,
    label: "Hur?",
    keyword: "Exempel från texten",
    explanation: "Citera eller visa var i texten det står.",
  },
  {
    id: 3,
    label: "Krav",
    keyword: "Svar + Bevis",
    explanation: "Koppla ihop känslan med ditt exempel.",
  },
];

interface UnderstandQuestionProps {
  questionText?: string;
  parts?: QuestionPart[];
}

export default function UnderstandQuestion({
  questionText = '"Vilket humör är personen på, och vilket exempel från texten visar det?"',
  parts = DEFAULT_PARTS,
}: UnderstandQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const activePart = parts.find((part) => part.id === selected);

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 font-sans select-none text-slate-800">
      {/* Fråga i fokus */}
      <div className="mb-6 pb-4 border-b border-slate-200/70">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
          Studera frågan och svara exakt
        </span>
        <p className="text-base sm:text-lg font-semibold text-slate-900">
          {questionText}
        </p>
      </div>

      {/* Tredelad uppdelning */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
        {parts.map((part) => {
          const isSelected = selected === part.id;

          return (
            <button
              key={part.id}
              type="button"
              onClick={() => setSelected(isSelected ? null : part.id)}
              className={`
                text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer
                ${
                  isSelected
                    ? "border-slate-800 bg-slate-50 ring-1 ring-slate-800/10"
                    : "border-slate-200/80 bg-white hover:border-slate-300"
                }
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`
                    w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0
                    ${
                      isSelected
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {part.id}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {part.label}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium pl-6">
                {part.keyword}
              </p>
            </button>
          );
        })}
      </div>

      {/* 1-meningsförklaring vid klick */}
      {activePart && (
        <div className="p-3 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 text-xs text-slate-600 font-medium animate-fadeIn">
          {activePart.explanation}
        </div>
      )}
    </div>
  );
}