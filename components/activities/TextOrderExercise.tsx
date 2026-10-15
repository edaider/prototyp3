"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, RotateCcw } from "lucide-react";

export interface TextPart {
  id: string;
  role: "inledning" | "huvuddel1" | "huvuddel2" | "avslutning";
  title: string;
  text: string;
}

const MOBILFRIA_LEKTIONER_PARTS: TextPart[] = [
  {
    id: "part-1",
    role: "inledning",
    title: "Inledning",
    text: "Allt fler skolor inför mobilfria lektioner för att skapa studiero och öka fokus i klassrummen. Många elever upplever dock att mobilen är ett viktigt hjälpmedel eller en trygghet under skoldagen.",
  },
  {
    id: "part-2",
    role: "huvuddel1",
    title: "Huvuddel – Argument 1",
    text: "Ett starkt argument för mobilfria lektioner är att koncentrationen förbättras avsevärt. Forskning visar att bara närvaron av en mobiltelefon, även om den är tystad, stjäl uppmärksamhet från undervisningen.",
  },
  {
    id: "part-3",
    role: "huvuddel2",
    title: "Huvuddel – Argument 2",
    text: "Dessutom ökar den sociala gemenskapen under rasterna när eleverna inte sitter fastklistrade vid sina skärmar, vilket i sin tur leder till bättre trivsel och trygghet på skolan.",
  },
  {
    id: "part-4",
    role: "avslutning",
    title: "Avslutning",
    text: "Sammanfattningsvis väger fördelarna med mobilfria lektioner tyngre än nackdelarna. Genom att lägga undan mobilerna skapar vi en bättre arbetsmiljö för alla elever.",
  },
];

const STEPS = [
  {
    targetRole: "inledning",
    instruction: "Kan du hitta INLEDNINGEN i texten?",
  },
  {
    targetRole: "avslutning",
    instruction: "Snyggt! Kan du nu hitta AVSLUTNINGEN (där det viktigaste sammanfattas)?",
  },
  {
    targetRole: "huvuddel1",
    instruction: "Hitta nu det FÖRSTA ARGUMENTET i huvuddelen!",
  },
  {
    targetRole: "huvuddel2",
    instruction: "Sista pusselbiten! Hitta det ANDRA ARGUMENTET i huvuddelen.",
  },
];

export default function TextOrderExercise() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedPartIds, setCompletedPartIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState<string>(STEPS[0].instruction);

  const currentStep = STEPS[currentStepIndex];

  const handlePartClick = (part: TextPart) => {
    if (isCompleted || completedPartIds.includes(part.id)) return;

    if (part.role === currentStep.targetRole) {
      // RÄTT VAL
      const newCompleted = [...completedPartIds, part.id];
      setCompletedPartIds(newCompleted);

      if (currentStepIndex + 1 < STEPS.length) {
        const nextStepIdx = currentStepIndex + 1;
        setCurrentStepIndex(nextStepIdx);
        setCurrentInstruction(STEPS[nextStepIdx].instruction);
      } else {
        // ALLA DELAR KLARA
        setIsCompleted(true);
        setCurrentInstruction("Grymt jobbat! Du har identifierat alla delar i den argumenterande texten.");
      }
    } else {
      // FEL VAL
      setCurrentInstruction(
        `Nja, det där stycket är inte ${
          currentStep.targetRole === "inledning"
            ? "inledningen"
            : currentStep.targetRole === "avslutning"
            ? "avslutningen"
            : "rätt argument"
        }. Testa ett annat stycke!`
      );
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedPartIds([]);
    setIsCompleted(false);
    setCurrentInstruction(STEPS[0].instruction);
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-8 font-sans bg-white">

      {/* EDDA-INSTRUKTION (HELT VIT YTA, INGEN BORDER/CARD) */}
      <div className="flex items-center justify-between gap-4 pt-2 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
            KLICKA PÅ RÄTT STYCKE
          </span>
          <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            "{currentInstruction}"
          </p>
        </div>

        {/* Statisk bild på Edda utan chattruta */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
          <img
            src="/images/hovnarren.png"
            alt="Edda"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* STYCKENA I TEXTEN (VIT BAKGRUND, REN MÖRK BORDER, INGEN GUL FÄRG) */}
      <div className="space-y-4">
        {MOBILFRIA_LEKTIONER_PARTS.map((part, index) => {
          const isDone = completedPartIds.includes(part.id);

          return (
            <button
              key={part.id}
              type="button"
              onClick={() => handlePartClick(part)}
              className={`w-full text-left rounded-2xl border p-5 sm:p-6 transition-all cursor-pointer relative ${
                isDone
                  ? "border-emerald-500 bg-emerald-50/60 text-emerald-950"
                  : "border-slate-300 bg-white hover:border-slate-400 text-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isDone
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      Stycke {index + 1} {isDone ? `· ${part.title}` : ""}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed font-serif text-slate-800">
                    {part.text}
                  </p>
                </div>

                {isDone ? (
                  <div className="flex-shrink-0 text-emerald-600 pt-1">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                ) : (
                  <span className="flex-shrink-0 text-xs font-bold text-slate-500 pt-1 hover:text-slate-800">
                    Klicka för att välja
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* NÄR ÖVNINGEN ÄR KLAR: ENDAST TEXT + KNAPP (INGET GRÖNT ELEMENT ELLER KORT RUNTOM) */}
      {isCompleted && (
        <div className="pt-6 text-center space-y-4 animate-fadeIn">
          <h2 className="text-2xl font-bold text-slate-900">Snyggt jobbat!</h2>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Gör om övningen</span>
          </button>
        </div>
      )}
    </section>
  );
}