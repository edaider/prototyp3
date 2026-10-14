"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from "lucide-react";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type Props = {
  activity: {
    content: {
      questions?: Question[];
    };
  };
};

export function Quiz({ activity }: Props) {
  const questions = activity?.content?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (questions.length === 0) {
    return <p className="text-sm text-slate-500">Inga frågor tillgängliga.</p>;
  }

  const currentQ = questions[currentIndex];

  function handleSelect(optionIndex: number) {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
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
      <div className="py-8 text-center space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-800 shadow-inner">
          <CheckCircle2 className="h-10 w-10 text-amber-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Diagnos genomförd!</h2>
          <p className="mt-2 text-base text-slate-600">
            Du fick <span className="font-bold text-amber-800">{score}</span> av{" "}
            <span className="font-bold">{questions.length}</span> rätt.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="inline-flex items-center gap-2 rounded-xl border border-amber-900/30 bg-amber-800 px-6 py-2.5 text-sm font-bold text-amber-50 shadow-md transition hover:bg-amber-900 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Gör om diagnosen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Diagnos ({currentIndex + 1} av {questions.length})
        </span>
        <span className="text-xs font-semibold text-slate-500">
          Poäng: {score}
        </span>
      </div>

      <h2 className="text-xl font-bold text-slate-900 leading-snug">
        {currentQ.question}
      </h2>

      <div className="space-y-3 pt-2">
        {currentQ.options.map((optionText, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctAnswer;

          let btnStyle = "border-slate-200 bg-white hover:bg-slate-50 text-slate-800";

          if (isAnswered) {
            if (isCorrect) {
              btnStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold";
            } else if (isSelected) {
              btnStyle = "border-rose-400 bg-rose-50/80 text-rose-950 font-semibold";
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
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
            >
              <span>{optionText}</span>
              {isAnswered && isCorrect && (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              )}
              {isAnswered && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3 animate-fadeIn">
          <p className="text-xs font-medium text-slate-700 leading-relaxed">
            {currentQ.explanation}
          </p>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-800 px-5 py-2 text-xs font-bold text-amber-50 hover:bg-amber-900 transition cursor-pointer"
            >
              <span>{currentIndex < questions.length - 1 ? "Nästa fråga" : "Se resultat"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}