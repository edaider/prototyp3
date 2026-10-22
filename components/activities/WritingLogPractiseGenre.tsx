"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  Square,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  Loader2,
  CheckSquare,
  Volume2,
  VolumeX,
  Check,
  Zap,
  Edit3,
  Send,
} from "lucide-react";

export type Theme = "light" | "dark" | "sepia" | "high-contrast";
export type FontOption = "Inter" | "Atkinson Hyperlegible" | "Arial" | "Verdana";

export interface WritingPageProps {
  question?: string;
  imageSrc?: string;
  imageAlt?: string;
  studentInterest?: string;
}

const ARGUMENTATIVE_TEXT_LEVELS = {
  easy: {
    text: "Det dricks mycket energidryck i skolan. Många unga dricker det för att bli pigga. Men lärare och läkare säger att man kan få ont i huvudet, svårt att sova och få snabb pulskänning. Vissa skolor förbjuder energidryck.",
  },
  standard: {
    text: "Det säljs och konsumeras allt fler energidrycker bland unga i Sverige. Många elever dricker energidryck för att orka med skoldagen, men lärare och läkare slår larm om biverkningar som hjärtklappning, koncentrationssvårigheter och sömnproblem. Vissa skolor har redan infört ett förbud mot energidrycker under skoltid, medan andra anser att det är upp till eleverna själva och deras föräldrar att bestämma.",
  },
  hard: {
    text: "Konsumtionen av energidrycker bland ungdomar har ökat markant under det senaste decenniet. Många elever använder dryckerna som ett stimulantium för att hantera en krävande skoldag. Samtidigt varnar medicinsk expertis för allvarliga biverkningar såsom kardiella besvär och sömnstörningar. Frågan om ett skol- eller lagförbud har blivit föremål för en intensiv pedagogisk och folkhälsorelaterad debatt.",
  },
};

const WRITING_STEPS = [
  {
    id: 1,
    title: "1. Tydlig tes & inledning",
    label: "Inledning & Tes",
    description: "Framgår det tydligt i inledningen vad du anser i frågan?",
    placeholder: "Skriv din inledning och din tes (åsikt) här...",
    starters: [
      "Jag anser att...",
      "Enligt min mening bör...",
      "Det är tydligt att...",
      "Jag tycker att skolan borde...",
    ],
  },
  {
    id: 2,
    title: "2. Starka argument",
    label: "Argument 1",
    description: "Har du minst ett hållbart argument som stöder din tes?",
    placeholder: "Skriv dina argument som stöder din tes här...",
    starters: [
      "För det första...",
      "Ett viktigt argument är att...",
      "Dessutom visar forskning att...",
      "En annan sak att tänka på är...",
    ],
  },
  {
    id: 3,
    title: "3. Ytterligare argument / fördjupning",
    label: "Argument 2",
    description: "Utveckla ditt resonemang med ytterligare ett stödjande argument.",
    placeholder: "Skriv nästa argument eller fördjupning här...",
    starters: [
      "För det andra...",
      "Vidare kan man se att...",
      "Ett annat starkt skäl är...",
    ],
  },
  {
    id: 4,
    title: "4. Motargument & bemötande",
    label: "Motargument",
    description: "Har du tagit upp motståndarnas synpunkt och bemött den?",
    placeholder: "Skriv ett motargument och bemöt det här...",
    starters: [
      "Vissa tycker att..., men jag menar att...",
      "Å ena sidan säger många att..., å andra sidan...",
      "Det stämmer förvisso att..., men samtidigt...",
    ],
  },
  {
    id: 5,
    title: "5. Sammanfattning",
    label: "Avslutning",
    description: "Knyter avslutningen ihop säcken och upprepar din ståndpunkt?",
    placeholder: "Skriv din avslutning och sammanfattning här...",
    starters: [
      "Sammanfattningsvis vill jag framhålla att...",
      "Slutligen anser jag att...",
      "Därför är min uppmaning att...",
    ],
  },
  {
    id: 6,
    title: "6. Signatur",
    label: "Signatur",
    description: "Skriv vem som har skrivit texten.",
    placeholder: "T.ex. Stolt skolfrised, Engagerad elev...",
    starters: ["Stolt elev", "Skribent i åk 9"],
  },
];

const CHECKLIST_ITEMS = [
  { id: 1, title: "1. Läs texten för dig själv", desc: "Läs gärna högt tyst för dig själv för att höra om meningarna flyter bra." },
  { id: 2, title: "2. Läs uppgiften/frågan igen", desc: "Har du svarat på allt? Har du med en tydlig tes och starka argument?" },
  { id: 3, title: "3. Kontrollera din styckeindelning", desc: "Har du delat upp texten med blankrader mellan inledning, argument och avslutning?" },
  { id: 4, title: "4. Kontrollera din grammatik", desc: "Stämmer ordföljden och bildar orden kompletta meningar?" },
  { id: 5, title: "5. Kontrollera din stavning", desc: "Kolla extra noga på svåra ord, stor bokstav och punkt." },
  { id: 6, title: "6. Ta bort upprepningar i texten", desc: "Använder du samma ord hela tiden? Variera med synonymer eller bindord." },
  { id: 7, title: "7. Är ditt språk anpassat?", desc: "Använder du ett sakligt och övertygande språk utan för mycket talspråk?" },
  { id: 8, title: "8. Saknas något?", desc: "Har du bemött ett motargument eller kommit ihåg en avslutande sammanfattning?" },
];

interface FeedbackAnnotation {
  stepId: number;
  type: "star" | "wish";
  title: string;
  comment: string;
}

export default function WritingPage({
  question = "Bör skolor införa ett förbud mot energidrycker under skoltid? Skriv en argumenterande text där du framför din tes och stöder den med argument.",
  imageSrc = "/energidryck.png",
  imageAlt = "Argumenterande text om energidrycker",
  studentInterest = "fotboll",
}: WritingPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<"easy" | "standard" | "hard">("standard");
  const currentTextData = ARGUMENTATIVE_TEXT_LEVELS[selectedLevel];

  // Tillgänglighet & Inställningar
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.75);
  const [fontFamily, setFontFamily] = useState<FontOption>("Inter");
  const [theme, setTheme] = useState<Theme>("light");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Steg i processen
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [draftInput, setDraftInput] = useState<string>("");
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, string>>({});
  const [stepChecked, setStepChecked] = useState<Record<number, boolean>>({});

  // Bearbetningsfas
  const [phase, setPhase] = useState<"building" | "refining" | "submitted">("building");
  const [fullTextDraft, setFullTextDraft] = useState<string>("");
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});
  const [isEditingText, setIsEditingText] = useState<boolean>(false);
  const [activeAnnotation, setActiveAnnotation] = useState<FeedbackAnnotation | null>(null);

  // TWO STARS (2 Gula på del 1 & 2) & A WISH (1 Röd på del 4)
  const stepFeedback: Record<number, FeedbackAnnotation> = {
    1: {
      stepId: 1,
      type: "star",
      title: "EDDAS BERÖM (STAR 1):",
      comment: "⭐ Bra start! Du visar tydligt i din inledning vad din text ska handla om.",
    },
    2: {
      stepId: 2,
      type: "star",
      title: "EDDAS BERÖM (STAR 2):",
      comment: "⭐ Fint argument! Du ger ett tydligt skäl till varför din åsikt stämmer.",
    },
    4: {
      stepId: 4,
      type: "wish",
      title: "EDDAS ÖNSKAN (WISH):",
      comment: "🎯 Önskan: Utveckla ditt motargument! Förklara ännu tydligare vad motståndarna tycker och varför de har fel.",
    },
  };

  // AI-stöd & Edda
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [aiTip, setAiTip] = useState<string>(
    `Hej! Jag är Edda! Låt oss bygga din text pusselbit för pusselbit. Vi börjar med inledning och tes. Tänk på vad som engagerar dig som gillar ${studentInterest}!`
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Eddas Röst
  const [eddaVoiceEnabled, setEddaVoiceEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Talsyntes för källtexten
  const [isPlayingText, setIsPlayingText] = useState<boolean>(false);
  const [isPausedText, setIsPausedText] = useState<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const paragraphs = useMemo(() => {
    return currentTextData.text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [currentTextData]);

  const currentWordCount = draftInput.trim()
    ? draftInput.trim().split(/\s+/).length
    : 0;

  const fullTextWordCount = fullTextDraft.trim()
    ? fullTextDraft.trim().split(/\s+/).length
    : 0;

  const checkedCount = Object.values(checkedChecklist).filter(Boolean).length;

  const speakEddaText = async (textToSpeak: string) => {
    if (!textToSpeak || !eddaVoiceEnabled) return;

    try {
      if (audioRef.current) audioRef.current.pause();
      setIsSpeaking(true);

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak }),
      });

      if (!response.ok) throw new Error("Kunde inte hämta röst");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => setIsSpeaking(false);

      await audio.play();
    } catch {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = "sv-SE";
        utterance.rate = 0.95;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    }
  };

  const insertStarter = (starterText: string) => {
    setDraftInput((prev) => (prev ? `${prev} ${starterText}` : starterText));
  };

  const handleSelectStep = (stepId: number) => {
    setCurrentStep(stepId);
    setDraftInput(submittedAnswers[stepId] || "");
  };

  const handleStepSubmit = async () => {
    if (!stepChecked[currentStep] || currentWordCount < 3) return;

    setIsAnalyzing(true);
    const newAnswers = { ...submittedAnswers, [currentStep]: draftInput };
    setSubmittedAnswers(newAnswers);

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "live_scaffolding",
          answer: draftInput,
          interest: studentInterest,
          question,
          step: currentStep,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const feedbackText = data.tip || data.text;
        setAiTip(feedbackText);
        if (eddaVoiceEnabled) speakEddaText(feedbackText);
      } else {
        const fallbacks: Record<number, string> = {
          1: "Snygg inledning! Nu går vi vidare till det första argumentet.",
          2: "Bra argument! Då lägger vi till ett till.",
          3: "Starkt! Nu kikar vi på motargumentet.",
          4: "Bra bemött! Dags för sammanfattning.",
          5: "Fint avslut! Avsluta med din signatur.",
        };
        const fb = fallbacks[currentStep] || "Bra jobbat!";
        setAiTip(fb);
        if (eddaVoiceEnabled) speakEddaText(fb);
      }
    } catch {
      setAiTip("Bra jobbat med detta delsteg! Nu tar vi nästa del.");
    } finally {
      setIsAnalyzing(false);
    }

    if (currentStep < 6) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setDraftInput(submittedAnswers[nextStep] || "");
    } else {
      const combinedText = Object.values(newAnswers)
        .filter(Boolean)
        .join("\n\n");
      setFullTextDraft(combinedText);
      setPhase("refining");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const toggleSpeechText = () => {
    if (!synthRef.current) return;
    if (!isPlayingText) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(currentTextData.text);
      utterance.lang = "sv-SE";
      utterance.rate = 0.95;
      utterance.onend = () => {
        setIsPlayingText(false);
        setIsPausedText(false);
      };
      synthRef.current.speak(utterance);
      setIsPlayingText(true);
      setIsPausedText(false);
    } else if (isPausedText) {
      synthRef.current.resume();
      setIsPausedText(false);
    } else {
      synthRef.current.pause();
      setIsPausedText(true);
    }
  };

  const themeStyles = useMemo(() => {
    switch (theme) {
      case "dark":
        return {
          bg: "bg-slate-950 text-slate-100",
          header: "bg-slate-950/90 border-slate-800 text-slate-100",
          panel: "bg-slate-900 border-slate-800 text-slate-100",
        };
      case "sepia":
        return {
          bg: "bg-[#f7f1e3] text-[#2c2c2c]",
          header: "bg-[#f7f1e3]/90 border-amber-200/60 text-[#2c2c2c]",
          panel: "bg-[#fbf7ee] border-amber-200 text-[#2c2c2c]",
        };
      case "high-contrast":
        return {
          bg: "bg-black text-yellow-300",
          header: "bg-black border-b border-yellow-300 text-yellow-300",
          panel: "bg-black border-2 border-yellow-300 text-yellow-300",
        };
      case "light":
      default:
        return {
          bg: "bg-white text-slate-800",
          header: "bg-white/95 border-slate-200/80 text-slate-800",
          panel: "bg-slate-50 border-slate-200 text-slate-800",
        };
    }
  }, [theme]);

  const activeStepData = WRITING_STEPS[currentStep - 1];

  return (
    <div className={`min-h-screen ${themeStyles.bg} flex flex-col items-center select-text font-sans transition-colors duration-200`}>
      <style jsx global>{`
        @keyframes subtleTilt {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.02); }
        }
        .animate-subtle-tilt {
          animation: subtleTilt 3s ease-in-out infinite;
        }
      `}</style>

      {imageSrc && (
        <div className="w-full max-w-5xl px-6 pt-6 pb-2 flex justify-center items-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl flex justify-center">
            <img src={imageSrc} alt={imageAlt} className="max-h-48 w-auto object-contain" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`w-full sticky top-0 z-30 ${themeStyles.header} backdrop-blur-md transition-colors`}>
        <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between gap-3 border-b border-slate-100/80">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleSpeechText}
              className="px-3.5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
            >
              {isPlayingText && !isPausedText ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlayingText && !isPausedText ? "Pausa" : isPausedText ? "Fortsätt" : "Läs texten"}</span>
            </button>
            {isPlayingText && (
              <button
                type="button"
                onClick={() => {
                  synthRef.current?.cancel();
                  setIsPlayingText(false);
                  setIsPausedText(false);
                }}
                className="px-2 py-1.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg text-xs transition cursor-pointer"
              >
                <Square size={13} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-black/5 dark:hover:bg-white/5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>Anpassa text & Nivå</span>
          </button>
        </div>

        {showSettings && (
          <div className={`border-t ${themeStyles.panel} px-6 py-4 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs`}>
            <div className="space-y-2">
              <span className="font-semibold block opacity-70 flex items-center gap-1">
                <Zap size={13} />
                <span>Textens svårighetsgrad</span>
              </span>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedLevel("easy")}
                  className={`p-1.5 rounded border text-left text-xs ${selectedLevel === "easy" ? "bg-amber-200 text-amber-950 font-bold" : ""}`}
                >
                  🟢 Enkel nivå
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLevel("standard")}
                  className={`p-1.5 rounded border text-left text-xs ${selectedLevel === "standard" ? "bg-amber-200 text-amber-950 font-bold" : ""}`}
                >
                  🟡 Standard (ÅK 9)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLevel("hard")}
                  className={`p-1.5 rounded border text-left text-xs ${selectedLevel === "hard" ? "bg-amber-200 text-amber-950 font-bold" : ""}`}
                >
                  🔴 Utmaning
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold block opacity-70">Typsnitt & Storlek</span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as FontOption)}
                className="w-full p-1.5 rounded border bg-transparent text-xs text-black"
              >
                <option value="Inter">Inter</option>
                <option value="Atkinson Hyperlegible">Atkinson Hyperlegible</option>
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
              </select>
              <div className="flex justify-between items-center text-[11px] pt-1">
                <span>Storlek: {fontSize}px</span>
                <input
                  type="range"
                  min={15}
                  max={26}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-28 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold block opacity-70">Färgtema</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" onClick={() => setTheme("light")} className="p-1 rounded border text-left">Ljust</button>
                <button type="button" onClick={() => setTheme("dark")} className="p-1 rounded border text-left">Mörkt</button>
                <button type="button" onClick={() => setTheme("sepia")} className="p-1 rounded border text-left">Sepia</button>
                <button type="button" onClick={() => setTheme("high-contrast")} className="p-1 rounded border text-left">Kontrast</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Huvudinnehåll */}
      <main className="w-full max-w-5xl px-6 my-8 flex-1 flex flex-col space-y-10">
        {/* Källtext */}
        <section className="space-y-6 pt-2">
          <article
            style={{ fontSize: `${fontSize}px`, lineHeight, fontFamily }}
            className="space-y-5 text-left font-normal transition-all"
          >
            {paragraphs.map((p, pIdx) => (
              <p key={pIdx}>
                {p.split(" ").map((word, wIdx) => {
                  const cleanWord = word.replace(/[^åäöÅÄÖa-zA-Z]/g, "").toLowerCase();
                  const isInteractiveWord = cleanWord === "biverkningar" || cleanWord === "konsumeras" || cleanWord === "stimulantium";

                  if (isInteractiveWord) {
                    return (
                      <span key={wIdx}>
                        <button
                          type="button"
                          onClick={() => setActivePopup(cleanWord)}
                          className="bg-amber-200/60 dark:bg-amber-900/50 px-1 rounded underline decoration-dotted cursor-pointer font-semibold hover:bg-amber-300 transition"
                        >
                          {word}
                        </button>{" "}
                      </span>
                    );
                  }
                  return word + " ";
                })}
              </p>
            ))}
          </article>

          {activePopup && (
            <div className="relative p-5 rounded-3xl bg-white border-2 border-amber-300 shadow-xl flex items-start gap-4 animate-fadeIn overflow-hidden">
              <div className="shrink-0 pt-1">
                <img src="/images/hovnarren.png" alt="Edda" className="w-16 h-16 object-contain animate-subtle-tilt" />
              </div>
              <div className="flex-1 text-xs sm:text-sm space-y-1">
                <span className="font-bold block text-base text-amber-900">
                  Edda förklarar ordet &quot;{activePopup}&quot;
                </span>
                <p className="text-stone-700 leading-relaxed">
                  {activePopup === "biverkningar"
                    ? "Oönskade effekter som kroppen reagerar med, till exempel att hjärtat slår fortare eller att du får svårt att sova."
                    : activePopup === "stimulantium"
                    ? "Något som piggar upp kroppen och gör att man känner sig mer vaken under en kort stund."
                    : "Att köpa, använda eller dricka upp något."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePopup(null)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 cursor-pointer text-stone-700 transition"
              >
                Stäng
              </button>
            </div>
          )}
        </section>

        {/* Fråga / Uppgift */}
        <section className="border-t pt-8 space-y-3">
          <span className="text-xs uppercase tracking-wider font-bold opacity-60 block">
            TRÄNA: SKRIVUPPGIFT
          </span>
          <h2 style={{ fontFamily }} className="text-xl sm:text-2xl font-bold leading-snug text-left">
            {question}
          </h2>
        </section>

        {/* --- FAS 1: STÖDSTRUKTUR / BYGGA TEXTEN DEL FÖR DEL --- */}
        {phase === "building" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* VÄNSTERKOLUMN: PUSSEL-MALL (Sidopanel) */}
            <aside className="lg:col-span-4 space-y-3 bg-stone-50 p-4 sm:p-5 rounded-3xl border border-stone-200 lg:sticky lg:top-20">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-800 flex items-center gap-1.5">
                  <Edit3 size={14} />
                  <span>Din text-mall</span>
                </span>
                <span className="text-[11px] font-semibold opacity-60">
                  {Object.keys(submittedAnswers).length} / 6
                </span>
              </div>

              <div className="space-y-2.5">
                {WRITING_STEPS.map((step) => {
                  const savedText = submittedAnswers[step.id];
                  const isCurrent = step.id === currentStep;

                  return (
                    <div
                      key={step.id}
                      onClick={() => handleSelectStep(step.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                        isCurrent
                          ? "bg-amber-100/90 border-amber-500 shadow-xs ring-2 ring-amber-400/50"
                          : savedText
                          ? "bg-white border-emerald-300 hover:border-emerald-400"
                          : "bg-white/60 border-stone-200 hover:border-stone-300 border-dashed"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                          {step.label}
                        </span>
                        {savedText ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                            <Check size={9} /> Klar
                          </span>
                        ) : isCurrent ? (
                          <span className="text-[9px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded-full">
                            Skriver nu
                          </span>
                        ) : (
                          <span className="text-[9px] text-stone-400 italic">
                            Tom
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-medium text-stone-800">
                        {savedText ? (
                          <p className="line-clamp-2">{savedText}</p>
                        ) : (
                          <p className="text-stone-400 italic text-[11px]">
                            {isCurrent ? "Skriv i rutan till höger..." : "Klicka för att skriva..."}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* HÖGERKOLUMN: EDDA OCH ARBETSGÅNG */}
            <section className="lg:col-span-8 space-y-6">
              {/* EDDA OCH PRATBUBBLA */}
              <div className="relative flex items-end gap-1 sm:gap-2 my-2">
                <div className="relative shrink-0 z-10 flex flex-col items-center translate-y-6 sm:translate-y-8">
                  <img
                    src="/images/hovnarren.png"
                    alt="Hovnarren Edda"
                    className={`w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-md transition-transform duration-500 ${
                      isSpeaking || isAnalyzing ? "animate-subtle-tilt scale-105" : "hover:scale-105"
                    }`}
                  />
                </div>

                <div className="relative flex-1 min-w-0 -ml-8 sm:-ml-10">
                  <img
                    src="/images/pratbubbla.png"
                    alt=""
                    aria-hidden="true"
                    className="block w-full h-auto pointer-events-none"
                  />

                  <div className="absolute inset-0">
                    <button
                      type="button"
                      onClick={() => {
                        const nextState = !eddaVoiceEnabled;
                        setEddaVoiceEnabled(nextState);

                        if (nextState) {
                          speakEddaText(aiTip);
                        } else {
                          if (audioRef.current) audioRef.current.pause();
                          if (typeof window !== "undefined") {
                            window.speechSynthesis.cancel();
                          }
                          setIsSpeaking(false);
                        }
                      }}
                      className="absolute top-[8%] right-[9%] z-10 p-1.5 rounded-full hover:bg-black/5 transition cursor-pointer text-stone-700"
                      title={isSpeaking ? "Pausa tal" : "Lyssna på Edda"}
                      aria-label={isSpeaking ? "Pausa tal" : "Lyssna på Edda"}
                    >
                      {eddaVoiceEnabled ? (
                        <Volume2 size={20} className={isSpeaking ? "text-amber-700 animate-pulse" : ""} />
                      ) : (
                        <VolumeX size={20} className="text-stone-400" />
                      )}
                    </button>

                    <div className="absolute left-[10%] right-[10%] top-[25%] bottom-[28%] flex items-center justify-center">
                      <p className="w-full text-center text-xs sm:text-base leading-snug font-semibold text-stone-800 [overflow-wrap:anywhere]">
                        {aiTip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aktuellt Skrivfält */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-sm text-stone-800">
                    Skriv del {currentStep} (av 6): {activeStepData.label}
                  </label>
                  <div className="text-xs opacity-60 font-mono">
                    <span>{currentWordCount} ord</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-stone-500 block">
                    💡 Behöver du hjälp att starta? Klicka på en mening nedan:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeStepData.starters.map((starter, sIdx) => (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => insertStarter(starter)}
                        className="text-xs px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-amber-50 hover:border-amber-300 text-stone-800 transition cursor-pointer font-medium shadow-2xs"
                      >
                        + &quot;{starter}&quot;
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={6}
                  value={draftInput}
                  onChange={(e) => setDraftInput(e.target.value)}
                  placeholder={activeStepData.placeholder}
                  style={{
                    fontFamily,
                    fontSize: `${Math.max(16, fontSize)}px`,
                  }}
                  className="w-full p-4 rounded-2xl border border-stone-300 bg-white text-stone-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all resize-y shadow-2xs"
                />
              </div>

              {/* Kontrollruta för steget */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <CheckSquare size={16} />
                  <h3 className="font-bold text-sm">
                    Kvalitetskontroll för {activeStepData.label}
                  </h3>
                </div>

                <div
                  onClick={() =>
                    setStepChecked({
                      ...stepChecked,
                      [currentStep]: !stepChecked[currentStep],
                    })
                  }
                  className={`p-4 rounded-2xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                    stepChecked[currentStep]
                      ? "bg-amber-100/70 border-amber-400 text-amber-950"
                      : "bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!stepChecked[currentStep]}
                    onChange={() => {}}
                    className="mt-0.5 h-4 w-4 rounded cursor-pointer accent-amber-700"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold block">
                      {activeStepData.title}
                    </span>
                    <p className="text-[11px] leading-snug opacity-80">
                      {activeStepData.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Knappen för att gå vidare */}
              <div className="pt-4 flex justify-between items-center">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => handleSelectStep(currentStep - 1)}
                    className="py-3 px-5 rounded-2xl border border-stone-300 hover:bg-stone-100 font-bold text-sm text-stone-700 transition cursor-pointer"
                  >
                    Föregående del
                  </button>
                )}
                <div className="ml-auto">
                  <button
                    type="button"
                    onClick={handleStepSubmit}
                    disabled={!stepChecked[currentStep] || currentWordCount < 3 || isAnalyzing}
                    className="py-3.5 px-6 rounded-2xl bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold text-sm flex items-center gap-2 transition active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Edda analyserar...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {currentStep < 6
                            ? "Få Eddas feedback & nästa del"
                            : "Spara och gå till bearbetning"}
                        </span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- FAS 2: BEARBETNING MED DYNAMISKA MARKERINGAR --- */}
        {phase === "refining" && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <span className="font-bold text-sm">Kom igång</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bestäm din tes (din åsikt). Tänk ut 2–3 starka argument och ett eventuellt motargument.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <span className="font-bold text-sm">Skriv ett utkast</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Börja skriva utan att stanna upp för fel. Få ner dina tankar, motiv och argument i textrutan nedan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <span className="font-bold text-sm">Bearbeta texten</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Läs igenom, förtydliga dina argument, lägg till bindord och rätta.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-bold text-base text-stone-800">
                  Din argumenterande text (klicka på de markerade delarna för Eddas feedback):
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-xs opacity-60 font-mono">
                    {fullTextWordCount} ord
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingText(!isEditingText)}
                    className="text-xs bg-amber-100 text-amber-950 font-bold px-3 py-1.5 rounded-xl border border-amber-300 hover:bg-amber-200 transition cursor-pointer"
                  >
                    {isEditingText ? "🔍 Visa feedback-markeringar" : "✏️ Redigera texten"}
                  </button>
                </div>
              </div>

              {activeAnnotation && (
                <div
                  className={`p-4 rounded-2xl border-2 shadow-sm flex items-start justify-between gap-3 animate-fadeIn ${
                    activeAnnotation.type === "star"
                      ? "bg-amber-50 border-amber-300 text-amber-950"
                      : "bg-rose-50 border-rose-300 text-rose-950"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg">
                      {activeAnnotation.type === "star" ? "⭐" : "🎯"}
                    </span>
                    <div>
                      <span
                        className={`font-bold text-xs uppercase tracking-wider block ${
                          activeAnnotation.type === "star" ? "text-amber-900" : "text-rose-900"
                        }`}
                      >
                        {activeAnnotation.title}
                      </span>
                      <p className="text-sm font-medium pt-0.5">
                        {activeAnnotation.comment}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveAnnotation(null)}
                    className="text-xs font-bold text-stone-500 hover:text-stone-800 cursor-pointer p-1"
                  >
                    ✕
                  </button>
                </div>
              )}

              {!isEditingText ? (
                <div
                  style={{ fontFamily, fontSize: `${Math.max(16, fontSize)}px`, lineHeight }}
                  className="w-full p-6 rounded-3xl border border-stone-300 bg-white text-stone-900 shadow-sm leading-relaxed min-h-[220px] whitespace-pre-wrap space-y-4"
                >
                  {WRITING_STEPS.map((step) => {
                    const textSnippet = submittedAnswers[step.id];
                    if (!textSnippet) return null;

                    const fb = stepFeedback[step.id];

                    return (
                      <p key={step.id}>
                        {fb ? (
                          <mark
                            onClick={() => setActiveAnnotation(fb)}
                            className={`cursor-pointer px-1.5 py-0.5 rounded transition font-medium border-b-2 inline ${
                              fb.type === "star"
                                ? "bg-amber-200/90 hover:bg-amber-300 border-amber-500 text-amber-950"
                                : "bg-rose-200/90 hover:bg-rose-300 border-rose-500 text-rose-950"
                            }`}
                          >
                            {textSnippet}
                            <span className="ml-1 text-xs">
                              {fb.type === "star" ? "⭐" : "🎯"}
                            </span>
                          </mark>
                        ) : (
                          textSnippet
                        )}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <textarea
                  rows={10}
                  value={fullTextDraft}
                  onChange={(e) => setFullTextDraft(e.target.value)}
                  style={{ fontFamily, fontSize: `${Math.max(16, fontSize)}px` }}
                  className="w-full p-5 rounded-3xl border border-stone-300 bg-white text-stone-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all resize-y shadow-sm leading-relaxed"
                />
              )}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare size={18} />
                  <h3 className="font-bold text-base">Kontrollera dig själv</h3>
                </div>
                <span className="text-xs font-mono font-semibold opacity-70">
                  Avklarat: {checkedCount} / {CHECKLIST_ITEMS.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHECKLIST_ITEMS.map((item) => {
                  const isChecked = !!checkedChecklist[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() =>
                        setCheckedChecklist((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className={`p-4 rounded-2xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                        isChecked
                          ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
                          : "bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 h-4 w-4 rounded cursor-pointer accent-emerald-600"
                      />
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold block">{item.title}</span>
                        <p className="text-[11px] leading-snug opacity-80">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPhase("submitted")}
                disabled={fullTextWordCount < 10}
                className="py-4 px-8 rounded-2xl bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold text-base flex items-center gap-2 transition active:scale-98 disabled:opacity-40 cursor-pointer shadow-lg"
              >
                <Send size={18} />
                <span>Lämna in för Eddas slutliga bedömning</span>
              </button>
            </div>
          </div>
        )}

        {/* --- FAS 3: KLAR / INLÄMNAD --- */}
        {phase === "submitted" && (
          <section className="py-12 text-center space-y-6 animate-fadeIn max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
              <CheckCircle2 size={44} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-stone-900">
                Fantastiskt jobbat!
              </h3>
              <p className="text-stone-600 text-base leading-relaxed">
                Din text har nu bearbetats och lämnats in för slutlig bedömning. Du är redo att gå vidare till nästa modul eller diagnos!
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-50 border border-stone-200 text-left space-y-4 shadow-xs">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-800 block">
                Din slutliga text:
              </span>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-stone-800 font-sans">
                {fullTextDraft}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}