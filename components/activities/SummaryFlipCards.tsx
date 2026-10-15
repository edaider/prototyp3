"use client";

import React, { useState } from "react";

export interface SummaryCardItem {
  id: string | number;
  title: string;
  content: string[];
}

interface SummaryFlipCardsProps {
  cards?: SummaryCardItem[];
}

const DEFAULT_CARDS: SummaryCardItem[] = [
  {
    id: "typiskt",
    title: "Vad är typiskt för en sammanfattning?",
    content: [
      "En sammanfattning är kortare än originaltexten",
      "Syftet är att återge det viktigaste i texten",
      "Man skriver sammanfattningen med egna ord",
      "Man lägger inte till några egna åsikter",
      "Det viktigaste är att den som läser förstår innehållet",
      "Skriv bara så att du själv förstår, d.v.s. använda egna ord",
    ],
  },
  {
    id: "steg",
    title: "Gör så här! (Fem steg)",
    content: [
      "1. Läs texten noga och flera gånger (översätt ord du inte förstår)",
      "2. Stryk under den information som du tycker är viktigast",
      "3. Skriv ner det du har strukit under som stödord på ett papper",
      "4. Prova att återberätta texten muntligt med hjälp av stödorden",
      "5. Skriv ner en text med hjälp av stödorden (med egna ord)",
    ],
  },
];

export default function SummaryFlipCards({ cards = DEFAULT_CARDS }: SummaryFlipCardsProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string | number, boolean>>({});

  const toggleFlip = (id: string | number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="h-[380px] w-full [perspective:1000px] cursor-pointer group"
            >
              <div
                className={`
                  relative w-full h-full duration-500 rounded-3xl transition-transform
                  [transform-style:preserve-3d] shadow-lg
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                `}
              >
                {/* FRAMSIDA */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3 bg-indigo-100 px-3 py-1 rounded-full">
                    Klicka för att vända
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-800 leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* BAKSIDA */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl border-2 border-indigo-400 bg-white p-6 flex flex-col overflow-y-auto">
                  <h4 className="text-lg font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-3">
                    {card.title}
                  </h4>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {card.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}