"use client";

import React, { useState } from "react";

export interface TextTypeCardItem {
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

const DEFAULT_CARDS: TextTypeCardItem[] = [
  {
    id: "skonlitteratur",
    title: "Skönlitteratur",
    emoji: "",
    subtitle: "Berätta och gestalta",
    imgSrc: "/images/skönlitteratur.png",
    question: "Vad händer – och vad får jag förstå?",
    coreMessage:
      "Skönlitterära texter berättar om människor, händelser och upplevelser. Läsaren får föreställa sig och tolka det som händer.",
    points: [
      "En inledning presenterar ofta en person, en miljö eller en situation.",
      "En handling utvecklas genom händelser, problem eller konflikter.",
      "Personer och känslor gestaltas genom handlingar, tankar, dialog och miljö.",
      "Berättarperspektivet visar vem som berättar historien.",
      "Språket kan använda bildspråk, sinnesintryck och levande beskrivningar.",
      "Slutet kan lösa konflikten eller lämna frågor öppna.",
    ],
    strategy:
      "Följ handlingen, lägg märke till hur personerna förändras och undersök vad författaren låter dig förstå mellan raderna.",
    example:
      "När hon öppnade dörren stod skorna kvar i hallen. Men lägenheten var tyst, och på köksbordet låg ett kuvert med hennes namn.",
  },
  {
    id: "sakprosa",
    title: "Sakprosa",
    emoji: "",
    subtitle: "Informera och påverka",
    imgSrc: "/images/sakprosa.png",
    question: "Vad vill texten förklara eller övertyga mig om?",
    coreMessage:
      "Sakprosatexter behandlar verkliga ämnen. De kan informera, undersöka frågor, resonera eller försöka övertyga läsaren.",
    points: [
      "Inledningen presenterar ämnet, frågan eller ståndpunkten.",
      "Huvuddelen utvecklar innehållet med argument, fakta, exempel eller resonemang.",
      "Stycken och sambandsord hjälper läsaren att följa tankegången.",
      "En argumenterande text driver en tes och stöder den med argument.",
      "En utredande text undersöker en fråga med hjälp av information och olika perspektiv.",
      "Avslutningen sammanfattar, drar en slutsats eller förstärker textens huvudbudskap.",
    ],
    strategy:
      "Identifiera syftet. Leta efter tes och argument i argumenterande texter och efter frågeställning, fakta och slutsatser i utredande texter.",
    example:
      "Bör skoldagen börja senare? För att kunna besvara frågan behöver vi undersöka hur sömn påverkar ungdomars koncentration och lärande.",
  },
  {
    id: "multimodal",
    title: "Multimodal text",
    emoji: "",
    subtitle: "Tolka flera uttrycksformer",
    imgSrc: "/images/multimodal.png",
    question: "Hur samverkar text, bild och form?",
    coreMessage:
      "En multimodal text förmedlar innehåll genom flera uttrycksformer, exempelvis skriven text, bilder, färger, ljud eller film.",
    points: [
      "Rubriker och underrubriker hjälper läsaren att hitta viktig information.",
      "Bilder kan illustrera, förklara eller förstärka textens budskap.",
      "Bildtexter kan ge information som inte framgår av själva bilden.",
      "Färg, storlek, placering och layout påverkar vad läsaren uppmärksammar.",
      "Text och bild kan komplettera varandra eller förmedla olika perspektiv.",
      "Läsaren behöver tolka delarna tillsammans för att förstå helheten.",
    ],
    strategy:
      "Undersök både orden och det visuella. Fråga dig vad bilden tillför och hur layouten påverkar budskapet.",
    example:
      "En affisch kombinerar en stor rubrik, en bild på en överfull strand och information om hur plast påverkar havet.",
  },
];

interface TextTypesCardsProps {
  cards?: TextTypeCardItem[];
}

export default function TextTypesCards({
  cards = DEFAULT_CARDS,
}: TextTypesCardsProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                className="relative min-h-[500px] [perspective:1000px]"
              >
                <div
                  className={`relative min-h-[500px] h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  {/* Framsida */}
                  <div
                    className="absolute inset-0 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col [backface-visibility:hidden]"
                  >
                    <div className="h-56 p-5 bg-white flex items-center justify-center">
                      <img
                        src={card.imgSrc}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
                        {card.emoji} {card.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-600 mb-6">
                        {card.coreMessage}
                      </p>

                      <button
                        type="button"
                        onClick={() => toggleCard(card.id)}
                        aria-expanded={isFlipped}
                        className="mt-auto w-full rounded-xl bg-slate-300 hover:bg-slate-400 text-black font-bold px-4 py-3 transition-colors"
                      >
                        Utforska texttypen ↻
                      </button>
                    </div>
                  </div>

                  {/* Baksida */}
                  <div
                    className="absolute inset-0 rounded-3xl border-2 border-slate-200 bg-white shadow-lg overflow-y-auto p-5 sm:p-6 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {card.emoji} {card.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-600">
                        Typiska drag
                      </span>
                    </div>

                    <ul className="space-y-3 mb-5 text-sm text-slate-700">
                      {card.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-slate-500 font-bold">
                            ✓
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => toggleCard(card.id)}
                      aria-expanded={isFlipped}
                      className="mt-auto w-full rounded-xl border border-slate-300 bg-slate-300 hover:bg-slate-400 text-black font-bold px-4 py-3 transition-colors"
                    >
                      ↶ Tillbaka
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}