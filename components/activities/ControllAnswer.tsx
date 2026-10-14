"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export interface CheckItem {
  id: number;
  title: string;
  text: string;
}

const DEFAULT_CHECKS: CheckItem[] = [
  {
    id: 1,
    title: "Jag svarar på exakt det som frågas",
    text: "Alla delar i frågan är besvarade – inget viktigt saknas.",
  },
  {
    id: 2,
    title: "Jag hittar rätt ställe i texten",
    text: "Stryk under ankarordet, skanna texten och läs meningen före och efter.",
  },
  {
    id: 3,
    title: "Jag har stöd för hela svaret",
    text: "Varje viktig del kan beläggas i texten, med citat eller förklaring vid behov.",
  },
  {
    id: 4,
    title: "Jag undviker nästan-rätt-svaret",
    text: "Svaret träffar rätt fokus och innehåller hela det som efterfrågas – inte bara något som delvis stämmer.",
  },
  {
    id: 5,
    title: "Jag drar slutsatser med ledtrådar",
    text: "Jag samlar relevanta ledtrådar nära textstället och formulerar slutsatsen med egna ord.",
  },
  {
    id: 6,
    title: "Jag får med det avgörande ledet",
    text: "Orsaken, jämförelsen eller kopplingen som frågan kräver finns med i svaret.",
  },
  {
    id: 7,
    title: "Jag är exakt och gissar inte",
    text: "Namn, siffror och uttryck stämmer med texten. Jag lägger inte till egna antaganden.",
  },
  {
    id: 8,
    title: "Jag skriver kort och träffsäkert",
    text: "Svaret är tydligt, relevant och fritt från onödigt fyllnadsmaterial.",
  },
];

interface ControllAnswerProps {
  checks?: CheckItem[];
}

export default function ControllAnswer({ checks = DEFAULT_CHECKS }: ControllAnswerProps) {
  const [checked, setChecked] = useState<number[]>([]);

  const toggleCheck = (id: number) => {
    setChecked((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const allChecked = checked.length === checks.length;

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 font-sans select-none text-slate-800">
      {/* Rubrik */}
      <div className="mb-6 pb-4 border-b border-slate-200/70">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800 block mb-1">
          Egenkontroll
        </span>
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
          Stämmer ditt svar med kraven?
        </h2>
        <p className="mt-1 text-xs text-slate-800">
          Kontrollera varje punkt innan du lämnar in.
        </p>
      </div>

      {/* Checklista */}
      <div className="space-y-2 mb-6">
        {checks.map((check) => {
          const isChecked = checked.includes(check.id);

          return (
            <button
              key={check.id}
              type="button"
              onClick={() => toggleCheck(check.id)}
              aria-pressed={isChecked}
              className={`
                w-full flex items-center justify-between p-3.5 px-4 rounded-xl
                border transition-all duration-150 cursor-pointer text-left
                ${
                  isChecked
                    ? "border-emerald-300/80 bg-emerald-50/40 text-slate-900"
                    : "border-slate-200/80 bg-white hover:border-slate-300 text-slate-700"
                }
              `}
            >
              <div className="flex items-center gap-3 pr-2">
                <span
                  className={`
                    w-4 h-4 rounded-md border flex items-center justify-center
                    shrink-0 transition-colors
                    ${
                      isChecked
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 bg-transparent"
                    }
                  `}
                >
                  {isChecked && (
                    <Check className="w-3 h-3 stroke-[3]" />
                  )}
                </span>

                <div>
                  <span
                    className={`text-xs font-semibold block ${
                      isChecked ? "text-emerald-950" : "text-slate-800"
                    }`}
                  >
                    {check.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {check.text}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Statusrad */}
      <div className="p-3 px-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>
          {allChecked
            ? "Alla punkter kontrollerade!"
            : `${checked.length} av ${checks.length} avbockade`}
        </span>

        {allChecked && (
          <span className="font-bold text-emerald-700">
            Redo att skicka in
          </span>
        )}
      </div>
    </div>
  );
}