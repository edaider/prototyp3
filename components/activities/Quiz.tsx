"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

type StepData = {
  id: number;
  highlightedText: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

// De 4 stegen med motsvarande gula markeringar och frågor
const STEPS: StepData[] = [
  {
    id: 1,
    highlightedText: "Simtävlingen",
    question: "Vad gör Edda här?",
    options: [
      "Hon tittar på rubriken för att förutsäga innehållet",
      "Hon skumläser hela texten snabbt",
      "Hon slår upp ett svårt ord",
      "Hon sammanfattar texten"
    ],
    correctAnswer: 0,
    explanation: "Rätt! Edda markerar rubriken 'Simtävlingen' för att förutsäga vad texten handlar om innan hon börjar läsa."
  },
  {
    id: 2,
    highlightedText: "I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer.",
    question: "Vad gör Edda när hon stannar upp vid denna mening?",
    options: [
      "Hon räknar hur många ord det finns i meningen",
      "Hon skapar inre bilder för att förstå känslan i texten",
      "Hon hoppar över meningen för att spara tid",
      "Hon letar efter stavfel"
    ],
    correctAnswer: 1,
    explanation: "Exakt! Edda hjälper sig själv att leva sig in i berättelsen genom att skapa en inre bild i huvudet."
  },
  {
    id: 3,
    highlightedText: "personliga rekord",
    question: "Vad är det Edda gör här?",
    options: [
      "Hon hittar på ett eget ord",
      "Hon gissar vad hela texten handlar om",
      "Hon reder ut vad ett svårt ord/begrepp betyder",
      "Hon läser sista meningen baklänges"
    ],
    correctAnswer: 2,
    explanation: "Helt rätt! När Edda stöter på begreppet 'personliga rekord' stannar hon upp och reder ut vad det faktiskt betyder."
  },
  {
    id: 4,
    highlightedText: "simtävlingen • startskottet • personliga rekord",
    question: "Vad gör Edda för att snabbt få en överblick av nyckelorden?",
    options: [
      "Hon läser varje ord mycket långsamt",
      "Hon skumläser och plockar ut viktiga nyckelord",
      "Hon skriver en hel bok",
      "Hon blundar och lyssnar på ljud"
    ],
    correctAnswer: 1,
    explanation: "Snyggt! Genom att skumläsa kan Edda snabbt hitta de viktigaste orden och få en helhetsbild av texten."
  }
];

export function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = STEPS[currentIndex];

  function handleSelect(optionIndex: number) {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === currentStep.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex < STEPS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  }

  if (isComplete) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center space-y-6 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-800 shadow-inner">
          <CheckCircle2 className="h-10 w-10 text-amber-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bra jobbat med Eddas lästekniker!</h2>
          <p className="mt-2 text-base text-slate-600">
            Du fick <span className="font-bold text-amber-800">{score}</span> av{" "}
            <span className="font-bold">{STEPS.length}</span> rätt.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-900/30 bg-amber-800 px-6 py-2.5 text-sm font-bold text-amber-50 shadow-md transition hover:bg-amber-900 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Gör om övningen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
      {/* Header med steg & poäng */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold text-slate-900">Diagnos: Lästeknikens steg</h1>
        <div className="text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            STEG {currentIndex + 1} AV {STEPS.length}
          </span>
          <span className="text-xs font-semibold text-amber-800">
            Poäng: {score}
          </span>
        </div>
      </div>

      {/* Main Grid: Vänster = Edda + Textvisning, Höger = Elevens Fråga */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* VÄNSTER SPALT: Edda-bild & Textvisning */}
        <div className="lg:col-span-7 flex gap-4 items-start bg-white p-2 rounded-2xl">
          
          {/* Edda-bild */}
          <div className="relative shrink-0 w-28 sm:w-36 pt-2">
            <Image
              src="/images/hovnarren.png"
              alt="Hovnarren Edda"
              width={160}
              height={220}
              className="object-contain"
              priority
            />
          </div>

          {/* Text-kort med Gul Markering */}
          <div className="flex-1 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm text-sm leading-relaxed text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">LÄSTEKNIK</p>

            {/* Rubrik med villkorlig gul markering */}
            <h2 className="text-lg font-bold text-slate-900">
              {currentIndex === 0 ? (
                <mark className="bg-amber-200 px-1.5 py-0.5 rounded font-bold text-slate-900">
                  {currentStep.highlightedText}
                </mark>
              ) : (
                "Simtävlingen"
              )}
            </h2>

            {/* Stycke 1 */}
            <p>
              Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.
            </p>

            {/* Stycke 2 med villkorlig gul markering */}
            <p>
              {currentIndex === 1 ? (
                <mark className="bg-amber-200 px-1.5 py-0.5 rounded font-medium text-slate-900">
                  {currentStep.highlightedText}
                </mark>
              ) : (
                "I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer."
              )}
            </p>

            {/* Stycke 3 med villkorlig gul markering */}
            <p>
              Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt {" "}
              {currentIndex === 2 ? (
                <mark className="bg-amber-200 px-1.5 py-0.5 rounded font-semibold text-slate-900">
                  {currentStep.highlightedText}
                </mark>
              ) : (
                "personliga rekord"
              )}{" "}
              med två sekunder.
            </p>
          </div>
        </div>

        {/* HÖGER SPALT: Elevens Frågekort */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {currentStep.question}
            </h2>

            {/* Svarsalternativ */}
            <div className="space-y-2.5">
              {currentStep.options.map((optionText, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentStep.correctAnswer;

                let btnStyle = "border-slate-200 bg-white hover:bg-amber-50/50 text-slate-800";

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold";
                  } else if (isSelected) {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-950 font-semibold";
                  } else {
                    btnStyle = "border-slate-200 bg-slate-50 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span>{optionText}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Förklaring & Nästa-knapp */}
            {isAnswered && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {currentStep.explanation}
                </p>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-800 px-4 py-2 text-xs font-bold text-amber-50 hover:bg-amber-900 transition cursor-pointer"
                  >
                    <span>{currentIndex < STEPS.length - 1 ? "Gå vidare" : "Avsluta"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}