"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, RotateCcw, CheckCircle2 } from "lucide-react";
import ClickableText from "../dictionary/ClickableText";

interface TimedTextMemoryProps {
  initialText?: string;
  maxWords?: number;
}

const DEFAULT_TEXT = `Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.`;

export default function TimedTextMemory({
  initialText = DEFAULT_TEXT,
  maxWords = 3,
}: TimedTextMemoryProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hantera klick på ord i texten
  const handleWordClick = (clickedWord: string) => {
    // Rensa bort skiljetecken så vi får ett rent ord
    const cleanWord = clickedWord.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    if (!cleanWord) return;

    // Om ordet redan är valt, ta bort det
    if (selectedWords.includes(cleanWord)) {
      setSelectedWords((prev) => prev.filter((w) => w !== cleanWord));
      setAiSummary(null);
      return;
    }

    // Max antal valda ord (t.ex. 3)
    if (selectedWords.length >= maxWords) {
      return;
    }

    setSelectedWords((prev) => [...prev, cleanWord]);
    setAiSummary(null);
  };

  const handleRemoveWord = (wordToRemove: string) => {
    setSelectedWords((prev) => prev.filter((w) => w !== wordToRemove));
    setAiSummary(null);
  };

  const handleGenerateSummary = async () => {
    if (selectedWords.length === 0 || isLoading) return;

    setIsLoading(true);
    setAiSummary(null);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_summary_from_keywords",
          keywords: selectedWords,
          text: initialText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiSummary(data.summary || data.text || data.message);
      } else {
        throw new Error("Fallback till lokalt AI-svar");
      }
    } catch {
      // Fallback om AI-endpointen inte ger respons
      setTimeout(() => {
        const keywordsStr = selectedWords.join(", ");
        setAiSummary(
          `Med stödorden "${keywordsStr}" kan vi sammanfatta det så här: Linn förberedde sig noga inför sin tävling och lyckades sänka sitt personliga rekord.`
        );
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedWords([]);
    setAiSummary(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1 text-left border-b border-slate-100 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-1">
          Välj stödord ur texten
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Klicka på tre viktiga ord i texten nedan. Edda hjälper dig sedan att skapa en sammanfattande mening utifrån dina ord!
        </p>
      </div>

      {/* Lästext med klickbara ord */}
      <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-200/60 leading-relaxed text-base sm:text-lg text-slate-800 text-left font-serif">
        <ClickableText text={initialText} onWordClick={handleWordClick} />
      </div>

      {/* Valda stödord & knappar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Dina stödord ({selectedWords.length}/{maxWords}):
            </span>
          </div>

          {selectedWords.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw size={12} />
              Rensa val
            </button>
          )}
        </div>

        {/* Baddges för valda ord */}
        <div className="flex flex-wrap gap-2 min-h-[42px] p-2 bg-slate-50 border border-slate-200 rounded-xl items-center">
          {selectedWords.length === 0 ? (
            <span className="text-xs text-slate-400 italic px-2">
              Klicka på ord i texten ovan...
            </span>
          ) : (
            selectedWords.map((word, idx) => (
              <span
                key={idx}
                onClick={() => handleRemoveWord(word)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 text-amber-950 font-bold rounded-lg text-sm shadow-xs cursor-pointer hover:bg-amber-300 transition-colors"
                title="Klicka för att ta bort"
              >
                <span>{word}</span>
                <span className="text-amber-700 text-xs">✕</span>
              </span>
            ))
          )}
        </div>

        {/* Generera sammanfattning knapp */}
        <button
          type="button"
          onClick={handleGenerateSummary}
          disabled={selectedWords.length === 0 || isLoading}
          className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Edda skapar din sammanfattning...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} className="text-amber-400" />
              <span>Skapa sammanfattning med Edda</span>
            </>
          )}
        </button>
      </div>

      {/* AI-Genererad sammanfattning */}
      {aiSummary && (
        <div className="p-5 rounded-2xl bg-white border border-emerald-200 text-left space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Eddas sammanfattning utifrån dina ord:</span>
          </div>
          <p className="text-base text-emerald-950 leading-relaxed font-medium pl-6">
            "{aiSummary}"
          </p>
        </div>
      )}
    </div>
  );
}