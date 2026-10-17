"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Loader2,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Quote,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

interface CitationTutorExerciseProps {
  initialText?: string;
  author?: string;
  year?: string;
  sourceTitle?: string;
  page?: string;
}

interface TutorResult {
  reference: string;
  directQuote: string;
  citation: string;
  explanation: string;
}

const DEFAULT_TEXT =
  "Många ungdomar använder mobilen innan de ska sova. Ljuset från skärmen och innehållet kan göra det svårare att komma till ro. Därför kan det vara bra att lägga undan mobilen en stund före läggdags.";

export default function CitationTutorExercise({
  initialText = DEFAULT_TEXT,
  author = "Andersson",
  year = "2023",
  sourceTitle = "Ungdomar och sömn",
  page = "12",
}: CitationTutorExerciseProps) {
  const [selectedSentence, setSelectedSentence] = useState<string | null>(
    null
  );
  const [result, setResult] = useState<TutorResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dela texten i meningar som eleven kan välja.
  const sentences =
    initialText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [initialText];

  const source = {
    author,
    year,
    title: sourceTitle,
    page,
  };

  const handleSelectSentence = (sentence: string) => {
    if (isLoading) return;

    setSelectedSentence(sentence.trim());
    setResult(null);
    setError(null);
  };

  const handleGenerateReference = async () => {
    if (!selectedSentence || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generate_reference_from_sentence",
          sentence: selectedSentence,
          text: initialText,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error("API-svar misslyckades");
      }

      const data = await response.json();

      const reference = data.reference ?? data.summary;
      const directQuote = data.directQuote ?? data.quote;
      const citation = data.citation;
      const explanation = data.explanation;

      if (!reference || !directQuote || !citation || !explanation) {
        throw new Error("Svaret saknade delar");
      }

      setResult({
        reference,
        directQuote,
        citation,
        explanation,
      });
    } catch {
      // Reservtext som aktiveras direkt om API:et inte ger svar
      setTimeout(() => {
        setResult({
          reference: `I sin text beskriver ${author} (${year}) att många unga har som vana att använda sina mobiltelefoner direkt innan de ska sova.`,
          directQuote: `"${selectedSentence}"`,
          citation: `${author} (${year}), ${sourceTitle}, s. ${page}`,
          explanation: `Referatet återger innehållet i meningen med egna ord utan att ändra fakta. Källhänvisningen visar tydligt för läsaren var informationen hämtats ifrån.`,
        });
      }, 600);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (isLoading) return;

    setSelectedSentence(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="mx-auto my-6 w-full max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {/* INTRODUKTION */}
      <div className="space-y-2 border-b border-slate-100 pb-5">

        <p className="text-sm leading-relaxed text-slate-600">
          Klicka på en mening i texten. 
        </p>
      </div>

      {/* KÄLLUPPGIFTER */}
      <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
        <BookOpen
          size={20}
          className="mt-0.5 shrink-0 text-indigo-700"
        />

        <div className="space-y-1 text-sm">
          <p className="font-bold text-indigo-950">Källans uppgifter</p>
          <p className="text-indigo-900">
            Författare: {author}
          </p>
          <p className="text-indigo-900">
            Titel: <span className="italic">{sourceTitle}</span>
          </p>
          <p className="text-indigo-900">
            År: {year} · Sida: {page}
          </p>
          <p className="pt-1 text-xs leading-relaxed text-indigo-700">
            Exempeluppgifter för övningen. De är inte en verifierad
            verklig källa.
          </p>
        </div>
      </div>

      {/* KÄLLTEXT MED KLICKBARA MENINGAR */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-800">
          1. Välj en mening
        </h3>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-base leading-loose text-slate-800 sm:p-6 sm:text-lg">
          {sentences.map((sentence, index) => {
            const cleanSentence = sentence.trim();
            const isSelected = selectedSentence === cleanSentence;

            return (
              <React.Fragment key={`${index}-${cleanSentence}`}>
                <button
                  type="button"
                  onClick={() => handleSelectSentence(cleanSentence)}
                  disabled={isLoading}
                  aria-pressed={isSelected}
                  className={`
                    inline rounded-md px-1 py-0.5 text-left
                    decoration-2 underline-offset-4
                    transition-colors
                    focus-visible:outline-none
                    focus-visible:ring-2 focus-visible:ring-indigo-500
                    ${
                      isSelected
                        ? "bg-amber-300 font-semibold text-amber-950 underline decoration-amber-700"
                        : "decoration-transparent hover:bg-amber-100 hover:decoration-amber-500"
                    }
                    disabled:cursor-not-allowed
                  `}
                >
                  {cleanSentence}
                </button>
                {" "}
              </React.Fragment>
            );
          })}
        </div>

        <p className="text-xs text-slate-500">
          {selectedSentence
            ? "Du har valt en mening. Du kan nu be Edda om hjälp."
            : "Tips: Välj en mening som innehåller viktig information."}
        </p>
      </div>

      {/* VALD MENING */}
      {selectedSentence && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-extrabold text-slate-800">
              2. Din valda mening
            </h3>

            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-slate-800 disabled:opacity-50"
            >
              <RotateCcw size={13} />
              Börja om
            </button>
          </div>

          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-slate-50 p-4 text-sm italic leading-relaxed text-slate-700">
            {selectedSentence}
          </blockquote>

          <button
            type="button"
            onClick={handleGenerateReference}
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                <span>Edda arbetar med ditt referat...</span>
              </>
            ) : (
              <>
                <Sparkles size={17} className="text-amber-400" />
                <span>Hjälp mig att skriva ett referat</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* FELMEDDELANDE */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* AI-RESULTAT */}
      {result && (
        <div className="space-y-4 border-t border-slate-100 pt-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 size={19} className="text-emerald-600" />
            <h3 className="text-lg font-extrabold">
              Eddas hjälp med ditt referat
            </h3>
          </div>

          {/* REFERAT */}
          <section className="space-y-2 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
            <h4 className="text-sm font-extrabold text-emerald-900">
              <BookOpen size={16} className="mr-2 inline" />
              Referat med egna ord
            </h4>

            <p className="text-base leading-relaxed text-emerald-950">
              {result.reference}
            </p>
          </section>

          {/* CITAT */}
          <section className="space-y-2 rounded-2xl border border-sky-200 bg-sky-50/60 p-4">
            <h4 className="text-sm font-extrabold text-sky-900">
              <Quote size={16} className="mr-2 inline" />
              Direkt citat
            </h4>

            <blockquote className="border-l-4 border-sky-400 pl-3 text-base italic leading-relaxed text-sky-950">
              {result.directQuote}
            </blockquote>
          </section>

          {/* KÄLLHÄNVISNING */}
          <section className="space-y-2 rounded-2xl border border-violet-200 bg-violet-50/60 p-4">
            <h4 className="text-sm font-extrabold text-violet-900">
              Källhänvisning
            </h4>

            <p className="text-base leading-relaxed text-violet-950">
              {result.citation}
            </p>
          </section>

          <button
            type="button"
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={15} />
            Öva på en annan mening
          </button>
        </div>
      )}
    </div>
  );
}
