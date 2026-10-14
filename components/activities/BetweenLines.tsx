'use client';

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type QuestionBlock = {
  title: string;
  badge: string;
  options: Option[];
  correctFeedback: string;
  incorrectFeedback: string;
};

type Props = {
  activity?: {
    content?: {
      title?: string;
      imageSrc?: string;
      excerpt?: string;
      leftQuestion?: QuestionBlock;
      rightQuestion?: QuestionBlock;
    };
  };
};

export function BetweenLines({ activity }: Props) {
  const content = activity?.content;

  const [q1Answer, setQ1Answer] = useState<number | null>(null);
  const [q2Answer, setQ2Answer] = useState<number | null>(null);

  const title = content?.title || "Läs på eller mellan raderna";
  const imageSrc = content?.imageSrc || "/mellanraderna.png";
  const excerpt = content?.excerpt;
  const leftQ = content?.leftQuestion;
  const rightQ = content?.rightQuestion;

  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight text-center">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start gap-6 md:gap-8">
        {/* VÄNSTER FRÅGA */}
        {leftQ && (
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-3">
            <div>
              <p className="text-lg sm:text-xl font-bold text-slate-800">
                {leftQ.title}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md inline-block">
                {leftQ.badge}
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2 pt-2">
              {leftQ.options.map((alt) => {
                const isSelected = q1Answer === alt.id;

                return (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => setQ1Answer(alt.id)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? alt.isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : "border-rose-400 bg-rose-50 text-rose-900"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{alt.text}</span>
                    {isSelected && alt.isCorrect && (
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    )}
                    {isSelected && !alt.isCorrect && (
                      <XCircle size={16} className="text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {q1Answer !== null && (
              <p className={`text-xs font-medium pt-1 animate-fadeIn ${
                leftQ.options.find(o => o.id === q1Answer)?.isCorrect ? "text-emerald-700" : "text-rose-600"
              }`}>
                {leftQ.options.find(o => o.id === q1Answer)?.isCorrect ? leftQ.correctFeedback : leftQ.incorrectFeedback}
              </p>
            )}
          </div>
        )}

        {/* MITTENSEKTION MED BILD OCH CITERAD TEXT */}
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src={imageSrc}
            alt={title}
            className="mx-auto w-full max-w-[320px] h-auto object-contain rounded-xl"
          />
          {excerpt && (
            <p className="text-xs sm:text-sm text-slate-600 max-w-[280px] italic leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              "{excerpt}"
            </p>
          )}
        </div>

        {/* HÖGER FRÅGA */}
        {rightQ && (
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div>
              <p className="text-lg sm:text-xl font-bold text-slate-800">
                {rightQ.title}
              </p>
              <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md inline-block">
                {rightQ.badge}
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2 pt-2">
              {rightQ.options.map((alt) => {
                const isSelected = q2Answer === alt.id;

                return (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => setQ2Answer(alt.id)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? alt.isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : "border-rose-400 bg-rose-50 text-rose-900"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span>{alt.text}</span>
                    {isSelected && alt.isCorrect && (
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    )}
                    {isSelected && !alt.isCorrect && (
                      <XCircle size={16} className="text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {q2Answer !== null && (
              <p className={`text-xs font-medium pt-1 animate-fadeIn ${
                rightQ.options.find(o => o.id === q2Answer)?.isCorrect ? "text-emerald-700" : "text-rose-600"
              }`}>
                {rightQ.options.find(o => o.id === q2Answer)?.isCorrect ? rightQ.correctFeedback : rightQ.incorrectFeedback}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}