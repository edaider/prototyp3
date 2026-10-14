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

export type FigureKey = "detektiven" | "pusslaren" | "journalisten" | "analytikern";
export type Theme = "light" | "dark" | "sepia" | "high-contrast";
export type FontOption = "Inter" | "Atkinson Hyperlegible" | "Arial" | "Verdana";

export interface FigureInfo {
  id: FigureKey;
  title: string;
  subtitle: string;
  imgSrc: string;
  questionPrompt: string;
  coreMessage: string;
}

export interface TwoStarsAndAWish {
  star1: string;
  star2: string;
  wish: string;
  label?: string;
}

export interface WritingLogPractiseProps {
  activeFigureKey?: FigureKey;
  question?: string;
  initialText?: string;
}

const DEFAULT_TEXT = `Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade. I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder.`;

const FIGURES: Record<FigureKey, FigureInfo> = {
  detektiven: {
    id: "detektiven",
    title: "Detektiven",
    subtitle: "Hitta (Läsa på raderna)",
    imgSrc: "/images/detektiven.png",
    questionPrompt: "Vad står det direkt i texten?",
    coreMessage: "Jag hittar information och detaljer i texten.",
  },
  pusslaren: {
    id: "pusslaren",
    title: "Pusslaren",
    subtitle: "Förstå (Läsa mellan raderna)",
    imgSrc: "/images/pusslaren.png",
    questionPrompt: "Vad kan jag förstå genom att lägga ihop ledtrådar?",
    coreMessage: "Jag använder textens ledtrådar för att dra slutsatser.",
  },
  journalisten: {
    id: "journalisten",
    title: "Journalisten",
    subtitle: "Undersöka (Källkritik & syfte)",
    imgSrc: "/images/journalisten.png",
    questionPrompt: "Vem säger vad och i vilket syfte?",
    coreMessage: "Jag undersöker sammanhanget och granskar texten.",
  },
  analytikern: {
    id: "analytikern",
    title: "Analytikern",
    subtitle: "Tänka vidare (Egna slutsatser & belägg)",
    imgSrc: "/images/analytikern.png",
    questionPrompt: "Vad betyder det – och hur bevisar jag det?",
    coreMessage: "Jag bygger en egen tolkning med stöd från texten.",
  },
};

const SENTENCE_STARTERS = [
  "Det märks eftersom...",
  "I texten står det att...",
  "Detta betyder att...",
  "Ett exempel från texten är...",
];

export default function WritingLogPractise({
  activeFigureKey = "pusslaren",
  question = "Varför äter Linn troligen ingen frukost och sitter ensam i omklädningsrummet? Resonera och använd exempel från texten.",
  initialText = DEFAULT_TEXT,
}: WritingLogPractiseProps) {
  // Typography & Layout state
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.75);
  const [fontFamily, setFontFamily] = useState<FontOption>("Inter");
  const [theme, setTheme] = useState<Theme>("light");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Figure
  const figure = FIGURES[activeFigureKey] || FIGURES.pusslaren;

  // Student answers
  const [initialAnswer, setInitialAnswer] = useState<string>("");
  const [improvedAnswer, setImprovedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<TwoStarsAndAWish | null>(null);

  // Loading & submission state
  const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false);
  const [isSubmittingImproved, setIsSubmittingImproved] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Speech synthesis state
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
    if (synthRef.current) {
      synthRef.current.cancel();
    }
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
          action: "writing_feedback",
          answer: initialAnswer,
          question,
          figure: figure.title,
          strategy: figure.subtitle,
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
        const hasQuote =
          initialAnswer.includes('"') ||
          initialAnswer.toLowerCase().includes("texten") ||
          initialAnswer.toLowerCase().includes("står");

        setFeedback({
          star1: "Du har en bra och tydlig grundtanke som svarar direkt på frågan.",
          star2: hasQuote
            ? "Fint att du kopplar dina tankar till vad som händer i texten!"
            : "Dina egna ord visar att du har förstått situationen.",
          wish: hasQuote
            ? "Utveckla gärna med ett ord till om vad Linns beteende visar om hennes känslor."
            : "Ge ett konkret exempel från texten (till exempel vad hon gör i omklädningsrummet) som bevisar din tanke.",
          label: "Utvecklat resonemang",
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
          card: "bg-slate-900/50 border-slate-800",
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
          card: "bg-[#fffdf8] border-amber-200",
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
          card: "bg-black border-2 border-yellow-300",
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
          card: "bg-white border-slate-200/80",
          starCard: "bg-amber-50/70 border-amber-200 text-amber-900",
          wishCard: "bg-sky-50/70 border-sky-200 text-sky-900",
        };
    }
  }, [theme]);

  return (
    <div className={`min-h-screen ${themeStyles.bg} flex flex-col items-center select-text font-sans transition-colors duration-200`}>
      {/* Header controls */}
      <header className={`w-full sticky top-0 z-30 ${themeStyles.header} backdrop-blur-md border-b transition-colors shadow-2xs`}>
        <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-black/5 dark:bg-white/5">
            <button
              type="button"
              onClick={toggleSpeech}
              className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
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
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>Anpassa text</span>
          </button>
        </div>

        {showSettings && (
          <div className={`border-t ${themeStyles.panel} px-4 py-4 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs`}>
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

      {/* Main Canvas */}
      <main className="w-full max-w-3xl px-6 my-10 flex-1 flex flex-col space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
              <img src={figure.imgSrc} alt={figure.title} className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-70 block">
                {figure.title} · {figure.subtitle}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
                "{figure.questionPrompt}"
              </p>
            </div>
          </div>

          <article
            style={{
              fontSize: `${fontSize}px`,
              lineHeight,
              fontFamily,
            }}
            className="space-y-5 text-left font-normal transition-all"
          >
            {paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </article>
        </section>

        <section className="border-t border-slate-200/60 dark:border-slate-800 pt-8 space-y-3">
          <span className="text-xs uppercase tracking-wider font-semibold opacity-60 block">
            Din uppgift
          </span>
          <h2 style={{ fontFamily }} className="text-xl sm:text-2xl font-bold leading-snug text-left">
            {question}
          </h2>
        </section>

        {!feedback && !isCompleted && (
          <section className="space-y-4">
            <label className="block text-sm font-medium opacity-80">
              Skriv ditt resonemang här:
            </label>

            <textarea
              rows={6}
              value={initialAnswer}
              onChange={(e) => setInitialAnswer(e.target.value)}
              placeholder="Jag tänker att..."
              style={{ fontFamily, fontSize: `${Math.max(16, fontSize - 1)}px` }}
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
                  <span>Läser ditt svar...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Ge feedback</span>
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
                  Lärarens feedback
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
                  <span className="font-semibold block mb-0.5">Önskan för att utveckla svaret:</span>
                  <p className="leading-relaxed font-medium">{feedback.wish}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <h3 className="font-semibold text-base">Skriv om och utveckla ditt svar</h3>
                <p className="text-xs opacity-70">
                  Utgå från din önskan (🎯) ovan. Du kan använda stödmeningarna om du vill.
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
                placeholder="Skriv din förbättrade text här..."
                style={{ fontFamily, fontSize: `${Math.max(16, fontSize - 1)}px` }}
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
                      <span>Sparar ditt svar...</span>
                    </>
                  ) : (
                    <>
                      <span>Lämna in förbättrat svar</span>
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
              <h3 className="text-xl font-bold">Bra jobbat!</h3>
              <p className="text-sm opacity-70 max-w-md mx-auto">
                Du tog till dig önskemålet och utvecklade ditt resonemang. Texten är nu sparad.
              </p>
            </div>

            <div className={`p-5 rounded-2xl border text-left max-w-xl mx-auto space-y-2 ${themeStyles.quoteBg}`}>
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-60">Ditt slutgiltiga svar:</span>
              <p className="text-sm leading-relaxed">{improvedAnswer}</p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsCompleted(false);
                  setFeedback(null);
                  setInitialAnswer("");
                  setImprovedAnswer("");
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
              >
                Gör en ny övning
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}