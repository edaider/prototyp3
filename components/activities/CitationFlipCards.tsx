
"use client";

import React, { useState } from "react";

export interface CitationStepItem {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  exampleTitle: string;
  example: string;
  tip: string;
}

interface CitationFlipCardsProps {
  steps?: CitationStepItem[];
}

const DEFAULT_STEPS: CitationStepItem[] = [
  {
    id: 1,
    stepNumber: "Steg 1",
    title: "Hitta viktig information",
    description:
      "Läs en bok, artikel eller webbplats. Välj ut det viktigaste som hjälper dig att besvara din fråga.",
    exampleTitle: "Exempel",
    example:
      "Du väljer ut den information som är viktigast för ditt ämne.",
    tip:
      "Anteckna författare, titel, årtal och sida eller webbadress. Välj det viktigaste och undvik onödiga detaljer.",
  },
  {
    id: 2,
    stepNumber: "Steg 2",
    title: "Skriv ett referat",
    description:
      "Återberätta det viktigaste med egna ord. Använd referatmarkörer och skriv sakligt utan att blanda in egna åsikter.",
    exampleTitle: "Referat eller citat?",
    example:
      'REFERAT MED EGNA ORD:\nAndersson (2024) beskriver att läsning kan bidra till att utveckla ordförrådet.\n\nDIREKT CITAT:\nAndersson (2024, s. 15) skriver: "Läsning utvecklar ordförrådet."\n\nReferatet återger innehållet med egna ord. Citatet återger originalets exakta ord.',
    tip:
      'Använd referatmarkörer som "enligt författaren", "Andersson beskriver" eller "artikeln tar upp". Behåll källans betydelse och skriv inte av originaltexten.',
  },
  {
    id: 3,
    stepNumber: "Steg 3",
    title: "Ange källan",
    description:
      "Visa varifrån informationen kommer. Skriv en källhänvisning i anslutning till referatet eller citatet.",
    exampleTitle: "Exempel på källhänvisning",
    example:
      'REFERAT:\nEnligt Andersson (2024, s. 15) kan läsning bidra till att utveckla ordförrådet.\n\nCITAT:\nAndersson (2024, s. 15) skriver: "Läsning utvecklar ordförrådet."\n\nKÄLLFÖRTECKNING:\nAndersson, Anna (2024). Läsning och språk. Stockholm: Exempelförlag.',
    tip:
      "Ange författare, årtal och sida när uppgifterna finns och referenssystemet kräver det. Använd citattecken vid ordagranna citat. Se till att källan går att hitta.",
  },
  {
    id: 4,
    stepNumber: "Steg 4",
    title: "Kontrollera referatet",
    description:
      "Läs igenom texten. Kontrollera att innehållet är korrekt, att texten har en röd tråd och att källorna är tydliga.",
    exampleTitle: "Checklista",
    example:
      "✓ Har jag valt ut det viktigaste?\n\n✓ Har jag skrivit med egna ord?\n\n✓ Har jag använt referatmarkörer?\n\n✓ Har jag hållit mig till källans innehåll och skrivit sakligt?\n\n✓ Har jag angett källan?\n\n✓ Har jag markerat direkta citat med citattecken?\n\n✓ Finns källorna i min källförteckning?",
    tip:
      "En läsare ska förstå vad källan säger och kunna hitta den. Kom ihåg att ett referat ska vara sammanhängande, sakligt och betydligt kortare än originaltexten.",
  },
];

export default function CitationFlipCards({
  steps = DEFAULT_STEPS,
}: CitationFlipCardsProps) {
  const [flippedCards, setFlippedCards] = useState<
    Record<number, boolean>
  >({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const icons = ["🔎", "✍️", "📚", "✓"];

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      {/* RUBRIK */}
      <div className="mb-6 text-center">

        <p className="mt-2 text-slate-600">
          Följ de fyra stegen. Klicka på ett kort för att se exempel och tips.
        </p>
      </div>

      {/* FYRA VÄNDBARA KORT */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {steps.map((step) => {
          const isFlipped = !!flippedCards[step.id];

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => toggleFlip(step.id)}
              aria-pressed={isFlipped}
              aria-label={`${step.stepNumber}: ${step.title}. ${
                isFlipped ? "Visa instruktionen" : "Visa exempel"
              }`}
              className="
                group relative h-[440px] w-full cursor-pointer
                rounded-3xl text-left
                [perspective:1000px]
                focus-visible:outline-none
                focus-visible:ring-4 focus-visible:ring-indigo-400
                sm:h-[460px]
              "
            >
              <div
                className={`
                  relative h-full w-full
                  transition-transform duration-700
                  [transform-style:preserve-3d]
                  motion-reduce:transition-none
                  ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                `}
              >
                {/* FRAMSIDA */}
                <div
                  className="
                    absolute inset-0 flex flex-col justify-between
                    overflow-hidden rounded-3xl border-4
                    border-black
                    bg-gradient-to-br from-white
                    via-slate-100 to-slate-200
                    p-5 text-black shadow-xl
                    transition-colors group-hover:border-slate-500
                    [backface-visibility:hidden]
                  "
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="
                        rounded-full bg-white/20 px-3 py-1
                        text-xs font-black uppercase tracking-wider
                      "
                    >
                      {step.stepNumber}
                    </span>

                    <span className="text-xs font-semibold text-black">
                      Klicka för exempel ↻
                    </span>
                  </div>

                  <div className="my-auto rounded-2xl border border-white/20 bg-white/15 p-5 text-center">
                    <div className="mb-3 text-4xl" aria-hidden="true">
                      {icons[step.id - 1] ?? "📖"}
                    </div>

                    <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-800">
                      {step.stepNumber}
                    </p>

                    <h3 className="mb-4 text-2xl font-black leading-tight sm:text-3xl">
                      {step.title}
                    </h3>

                    <p className="text-base font-medium leading-relaxed text-black sm:text-lg">
                      {step.description}
                    </p>
                  </div>

                  <p className="text-center text-xs font-semibold text-black">
                    Visa exempel och tips ↻
                  </p>
                </div>

                {/* BAKSIDA */}
                <div
                  className="
                    absolute inset-0 flex flex-col
                    overflow-hidden rounded-3xl border-2
                    border-slate-200 bg-white p-5
                    text-slate-800 shadow-lg
                    [backface-visibility:hidden]
                    [transform:rotateY(180deg)]
                  "
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-black">
                      {step.stepNumber} · Exempel
                    </span>

                    <span className="text-xs font-semibold text-slate-500">
                      Vänd tillbaka ↻
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-black text-slate-800">
                    {step.exampleTitle}
                  </h3>

                  <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-800 sm:text-base">
                      {step.example}
                    </p>
                  </div>

                  <div className="mt-4 shrink-0 rounded-xl border-l-4 border-amber-400 bg-amber-50 p-3">
                    <p className="mb-1 text-xs font-black uppercase tracking-wide text-amber-900">
                      Kom ihåg!
                    </p>

                    <p className="text-sm leading-relaxed text-slate-700">
                      {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* SAMMANFATTNING */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-sm font-bold text-slate-700 sm:text-base">
          Hitta → Skriv → Hänvisa → Kontrollera
        </p>

        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Ett bra referat återger det viktigaste med egna ord, använder
          referatmarkörer, har tydliga källhänvisningar och följer en röd tråd.
        </p>
      </div>
    </div>
  );
}

