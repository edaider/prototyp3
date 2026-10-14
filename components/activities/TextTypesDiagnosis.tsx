"use client";

import React, { useState } from "react";

export interface TextTypesDiagnosisItem {
  id: string;
  title: string;
  category: string;
  text: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TextTypesDiagnosisProps {
  items?: TextTypesDiagnosisItem[];
}

const DEFAULT_ITEMS: TextTypesDiagnosisItem[] = [
  {
    id: "novell",
    title: "Det sista meddelandet",
    category: "Skönlitteratur",
    text: `Mobilen vibrerade precis när Nora skulle släcka lampan.

Ett okänt nummer lyste på skärmen. Meddelandet innehöll bara fem ord: "Jag vet vad du gjorde."

Hon satte sig upp i sängen. Utanför fönstret rörde sig en skugga över gården. Nora gick fram till fönstret och drog undan gardinen, men gården låg tom och stilla.

När hon vände sig om hade ett nytt meddelande kommit.

"Öppna inte dörren."

Det knackade tre gånger.`,
    options: [
      "Skönlitteratur",
      "Sakprosa",
      "Multimodal text",
    ],
    correctAnswer: 0,
    explanation:
      "Det här är skönlitteratur, närmare bestämt ett utdrag ur en novell. Texten gestaltar en person och en händelse och bygger upp spänning med hjälp av miljö, handling och detaljer.",
  },
  {
    id: "argumenterande",
    title: "Längre raster i skolan",
    category: "Sakprosa",
    text: `Skolor bör införa längre raster för eleverna.

För det första behöver eleverna tid att återhämta sig mellan lektionerna. En kort paus kan göra det svårt att hinna äta, röra på sig och förbereda sig inför nästa lektion.

För det andra kan längre raster ge eleverna fler möjligheter att umgås och bygga relationer. Det kan bidra till en bättre skolmiljö.

Vissa menar att längre raster tar tid från undervisningen. Men med en genomtänkt skoldag behöver återhämtning inte innebära att lärandet blir lidande.

Därför bör skolor se över sina scheman och ge eleverna mer tid för återhämtning.`,
    options: [
      "Skönlitteratur",
      "Sakprosa",
      "Multimodal text",
    ],
    correctAnswer: 1,
    explanation:
      "Det här är sakprosa i form av en argumenterande text. Skribenten driver en tydlig åsikt, presenterar argument och bemöter ett motargument för att övertyga läsaren.",
  },
  {
    id: "multimodal",
    title: "Varje droppe räknas",
    category: "Multimodal text",
    image: "/images/multimodal.png",
    text: `Föreställ dig en kampanjaffisch med en stor bild av en nästan tom vattenflaska mot en torr, sprucken mark.

Överst står rubriken:

"VARJE DROPPE RÄKNAS"

Under bilden står texten:

"Stäng av kranen när du borstar tänderna. Små förändringar gör skillnad."

Längst ner syns skolans miljögrupps logotyp.`,
    options: [
      "Skönlitteratur",
      "Sakprosa",
      "Multimodal text",
    ],
    correctAnswer: 2,
    explanation:
      "Det här är en multimodal text. Bild, rubrik, uppmaning och layout samverkar för att förmedla ett budskap. Det är samspelet mellan flera uttryckssätt som gör texten multimodal.",
  },
];

export default function TextTypesDiagnosis({
  items = DEFAULT_ITEMS,
}: TextTypesDiagnosisProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = items[currentIndex];

  if (!currentItem) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Diagnosen är klar!
        </h2>
        <p className="mt-2 text-slate-600">
          Det finns inga uppgifter att visa.
        </p>
      </div>
    );
  }

  const isSubmitted = !!submitted[currentItem.id];
  const selectedAnswer = answers[currentItem.id];
  const isCorrect = selectedAnswer === currentItem.correctAnswer;

  const correctCount = items.filter(
    (item) =>
      submitted[item.id] &&
      answers[item.id] === item.correctAnswer
  ).length;

  const completedCount = items.filter(
    (item) => submitted[item.id]
  ).length;

  const isLast = currentIndex === items.length - 1;
  const allCompleted = completedCount === items.length;

  const handleAnswer = (optionIndex: number) => {
    if (isSubmitted) return;

    setAnswers((previous) => ({
      ...previous,
      [currentItem.id]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (selectedAnswer === undefined || isSubmitted) return;

    setSubmitted((previous) => ({
      ...previous,
      [currentItem.id]: true,
    }));
  };

  const handleRestart = () => {
    setAnswers({});
    setSubmitted({});
    setCurrentIndex(0);
  };

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-indigo-700">
            Diagnos · Texttyper
          </span>
          <span className="text-sm text-slate-500">
            Uppgift {currentIndex + 1} av {items.length}
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Diagnosens framsteg"
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-valuenow={completedCount}
        >
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{
              width: `${(completedCount / items.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50 p-5 sm:p-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
            Läs och identifiera
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900">
            {currentItem.title}
          </h2>
        </div>

        {currentItem.image && (
          <div className="flex justify-center border-b border-slate-100 bg-white p-4">
            <img
              src={currentItem.image}
              alt="Illustration till textuppgiften"
              className="max-h-64 max-w-full rounded-xl object-contain"
            />
          </div>
        )}

        <div className="p-5 sm:p-7">
          <div className="mb-6 whitespace-pre-line rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-8 text-slate-700">
            {currentItem.text}
          </div>

          <h3 className="mb-4 text-lg font-extrabold text-slate-900">
            Vilken typ av text är det här?
          </h3>

          <div className="space-y-3">
            {currentItem.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption =
                index === currentItem.correctAnswer;

              let optionStyle =
                "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50";

              if (isSelected && !isSubmitted) {
                optionStyle =
                  "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100";
              }

              if (isSubmitted && isCorrectOption) {
                optionStyle =
                  "border-emerald-500 bg-emerald-50";
              } else if (isSubmitted && isSelected && !isCorrect) {
                optionStyle =
                  "border-red-400 bg-red-50";
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleAnswer(index)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left font-semibold transition-colors disabled:cursor-default ${optionStyle}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {isSelected ? "✓" : String.fromCharCode(65 + index)}
                  </span>

                  <span className="text-slate-800">{option}</span>

                  {isSubmitted && isCorrectOption && (
                    <span className="ml-auto text-sm font-bold text-emerald-700">
                      Rätt svar
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div
              role="status"
              className={`mt-5 rounded-2xl border p-4 ${
                isCorrect
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <p
                className={`mb-2 font-extrabold ${
                  isCorrect
                    ? "text-emerald-800"
                    : "text-amber-900"
                }`}
              >
                {isCorrect ? "Bra jobbat!" : "Inte riktigt den här gången."}
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                <strong>Rätt svar: {currentItem.category}.</strong>{" "}
                {currentItem.explanation}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() =>
                setCurrentIndex((index) => Math.max(0, index - 1))
              }
              disabled={currentIndex === 0}
              className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Föregående
            </button>

            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selectedAnswer === undefined}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Kontrollera svar
              </button>
            ) : !isLast ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((index) => index + 1)
                }
                className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Nästa uppgift →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Gör om diagnosen
              </button>
            )}
          </div>
        </div>
      </div>

      {allCompleted && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Diagnosen slutförd
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900">
            {correctCount} av {items.length} rätt
          </p>

          <p className="mt-2 text-slate-600">
            {correctCount === items.length
              ? "Utmärkt! Du kan skilja mellan de tre textkategorierna."
              : "Bra jobbat med att genomföra diagnosen! Läs förklaringarna och försök igen om du vill träna mer."}
          </p>
        </div>
      )}
    </div>
  );
}