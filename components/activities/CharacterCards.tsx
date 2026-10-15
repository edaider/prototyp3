"use client";

import React from "react";

export interface CharacterCardItem {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  imgSrc: string;
  question: string;
  coreMessage: string;
  points: string[];
  strategy: string;
  example: string;
}

const DEFAULT_FIGURES: CharacterCardItem[] = [
  {
    id: "detektiven",
    title: "Detektiven",
    emoji: "🔎",
    subtitle: "Hitta information",
    imgSrc: "/images/detektiven.png",
    question: "”Vad står det?”",
    coreMessage: "Jag hittar exakt den information som frågan efterfrågar.",
    points: [
      "hittar information som står direkt i texten",
      "letar efter viktiga ord och detaljer",
      "identifierar personer, platser, händelser och fakta",
      "hittar rätt ställe och läser informationen i sitt sammanhang",
      "skiljer rätt svar från närliggande men felaktiga uppgifter",
      "återger namn, siffror och uttryck korrekt",
    ],
    strategy:
      "Sökläs – hitta ankarorden i frågan, leta efter dem i texten och kontrollera att du får med exakt rätt information.",
    example: "Hur länge hade Linn tränat inför simtävlingen?",
  },
  {
    id: "pusslaren",
    title: "Pusslaren",
    emoji: "🧩",
    subtitle: "Dra enkla slutsatser",
    imgSrc: "/images/pusslaren.png",
    question: "”Vad kan jag förstå av ledtrådarna?”",
    coreMessage:
      "Jag drar slutsatser utifrån ledtrådar som tillsammans pekar mot ett svar.",
    points: [
      "uppmärksammar sådant som texten antyder",
      "samlar relevanta ledtrådar nära textstället",
      "kopplar ihop detaljer som hjälper mig att förstå en situation",
      "drar slutsatser om exempelvis känslor, motiv och orsaker",
      "formulerar slutsatsen med egna ord",
      "kontrollerar att slutsatsen stöds av texten och inte bara är en gissning",
    ],
    strategy:
      "Leta efter ledtrådar – samla detaljerna, koppla ihop dem och förklara vad de visar.",
    example: "Varför äter Linn troligen ingen frukost före tävlingen?",
  },
  {
    id: "analytikern",
    title: "Analytikern",
    emoji: "🧠",
    subtitle: "Sammanföra och tolka",
    imgSrc: "/images/analytikern.png",
    question: "”Vad betyder det när jag ser helheten?”",
    coreMessage:
      "Jag sammanför information från olika delar av texten och motiverar min tolkning med textbelägg.",
    points: [
      "kopplar ihop information från början, mitten och slutet",
      "upptäcker samband, förändringar och återkommande mönster",
      "tolkar vad texten visar om personer, känslor och inställningar",
      "förstår underförstådda betydelser utifrån textens helhet",
      "använder flera konkreta textbelägg för att stödja sin tolkning",
      "prövar olika svar mot hela texten och väljer det som stämmer bäst",
    ],
    strategy:
      "Lägg pusslet – samla relevanta textställen, hitta mönstret och pröva din tolkning mot helheten.",
    example:
      "Vilket påstående stämmer bäst med Linns inställning till tävlingen?",
  },
  {
    id: "journalisten",
    title: "Journalisten",
    emoji: "📰",
    subtitle: "Granska och värdera",
    imgSrc: "/images/journalisten.png",
    question: "”Hur är texten skriven – och varför?”",
    coreMessage:
      "Jag granskar hur författaren använder språk och detaljer för att förmedla innehåll och påverka läsarens upplevelse.",
    points: [
      "undersöker ordval, bildspråk och andra stilgrepp",
      "granskar berättarperspektiv och textens uppbyggnad",
      "förklarar hur språk och konkreta detaljer påverkar läsarens upplevelse",
      "undersöker hur författaren gestaltar personer och känslor",
      "resonerar om vilken effekt författarens val får",
      "granskar syfte, argument och trovärdighet när texttypen kräver det",
    ],
    strategy:
      "Zooma ut – granska hur texten är skriven och vilken effekt författarens val får, inte bara vad som händer.",
    example:
      "Hur visar författaren att Linn är nervös utan att använda ordet ”nervös”?",
  },
];

interface CharacterCardsProps {
  figures?: CharacterCardItem[];
}

export default function CharacterCards({ figures = DEFAULT_FIGURES }: CharacterCardsProps) {
  return (
    <div className="w-full bg-white py-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3 text-center">
        Fyra sätt att läsa
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {figures.map((fig) => (
          <div
            key={fig.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Bild */}
            <div className="bg-white p-6 flex justify-center items-center border-b border-slate-100 h-48">
              <img
                src={fig.imgSrc}
                alt={fig.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col">
              {/* Rubrik */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-1.5">
                  <span aria-hidden="true">{fig.emoji}</span>
                  <span>{fig.title}</span>
                </h3>

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {fig.subtitle}
                </span>
              </div>

              {/* Huvudfråga */}
              <div className="bg-slate-50 p-3 rounded-xl text-center mb-4 border border-slate-100">
                <p className="text-sm font-medium text-slate-800 italic">
                  {fig.question}
                </p>
              </div>

              {/* Förmågor */}
              <ul className="space-y-2 mb-5 text-xs text-slate-600">
                {fig.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="text-slate-400 font-bold"
                    >
                      •
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Strategi */}
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 mb-4">
                <p className="text-[11px] uppercase tracking-wider font-bold text-blue-700 mb-1">
                  Min strategi
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {fig.strategy}
                </p>
              </div>

              {/* Exempel */}
              <div className="mb-5">
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  Exempel på fråga
                </p>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  {fig.example}
                </p>
              </div>

              {/* Kärnbudskap */}
              <div className="mt-auto pt-4 border-t border-slate-100">
                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  Kärna
                </p>
                <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
                  ”{fig.coreMessage}”
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}