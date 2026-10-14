"use client";

import React, { useState } from "react";

export interface SkillCardItem {
  id: number;
  skill: string;
  character: string;
  image: string;
  text: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const DEFAULT_CARDS: SkillCardItem[] = [
  {
    id: 1,
    skill: "Hitta",
    character: "Detektiven",
    image: "/images/detektiven.png",
    text:
      "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.",
    question: "Hur länge hade Linn tränat inför simtävlingen?",
    options: ["I fyra veckor", "I fyra månader", "I två månader"],
    correctAnswer: 1,
    explanation:
      "Svaret står direkt i textens första mening: Linn hade tränat i fyra månader. Du hittade den exakta informationen som frågan efterfrågade. Det är att sökläsa!",
  },
  {
    id: 2,
    skill: "Förstå",
    character: "Pusslaren",
    image: "/images/pusslaren.png",
    text:
      "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.",
    question: "Varför äter Linn troligen ingen frukost?",
    options: [
      "Hon är förmodligen nervös inför tävlingen.",
      "Hon har bestämt sig för att sluta simma.",
      "Hon vill visa att hon är arg på sin mamma.",
    ],
    correctAnswer: 0,
    explanation:
      "Texten säger inte direkt varför Linn hoppar över frukosten. Men tävlingsdagen, att hon sitter ensam i ett hörn och att hon stirrar på sina händer ger ledtrådar. Tillsammans tyder de på att hon är nervös. Du drog en slutsats med stöd i texten!",
  },
  {
    id: 3,
    skill: "Analysera",
    character: "Analytikern",
    image: "/images/analytikern.png",
    text:
      "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.",
    question:
      "Vilket påstående stämmer bäst överens med Linns inställning till tävlingen?",
    options: [
      "Hon tar tävlingen på allvar och genomför den trots sin nervositet.",
      "Hon är helt ointresserad av tävlingen och vill helst åka hem.",
      "Hon känner sig så säker på att vinna att hon inte behöver anstränga sig.",
    ],
    correctAnswer: 0,
    explanation:
      "Flera delar av texten bildar ett mönster: Linn har tränat i fyra månader och packat väskan i förväg, men verkar samtidigt nervös på morgonen. Trots det är hon först i vattnet och slår sitt personliga rekord. Helheten visar att hon tar tävlingen på allvar och inte låter nervositeten hindra henne. Du sammanförde information från flera delar av texten!",
  },
  {
    id: 4,
    skill: "Undersöka",
    character: "Journalisten",
    image: "/images/journalisten.png",
    text:
      "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.",
    question:
      "Hur visar författaren att Linn är nervös utan att använda ordet ”nervös”?",
    options: [
      "Genom att beskriva hennes handlingar och kroppsspråk, till exempel att hon hoppar över frukosten och stirrar på sina händer.",
      "Genom att direkt berätta att Linn är rädd för att förlora.",
      "Genom att räkna upp alla tävlingar som Linn har deltagit i tidigare.",
    ],
    correctAnswer: 0,
    explanation:
      "Författaren låter läsaren förstå Linns känslor genom konkreta detaljer: hon äter ingen frukost, sitter ensam med hörlurarna på och stirrar på sina händer. I stället för att tala om att hon är nervös gestaltar författaren nervositeten genom hennes beteende. Du granskade hur texten är skriven och vilken effekt detaljerna får!",
  },
];

interface ReadingSkillsCardsProps {
  cards?: SkillCardItem[];
}

export default function ReadingSkillsCards({ cards = DEFAULT_CARDS }: ReadingSkillsCardsProps) {
  const [completedCards, setCompletedCards] = useState<Record<number, boolean>>({});
  const [wrongCard, setWrongCard] = useState<number | null>(null);

  const handleAnswer = (card: SkillCardItem, optionIndex: number) => {
    if (completedCards[card.id]) return;

    if (optionIndex === card.correctAnswer) {
      setCompletedCards((prev) => ({
        ...prev,
        [card.id]: true,
      }));
    } else {
      setWrongCard(card.id);

      setTimeout(() => {
        setWrongCard((current) => (current === card.id ? null : current));
      }, 450);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card) => {
          const isCompleted = !!completedCards[card.id];
          const isWrong = wrongCard === card.id;

          return (
            <div
              key={card.id}
              className={`relative h-[600px] sm:h-[670px] [perspective:1000px] ${
                isWrong ? "animate-shake" : ""
              }`}
            >
              <div
                className={`
                  relative w-full h-full
                  transition-transform duration-700
                  [transform-style:preserve-3d]
                  ${isCompleted ? "[transform:rotateY(180deg)]" : ""}
                `}
              >
                {/* FRAMSIDAN */}
                <div
                  className={`
                    absolute inset-0
                    [backface-visibility:hidden]
                    rounded-3xl border-2 p-5 sm:p-6
                    flex flex-col bg-white shadow-lg
                    ${isWrong ? "border-red-400" : "border-slate-200"}
                  `}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                      {card.skill}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      Läs och svara
                    </span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 mb-5">
                    <p className="text-sm sm:text-base leading-relaxed text-slate-700">
                      {card.text}
                    </p>
                  </div>

                  <h2 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug mb-4">
                    {card.question}
                  </h2>

                  <div className="space-y-2.5 mt-auto">
                    {card.options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        disabled={isCompleted}
                        onClick={() => handleAnswer(card, index)}
                        className="
                          w-full flex items-center gap-3 text-left
                          rounded-xl border border-slate-200 bg-white
                          px-4 py-3 text-sm font-medium text-slate-700
                          shadow-xs transition-all
                          hover:border-indigo-400 hover:bg-indigo-50
                          active:scale-[0.99]
                          disabled:cursor-default
                        "
                      >
                        <span
                          aria-hidden="true"
                          className="flex-shrink-0 w-5 h-5 rounded-md border-2 border-slate-300 bg-white"
                        />
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>

                  {isWrong && (
                    <p
                      role="status"
                      className="text-center text-sm font-bold text-red-500 mt-3"
                    >
                      Inte riktigt – läs texten en gång till!
                    </p>
                  )}
                </div>

                {/* BAKSIDAN */}
                <div
                  className="
                    absolute inset-0
                    [backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                    rounded-3xl border-4 border-emerald-400
                    bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600
                    shadow-xl overflow-hidden
                  "
                >
                  <div className="h-full flex flex-col items-center p-5 sm:p-6 text-white overflow-y-auto">
                    <div className="text-center shrink-0">
                      <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-black uppercase tracking-wide">
                        Rätt svar!
                      </div>

                      <h2 className="mt-3 text-2xl sm:text-3xl font-black">
                        Du är {card.character}!
                      </h2>
                    </div>

                    <div className="flex-1 min-h-0 w-full flex items-center justify-center py-2">
                      <img
                        src={card.image}
                        alt={card.character}
                        className="
                          max-h-[145px] sm:max-h-[175px]
                          max-w-[75%] object-contain drop-shadow-xl
                        "
                      />
                    </div>

                    <div className="w-full rounded-2xl bg-white/15 border border-white/20 p-4 shrink-0">
                      <p className="text-xs font-black uppercase tracking-wider text-emerald-50 mb-1">
                        Så tänkte du
                      </p>
                      <p className="text-sm leading-relaxed text-white">
                        {card.explanation}
                      </p>
                    </div>

                    <div className="text-center mt-4 shrink-0">
                      <p className="text-xs sm:text-sm font-semibold text-emerald-50">
                        Du använde förmågan
                      </p>
                      <p className="text-xl sm:text-2xl font-black mt-1">
                        {card.skill}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}