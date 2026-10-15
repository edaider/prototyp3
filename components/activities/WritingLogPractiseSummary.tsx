"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  Square,
  SlidersHorizontal,
  Type,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Loader2,
} from "lucide-react";

export type Theme = "light" | "dark" | "sepia" | "high-contrast";
export type FontOption = "Inter" | "Atkinson Hyperlegible" | "Arial" | "Verdana";

export interface TwoStarsAndAWish {
  star1: string;
  star2: string;
  wish: string;
  label?: string;
}

export interface WritingLogPractiseSummaryProps {
  question?: string;
  initialText?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const DEFAULT_SUMMARY_TEXT = `Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.`;

const SENTENCE_STARTERS = [
  "Texten handlar om...",
  "Det viktigaste som händer är...",
  "Linn förbereder sig genom att...",
  "Sammanfattningsvis kan man säga att...",
];

export default function WritingLogPractiseSummary({
  question = "Skriv en kort sammanfattning av texten om Linn med dina egna ord. Kom ihåg att ta med det viktigaste och hålla det kort!",
  initialText = DEFAULT_SUMMARY_TEXT,
  imageSrc = "/images/simtavling.jpg",
  imageAlt = "Sammanfatta texten",
}: WritingLogPractiseSummaryProps) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.75);
  const [fontFamily, setFontFamily] = useState<FontOption>("Inter");
  const [theme, setTheme] = useState<Theme>("light");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [initialAnswer, setInitialAnswer] = useState<string>("");
  const [improvedAnswer, setImprovedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<TwoStarsAndAWish | null>(null);

  const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false);
  const [isSubmittingImproved, setIsSubmittingImproved] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const paragraphs = useMemo(() => {
    return initialText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [initialText]);

  const wordCount = initialAnswer.trim() ? initialAnswer.trim().split(/\s+/).length : 0;
  const minWords = 8;
  const isAnswerReady = wordCount >= minWords;

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stopSpeech = () => {
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const toggleSpeech = () => {
    if (!synthRef.current) return;

    if (!isPlaying) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(initialText);
      utterance.lang = "sv-SE";
      utterance.rate = 0.95;
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      synthRef.current.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    } else if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleGetFeedback = async () => {
    if (!isAnswerReady || isLoadingFeedback) return;

    setIsLoadingFeedback(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "summary_feedback",
          answer: initialAnswer,
          question,
          text: initialText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback({
          star1: data.star1,
          star2: data.star2,
          wish: data.wish,
          label: data.label,
        });
      } else {
        throw new Error("Använder fallback feedback.");
      }
    } catch {
      setTimeout(() => {
        setFeedback({
          star1: "Du har lyckats fånga huvudhändelsen i texten på ett bra sätt!",
          star2: "Bra att du använde egna ord och höll sammanfattningen ganska kort.",
          wish: "Se om du kan få med både Linns förberedelse/nervositet och att hon slog sitt personliga rekord.",
          label: "Sammanfattning med egna ord",
        });
      }, 700);
    } finally {
      setIsLoadingFeedback(false);
      setImprovedAnswer(initialAnswer);
    }
  };

  const handleFinalSubmit = () => {
    if (!improvedAnswer.trim() || isSubmittingImproved) return;

    setIsSubmittingImproved(true);
    setTimeout(() => {
      setIsSubmittingImproved(false);
      setIsCompleted(true);
    }, 400);
  };

  const insertStarter = (starterText: string) => {
    setImprovedAnswer((prev) => (prev ? `${prev} ${starterText}` : starterText));
  };

  const themeStyles = useMemo(() => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-slate-950 text-slate-100",
          header: "bg-slate-950/90 border-slate-800 text-slate-100",
          panel: "bg-slate-900 border-slate-800 text-slate-100",
          inputBg: "bg-slate-900 border-slate-800 text-slate-100 focus:border-slate-400",
          quoteBg: "bg-slate-900/60 border-slate-800 text-slate-300",
          starCard: "bg-amber-950/20 border-amber-500/30 text-amber-200",
          wishCard: "bg-sky-950/20 border-sky-500/30 text-sky-200",
        };
      case "sepia":
        return {
          bg: "bg-[#f7f1e3] text-[#2c2c2c]",
          header: "bg-[#f7f1e3]/90 border-amber-200/60 text-[#2c2c2c]",
          panel: "bg-[#fbf7ee] border-amber-200 text-[#2c2c2c]",
          inputBg: "bg-[#fffdf8] border-amber-300/70 text-[#2c2c2c] focus:border-amber-600",
          quoteBg: "bg-[#f0e7d5] border-amber-300/50 text-[#3d3830]",
          starCard: "bg-amber-100/60 border-amber-300 text-amber-950",
          wishCard: "bg-amber-50 border-amber-300 text-amber-900",
        };
      case "high-contrast":
        return {
          bg: "bg-black text-yellow-300",
          header: "bg-black border-b border-yellow-300 text-yellow-300",
          panel: "bg-black border-2 border-yellow-300 text-yellow-300",
          inputBg: "bg-black border-2 border-yellow-300 text-yellow-300 focus:border-white",
          quoteBg: "bg-black border border-yellow-300 text-yellow-200",
          starCard: "bg-black border-2 border-yellow-300 text-yellow-300",
          wishCard: "bg-black border-2 border-yellow-300 text-yellow-300",
        };
      case "light":
      default:
        return {
          bg: "bg-white text-slate-800",
          header: "bg-white/95 border-slate-200/80 text-slate-800",
          panel: "bg-slate-50 border-slate-200 text-slate-800",
          inputBg: "bg-white border-slate-200 text-slate-800 focus:border-slate-800",
          quoteBg: "bg-slate-50 border-slate-200 text-slate-600",
          starCard: "bg-amber-50/70 border-amber-200 text-amber-900",
          wishCard: "bg-sky-50/70 border-sky-200 text-sky-900",
        };
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${themeStyles.bg} flex flex-col items-center select-text font-sans transition-colors duration-200`}>
      {/* Centrerad bildrida högst upp */}
      <div className="w-full max-w-3xl px-6 pt-6 pb-2 flex justify-center items-center">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-48 w-auto object-contain"
          />
        </div>
      </div>

      <header className={`w-full sticky top-0 z-30 ${themeStyles.header} backdrop-blur-md transition-colors`}>
        <div className="max-w-3xl mx-auto px-6 py-2.5 flex items-center justify-between gap-3 border-b border-slate-100/80">
          <div className="flex items-center gap-1.5 p-1 rounded-xl">
            <button
              type="button"
              onClick={toggleSpeech}
              className="px-3.5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
            >
              {isPlaying && !isPaused ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying && !isPaused ? "Pausa" : isPaused ? "Fortsätt" : "Läs texten"}</span>
            </button>

            {isPlaying && (
              <button
                type="button"
                onClick={stopSpeech}
                title="Stoppa uppläsning"
                className="px-2 py-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-xs transition cursor-pointer"
              >
                <Square size={13} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <SlidersHorizontal size={14} />
            <span>Anpassa text</span>
          </button>
        </div>

        {showSettings && (
          <div className={`border-t ${themeStyles.panel} px-6 py-4 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs`}>
            <div className="space-y-2">
              <div className="font-semibold flex items-center gap-1.5 opacity-70">
                <Type size={13} />
                <span>Typsnitt & Storlek</span>
              </div>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as FontOption)}
                className="w-full p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
              >
                <option value="Inter" className="text-black">Inter (Standard)</option>
                <option value="Atkinson Hyperlegible" className="text-black">Atkinson Hyperlegible</option>
                <option value="Arial" className="text-black">Arial</option>
                <option value="Verdana" className="text-black">Verdana</option>
              </select>
              <div className="flex justify-between items-center text-[11px] pt-1">
                <span>Textstorlek: {fontSize}px</span>
                <input
                  type="range"
                  min={15}
                  max={26}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-28 cursor-pointer accent-slate-900 dark:accent-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-semibold flex items-center gap-1.5 opacity-70">
                <BookOpen size={13} />
                <span>Radavstånd</span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-2">
                <span>Avstånd: {lineHeight}</span>
                <input
                  type="range"
                  min={1.4}
                  max={2.3}
                  step={0.1}
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  className="w-28 cursor-pointer accent-slate-900 dark:accent-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold block opacity-70">Färgtema</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`p-1.5 rounded border text-left text-xs ${theme === "light" ? "ring-2 ring-slate-800 font-semibold" : ""}`}
                >
                  <Sun size={12} className="inline mr-1" /> Ljust
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded border text-left text-xs ${theme === "dark" ? "ring-2 ring-slate-400 font-semibold" : ""}`}
                >
                  <Moon size={12} className="inline mr-1" /> Mörkt
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("sepia")}
                  className={`p-1.5 rounded border text-left text-xs ${theme === "sepia" ? "ring-2 ring-amber-600 font-semibold" : ""}`}
                >
                  Sepia
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("high-contrast")}
                  className={`p-1.5 rounded border text-left text-xs ${theme === "high-contrast" ? "ring-2 ring-yellow-400 font-semibold" : ""}`}
                >
                  Kontrast
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="w-full max-w-3xl px-6 my-8 flex-1 flex flex-col space-y-10">
        <section className="space-y-6 pt-2">
          <article
            style={{ fontSize: `${fontSize}px`, lineHeight, fontFamily }}
            className="space-y-5 text-left font-normal transition-all text-slate-800 dark:text-slate-200"
          >
            {paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </article>
        </section>

        <section className="border-t border-slate-100 dark:border-slate-800 pt-8 space-y-3">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
            DIN UPPGIFT
          </span>
          <h2 style={{ fontFamily }} className="text-xl sm:text-2xl font-bold leading-snug text-left text-slate-900 dark:text-slate-100">
            {question}
          </h2>
        </section>

        {!feedback && !isCompleted && (
          <section className="space-y-4">
            <textarea
              rows={6}
              value={initialAnswer}
              onChange={(e) => setInitialAnswer(e.target.value)}
              placeholder="Skriv din sammanfattning här..."
              style={{ fontFamily, fontSize: `${Math.max(16, fontSize)}px` }}
              className={`w-full p-4 rounded-2xl border outline-none transition-all resize-none shadow-2xs ${themeStyles.inputBg}`}
            />

            <div className="flex items-center justify-between text-xs opacity-60">
              <span>
                {wordCount} ord {wordCount < minWords && `(skriv minst ${minWords} ord för feedback)`}
              </span>
              {isAnswerReady && (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Redo för AI-feedback
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleGetFeedback}
              disabled={!isAnswerReady || isLoadingFeedback}
              className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoadingFeedback ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>AI-tutorn granskar din sammanfattning...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Få AI-feedback på sammanfattningen</span>
                </>
              )}
            </button>
          </section>
        )}

        {feedback && !isCompleted && (
          <section className="space-y-8 animate-fadeIn">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold opacity-60">
                  AI-tutor feedback
                </span>
                {feedback.label && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {feedback.label}
                  </span>
                )}
              </div>

              <div className={`p-4 rounded-2xl border space-y-2.5 ${themeStyles.starCard}`}>
                <div className="flex items-start gap-2.5 text-sm">
                  <span className="text-base select-none">⭐</span>
                  <p className="leading-relaxed font-medium">{feedback.star1}</p>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <span className="text-base select-none">⭐</span>
                  <p className="leading-relaxed font-medium">{feedback.star2}</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-start gap-2.5 ${themeStyles.wishCard}`}>
                <span className="text-base select-none">🎯</span>
                <div className="text-sm">
                  <span className="font-semibold block mb-0.5">Önskan för att förbättra sammanfattningen:</span>
                  <p className="leading-relaxed font-medium">{feedback.wish}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <h3 className="font-semibold text-base">Förbättra din sammanfattning</h3>
                <p className="text-xs opacity-70">
                  Använd önskemålet (🎯) för att skriva en ännu bättre sammanfattning.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {SENTENCE_STARTERS.map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => insertStarter(starter)}
                    className="text-xs px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer font-medium"
                  >
                    + "{starter}"
                  </button>
                ))}
              </div>

              <textarea
                rows={7}
                value={improvedAnswer}
                onChange={(e) => setImprovedAnswer(e.target.value)}
                placeholder="Skriv din förbättrade sammanfattning här..."
                style={{ fontFamily, fontSize: `${Math.max(16, fontSize)}px` }}
                className={`w-full p-4 rounded-2xl border outline-none transition-all resize-none shadow-2xs ${themeStyles.inputBg}`}
              />

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>Börja om</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!improvedAnswer.trim() || isSubmittingImproved}
                  className="flex-1 w-full py-3.5 px-6 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-40 cursor-pointer"
                >
                  {isSubmittingImproved ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sparar din sammanfattning...</span>
                    </>
                  ) : (
                    <>
                      <span>Lämna in förbättrad sammanfattning</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {isCompleted && (
          <section className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Grym sammanfattning!</h3>
              <p className="text-sm opacity-70 max-w-md mx-auto">
                Du har visat att du kan plocka ut det viktigaste och återge med egna ord.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border text-left max-w-xl mx-auto space-y-2 ${themeStyles.quoteBg}`}>
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-60">Din slutgiltiga sammanfattning:</span>
              <p className="text-sm leading-relaxed">{improvedAnswer}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}