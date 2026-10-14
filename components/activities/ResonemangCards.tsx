"use client";

import React, { useState } from "react";

type ColorType = "emerald" | "amber" | "rose";

interface Card {
  id: number;
  level: string;
  resultText: string;
  image: string;
  color: ColorType;
  reasoning: string;
  explanation: string;
  principle: string;
}

const CARDS: Card[] = [
  {
    id: 3,
    level: "Fel fokus",
    resultText: "Svaret besvarar inte frågan.",
    image: "/enkelt.png",
    color: "rose",
    reasoning:
      "Linn var först i vattnet när startskottet gick och sänkte sitt rekord med två sekunder.",
    explanation:
      "Detta stämmer överens med texten, men frågan handlar om hur hon kände sig innan tävlingen. Svaret beskriver vad som hände under själva simningen.",
    principle:
      "Läs frågan noga. Kontrollera att ditt svar handlar om just den tidpunkt och känsla som efterfrågas.",
  },
  {
    id: 2,
    level: "Nästan – något saknas",
    resultText: "Du har förstått en del.",
    image: "/utvecklat.png",
    color: "amber",
    reasoning: "Hon var nervös och fokuserad.",
    explanation:
      "Det är en helt rätt tolkning av känslan, men frågan ber också om exempel från texten. Du behöver visa vad i texten som får dig att förstå att hon var nervös.",
    principle:
      "Kontrollera hela frågan. Om uppgiften ber om både ett svar och ett bevis från texten behöver du ha med båda delarna.",
  },
  {
    id: 1,
    level: "Fullträff",
    resultText: "Svaret uppfyller frågans krav.",
    image: "/välutvecklat.png",
    color: "emerald",
    reasoning:
      "Linn var nervös och väldigt fokuserad. Det märks eftersom hon inte kunde äta någon frukost och för att hon satt för sig själv i omklädningsrummet med hörlurar på och stirrade på sina händer.",
    explanation:
      "Svaret anger tydligt känslan och stöder slutsatsen med konkreta detaljer från texten. Eleven besvarar båda delarna av frågan och visar att hen läst mellan raderna.",
    principle:
      "Svara på det som efterfrågas och motivera alltid din slutsats med exempel eller citat från texten.",
  },
];

const colorClasses: Record<
  ColorType,
  {
    badge: string;
    border: string;
    accent: string;
    bg: string;
    hover: string;
  }
> = {
  emerald: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    border: "border-emerald-200",
    accent: "text-emerald-700",
    bg: "bg-emerald-50/60",
    hover: "hover:border-emerald-400",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700 border-amber-100",
    border: "border-amber-200",
    accent: "text-amber-700",
    bg: "bg-amber-50/60",
    hover: "hover:border-amber-400",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700 border-rose-100",
    border: "border-rose-200",
    accent: "text-rose-700",
    bg: "bg-rose-50/60",
    hover: "hover:border-rose-400",
  },
};

export default function ResonemangCards() {
  const [flippedCards, setFlippedCards] = useState<
    Record<number, boolean>
  >({});

  const handleCardClick = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap');

        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          const colors = colorClasses[card.color];

          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={isFlipped}
              aria-label={`${card.level}. ${
                isFlipped
                  ? "Visa elevens svar igen"
                  : "Visa bedömningen och förklaringen"
              }`}
              className="relative min-h-[680px] sm:min-h-[640px] w-full text-left [perspective:1000px] cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 rounded-3xl"
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`
                  relative w-full h-full min-h-[680px] sm:min-h-[640px]
                  transition-transform duration-700
                  [transform-style:preserve-3d]
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                `}
              >
                {/* FRAMSIDA */}
                <div
                  className={`
                    absolute inset-0
                    [backface-visibility:hidden]
                    rounded-3xl border-2 bg-white shadow-sm
                    p-6 flex flex-col justify-between
                    transition-shadow duration-300
                    overflow-y-auto
                    ${colors.border}
                    ${colors.hover}
                    group-hover:shadow-lg
                  `}
                >
                  <div className="space-y-5">
                    <span
                      className={`
                        inline-flex items-center rounded-full
                        border px-3 py-1.5
                        text-xs font-black uppercase tracking-wide
                        ${colors.badge}
                      `}
                    >
                      {card.level}
                    </span>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Elevens svar
                      </p>

                      <div
                        className={`
                          rounded-2xl border p-5
                          ${colors.bg} ${colors.border}
                        `}
                      >
                        <p className="font-handwriting text-lg sm:text-xl leading-snug text-slate-800">
                          ”{card.reasoning}”
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Fundera på
                      </p>

                      <p className="text-sm leading-relaxed text-slate-600">
                        {card.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 text-center border-t border-slate-100 shrink-0">
                    <span className={`text-sm sm:text-base font-extrabold ${colors.accent}`}>
                      Vänd kortet för att se bedömningen
                    </span>
                  </div>
                </div>

                {/* BAKSIDA */}
                <div
                  aria-hidden={!isFlipped}
                  className={`
                    absolute inset-0
                    [backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                    rounded-3xl border-2 ${colors.border}
                    bg-white shadow-xl p-6
                    flex flex-col overflow-y-auto
                  `}
                >
                  <div className="text-center shrink-0">
                    <span
                      className={`
                        inline-flex items-center rounded-full
                        border px-4 py-1.5
                        text-xs font-black uppercase tracking-wide
                        ${colors.badge}
                      `}
                    >
                      {card.level}
                    </span>

                    <h3 className="mt-3 text-lg sm:text-xl font-black leading-snug text-slate-800">
                      {card.resultText}
                    </h3>
                  </div>

                  <div className="flex-1 min-h-0 w-full flex items-center justify-center py-3">
                    <img
                      src={card.image}
                      alt=""
                      className="max-h-[130px] sm:max-h-[150px] max-w-[80%] object-contain"
                    />
                  </div>

                  <div
                    className={`
                      rounded-2xl border p-4 shrink-0
                      ${colors.bg} ${colors.border}
                    `}
                  >
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      Därför bedöms svaret så här
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {card.explanation}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4 shrink-0">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      Kom ihåg
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {card.principle}
                    </p>
                  </div>

                  <div className="text-center pt-4 shrink-0">
                    <span className={`inline-block rounded-xl px-4 py-2 text-xs sm:text-sm font-bold ${colors.badge}`}>
                      Vänd tillbaka
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* VIKTIG LÄRDOM */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="flex gap-4 items-start">
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-lg">
              💡
            </div>
          </div>

          <div>
            <h3 className="font-black text-slate-800 mb-1">
              Kom ihåg inför provet
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Ett bra svar behöver inte vara långt. Svara på det som
              frågan faktiskt frågar efter. Visa med exempel eller citat
              hur du tänker när uppgiften kräver det. Följ alltid
              instruktionen och kontrollera att du har fått med alla delar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}