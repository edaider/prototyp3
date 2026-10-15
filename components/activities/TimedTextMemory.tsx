"use client";

import React, { useState, useEffect } from "react";

export interface TimedWord {
  text: string;
  isKeyWord: boolean;
}

interface TimedTextMemoryProps {
  timerSeconds?: number;
  words?: TimedWord[];
  summaryPoints?: string[];
}

const DEFAULT_WORDS: TimedWord[] = [
  { text: "Öknarna", isKeyWord: true },
  { text: "är", isKeyWord: false },
  { text: "jordens", isKeyWord: false },
  { text: "torraste", isKeyWord: true },
  { text: "områden", isKeyWord: true },
  { text: "och", isKeyWord: false },
  { text: "finns", isKeyWord: false },
  { text: "i", isKeyWord: false },
  { text: "högtrycksområdena", isKeyWord: false },
  { text: "nära", isKeyWord: true },
  { text: "vändkretsarna.", isKeyWord: true },
  { text: "I", isKeyWord: false },
  { text: "en", isKeyWord: false },
  { text: "öken", isKeyWord: false },
  { text: "regnar", isKeyWord: true },
  { text: "det", isKeyWord: false },
  { text: "sällan", isKeyWord: false },
  { text: "mer", isKeyWord: false },
  { text: "än", isKeyWord: false },
  { text: "250", isKeyWord: false },
  { text: "mm/år,", isKeyWord: false },
  { text: "oftast", isKeyWord: false },
  { text: "koncentrerat", isKeyWord: false },
  { text: "till", isKeyWord: false },
  { text: "en", isKeyWord: false },
  { text: "mycket", isKeyWord: false },
  { text: "kort", isKeyWord: true },
  { text: "regntid.", isKeyWord: true },
];

const DEFAULT_POINTS = [
  "Jordens torraste områden",
  "Nära vändkretsarna",
  "Regnar lite och bara en kort tid",
];

export default function TimedTextMemory({
  timerSeconds = 15,
  words = DEFAULT_WORDS,
  summaryPoints = DEFAULT_POINTS,
}: TimedTextMemoryProps) {
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(timerSeconds);
    setIsFinished(false);
    setIsRunning(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Testa minnet</h3>
        {isRunning && (
          <span className="text-lg font-black text-rose-600 bg-rose-100 px-4 py-1 rounded-full animate-pulse">
            ⏱ {timeLeft}s
          </span>
        )}
      </div>

      {!isRunning && !isFinished && (
        <button
          onClick={handleStart}
          className="self-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
        >
          Starta timer ({timerSeconds}s)
        </button>
      )}

      {(isRunning || isFinished) && (
        <div className="p-6 bg-white rounded-xl border border-slate-200 leading-relaxed text-slate-800 text-lg">
          {words.map((wordObj, idx) => {
            const showWord = isRunning || wordObj.isKeyWord;
            return (
              <span
                key={idx}
                className={`inline-block mr-1.5 transition-all duration-300 ${
                  isFinished && wordObj.isKeyWord
                    ? "font-extrabold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded-md"
                    : ""
                }`}
              >
                {showWord ? wordObj.text : "______"}
              </span>
            );
          })}
        </div>
      )}

      {isFinished && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
          <h4 className="font-extrabold text-emerald-900 mb-2">
            Stödord som är kvar:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-emerald-800 text-sm sm:text-base font-medium">
            {summaryPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <button
            onClick={handleStart}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm"
          >
            Försök igen
          </button>
        </div>
      )}
    </div>
  );
}