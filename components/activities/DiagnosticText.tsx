"use client";

import React, { useState } from "react";

export interface Question {
  id: number;
  type: "multiple" | "open";
  question: string;
  options?: string[];
  correct?: number;
}

export interface DiagnosticData {
  textData: {
    title: string;
    text: string;
    image?: string;
  };
  questions: Question[];
}

interface DiagnosticTextProps {
  data?: DiagnosticData;
}

const DEFAULT_DIAGNOSTIC_DATA: DiagnosticData = {
  textData: {
    title: "SIMTÄVLINGEN",
    image: "/images/simtavling.jpg",
    text: `Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.

I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Hon försökte fokusera på musikens taktslag, men tankarna flög hela tiden i väg till startpallen och det kalla vattnet.

När startskottet slutligen ljöd var hon ändå först i vattnet. All tvekan försvann och ersattes av de invanda rörelserna hon tränat på så länge. När hon slog i kanten efter sista längden och såg upp mot resultattavlan insåg hon att hon hade sänkt sitt personliga rekord med två sekunder.`,
  },
  questions: [
    {
      id: 1,
      type: "multiple",
      question: "1. Hur länge hade Linn tränat inför tävlingen enligt texten?",
      options: ["I fyra veckor", "I fyra månader", "I två månader"],
      correct: 1,
    },
    {
      id: 2,
      type: "multiple",
      question: "2. Vad gör Linn i omklädningsrummet för att hantera situationen?",
      options: [
        "Hon pratar och skrattar med sina lagkamrater.",
        "Hon sitter ensam med hörlurar på och lyssnar på musik.",
        "Hon ber sin mamma om hjälp med simglasögonen.",
      ],
      correct: 1,
    },
    {
      id: 3,
      type: "open",
      question:
        "3. Resonerande fråga: Hur märks det i texten att Linn är nervös, utan att ordet 'nervös' skrivs ut? Motivera med stöd från texten.",
    },
    {
      id: 4,
      type: "open",
      question:
        "4. Resonerande fråga: Vilken inställning har Linn till simningen och sin träning? Använd flera delar av texten för att förklara ditt svar.",
    },
  ],
};

export default function DiagnosticText({ data = DEFAULT_DIAGNOSTIC_DATA }: DiagnosticTextProps) {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { textData, questions } = data;

  const handleSelect = (qId: number, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleTextChange = (qId: number, text: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: text }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 font-sans text-slate-800">
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden">
        {/* HEADER */}
        <div className="bg-slate-900 text-white p-6 md:p-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              🗝️ Fängelsehålan · Diagnos
            </p>
            <h1 className="text-xl font-extrabold">{textData.title}</h1>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="p-6 md:p-8">
          {/* KOM IGÅNG-STEG */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-amber-950 font-medium">
              <span className="font-bold flex items-center gap-1 uppercase tracking-wider text-xs mr-2 text-amber-800">
                💡 Kom igång:
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs text-slate-800">
                1. Titta på rubriken
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs text-slate-800">
                2. Skapa inre bilder
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs text-slate-800">
                3. Skumläs &amp; nyckelord
              </span>
              <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs text-slate-800">
                4. Förutspå innehållet
              </span>
            </div>
          </div>

          {/* BILD */}
          {textData.image && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
              <img
                src={textData.image}
                alt={textData.title}
                className="w-full h-56 md:h-64 object-cover"
              />
            </div>
          )}

          {/* TEXT + FRÅGOR */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] gap-8">
            {/* LÄSTEXT */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
                Lästext
              </h2>
              <div className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line font-serif">
                {textData.text}
              </div>
            </section>

            {/* FRÅGOR */}
            <aside className="lg:border-l lg:border-slate-200 lg:pl-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Frågor</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Läs texten noggrant och besvara frågorna.
                </p>
              </div>

              <div className="space-y-6">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h3>

                    {/* FLERVAL */}
                    {q.type === "multiple" && q.options && (
                      <div className="space-y-2">
                        {q.options.map((option, idx) => {
                          const isSelected = answers[q.id] === idx;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleSelect(q.id, idx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? "border-amber-600 bg-amber-50/80 font-bold text-amber-950 shadow-xs"
                                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* FRITEXT */}
                    {q.type === "open" && (
                      <textarea
                        value={(answers[q.id] as string) || ""}
                        onChange={(e) => handleTextChange(q.id, e.target.value)}
                        rows={5}
                        placeholder="Skriv ditt resonemang här..."
                        className="w-full p-3.5 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-y"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md cursor-pointer"
              >
                Lämna in diagnos
              </button>

              {submitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold text-center animate-fadeIn">
                  🎉 Bra jobbat! Dina svar har skickats in.
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}