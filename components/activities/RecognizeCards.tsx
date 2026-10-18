"use client";

import React, { useState } from "react";

export interface RecognizeCardItem {
  id: number;
  category: string;
  image: string;
  text: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const DEFAULT_CARDS: RecognizeCardItem[] = [
  {
    id: 1,
    category: "Skönlitteratur",
    image: "/images/skonlitteratur.png",
    text:
      "När Alva kom hem låg brevet på köksbordet. Hon kände igen handstilen direkt, men hade inte sett den på nästan tio år. Försiktigt vände hon på kuvertet. Avsändarens namn fick hennes händer att börja skaka.",
    question: "Vilken texttyp passar bäst?",
    options: [
      "En utredande text",
      "En novell",
      "En argumenterande text",
      "En instruktion",
    ],
    correctAnswer: 1,
    explanation:
      "Utdraget berättar om en person och en händelse. Vi får ledtrådar om Alvas känslor genom hennes reaktioner, utan att de förklaras direkt. Det är typiskt för skönlitterärt berättande, exempelvis en novell.",
  },
  {
    id: 2,
    category: "Sakprosa – argumenterande",
    image: "/images/sakprosa.png",
    text:
      "Skolan borde erbjuda fler vegetariska lunchalternativ. Det skulle ge elever större möjlighet att välja mat som passar deras önskemål och samtidigt minska måltidernas klimatpåverkan. Därför bör skolledningen se över menyn redan inför nästa termin.",
    question: "Vilken texttyp passar bäst?",
    options: [
      "En novell",
      "En utredande text",
      "En argumenterande text",
      "En multimodal text",
    ],
    correctAnswer: 2,
    explanation:
      "Texten driver en tydlig ståndpunkt: skolan borde erbjuda fler vegetariska alternativ. Den stöder ståndpunkten med argument och avslutar med en uppmaning. Det är typiskt för en argumenterande text.",
  },
  {
    id: 3,
    category: "Sakprosa – utredande",
    image: "/images/sakprosa.png",
    text:
      "Hur påverkas ungdomars sömn av mobilanvändning på kvällen? För att undersöka frågan behöver vi studera både hur skärmtid kan påverka sömnvanor och hur andra faktorer, exempelvis stress och läggtider, spelar in. Resultaten kan hjälpa oss att förstå varför ungdomar sover olika mycket.",
    question: "Vilken texttyp passar bäst?",
    options: [
      "En argumenterande text",
      "En novell",
      "En dikt",
      "En utredande text",
    ],
    correctAnswer: 3,
    explanation:
      "Texten utgår från en fråga som ska undersökas. Den tar upp flera faktorer och försöker skapa förståelse snarare än att främst övertyga läsaren om en bestämd ståndpunkt. Det är typiskt för en utredande text.",
  },
  {
    id: 4,
    category: "Multimodal text",
    image: "/images/multimodal.png",
    text:
      "RÄDDA HAVET!\n\nEn affisch visar en sköldpadda som simmar bland plastpåsar. Under bilden står det: \"Din plast kan bli havets problem.\" Längst ner finns tre konkreta tips för att minska plastavfallet.",
    question: "Var kan vi stöta på en multimodal text som denna?",
    options: [
      "I en tryckt textbok som helt saknar bilder och grafik.",
      "På en informationsaffisch eller kampanjsida med bild och layout.",
      "I ett renodlat ljudklipp på radio utan visuella inslag.",
      "I en ordbok som endast listar ord och korta definitioner.",
    ],
    correctAnswer: 1,
    explanation:
      "En multimodal text kombinerar ord, bild och layout för att förmedla ett budskap. Informationsaffischer, broschyrer och websidor är typiska exempel där fler uttrycksformer samverkar.",
  },
];

interface RecognizeCardsProps {
  cards?: RecognizeCardItem[];
}

export default function RecognizeCards({
  cards = DEFAULT_CARDS,
}: RecognizeCardsProps) {
  const [completedCards, setCompletedCards] = useState<
    Record<number, boolean>
  >({});
  const [wrongCard, setWrongCard] = useState<number | null>(null);

  const handleAnswer = (
    card: RecognizeCardItem,
    optionIndex: number
  ) => {
    if (completedCards[card.id]) return;

    if (optionIndex === card.correctAnswer) {
      setCompletedCards((prev) => ({
        ...prev,
        [card.id]: true,
      }));
      setWrongCard(null);
    } else {
      setWrongCard(card.id);
    }
  };

  const resetCards = () => {
    setCompletedCards({});
    setWrongCard(null);
  };

  const completedCount = cards.filter(
    (card) => completedCards[card.id]
  ).length;

  return (
    <section className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-sm font-semibold text-slate-700"
            aria-live="polite"
          >
            Du har klarat {completedCount} av {cards.length} kort.
          </p>

          <button
            type="button"
            onClick={resetCards}
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-900 underline underline-offset-4"
          >
            Börja om
          </button>
        </div>

        <div
          className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"
          role="progressbar"
          aria-label="Framsteg"
          aria-valuemin={0}
          aria-valuemax={cards.length}
          aria-valuenow={completedCount}
        >
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{
              width: `${cards.length ? (completedCount / cards.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card) => {
          const isCompleted = !!completedCards[card.id];
          const isWrong = wrongCard === card.id;

          return (
            <div
              key={card.id}
              className="relative h-[680px] sm:h-[720px] [perspective:1000px]"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  isCompleted ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Framsida */}
                <div
                  className={`absolute inset-0 rounded-3xl border-2 bg-white shadow-sm p-5 sm:p-6 flex flex-col [backface-visibility:hidden] ${
                    isWrong
                      ? "border-red-400"
                      : "border-slate-200"
                  }`}
                >
                  <div className="h-28 flex items-center justify-center mb-4">
                    <img
                      src={card.image}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 mb-4">
                    <p className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
                      {card.text}
                    </p>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug mb-4">
                    {card.question}
                  </h3>

                  <div className="space-y-2.5 mt-auto">
                    {card.options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        disabled={isCompleted}
                        onClick={() => handleAnswer(card, index)}
                        className="w-full flex items-start gap-3 text-left rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 disabled:cursor-default"
                      >
                        <span
                          aria-hidden="true"
                          className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 border-slate-300"
                        />
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>

                  {isWrong && (
                    <p
                      role="status"
                      className="text-sm font-semibold text-red-600 mt-3"
                    >
                      Inte riktigt. Leta efter textens syfte och typiska drag.
                    </p>
                  )}
                </div>

                {/* Baksida */}
                <div className="absolute inset-0 rounded-3xl border-2 border-emerald-400 bg-emerald-600 shadow-lg p-5 sm:p-6 flex flex-col text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="text-center mb-5">
                    <span className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-wide">
                      Rätt svar!
                    </span>

                    <h3 className="text-2xl font-black mt-3">
                      {card.category}
                    </h3>
                  </div>

                  <div className="h-32 flex items-center justify-center mb-5">
                    <img
                      src={card.image}
                      alt=""
                      className="max-h-full max-w-[75%] object-contain"
                    />
                  </div>

                  <div className="rounded-2xl bg-white/15 border border-white/20 p-4 mb-5">
                    <p className="text-xs font-black uppercase tracking-wider mb-2 text-emerald-50">
                      Varför är svaret rätt?
                    </p>
                    <p className="text-sm leading-relaxed">
                      {card.explanation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCompletedCards((prev) => ({
                        ...prev,
                        [card.id]: false,
                      }))
                    }
                    className="mt-auto w-full rounded-xl bg-white text-emerald-800 font-bold px-4 py-3 hover:bg-emerald-50 transition-colors"
                  >
                    ↶ Läs igen
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}