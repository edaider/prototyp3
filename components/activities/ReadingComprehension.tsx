"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Ruler, 
  SlidersHorizontal, 
  Type, 
  Sun, 
  Moon, 
  Palette, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  Volume2, 
  Sparkles, 
  Bot, 
  AlertTriangle, 
  Check, 
  HelpCircle, 
  Loader2 
} from 'lucide-react';

import ClickableText, { ClickableHighlight } from '../dictionary/ClickableText';

type Theme = 'light' | 'dark' | 'sepia' | 'high-contrast';
type FontOption = 'Inter' | 'Atkinson Hyperlegible' | 'OpenDyslexic' | 'Arial' | 'Verdana';

interface Question {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  answerParagraphIndex: number;
  strategyType: 'on_lines' | 'between_lines';
}

interface ThoughtStep {
  id: number;
  label: string;
  text: string;
  target: 'title' | 'inner_image' | 'keywords' | 'strategy' | 'clickable';
  image?: boolean;
}

type Props = {
  activity: any;
  apiKey?: string;
};

const ARTICLE_TITLE = "SIMTÄVLINGEN";
const ARTICLE_CATEGORY = "Lästeknik";

const PARAGRAPHS = [
  "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.",
  "I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer.",
  "Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder."
];

const THOUGHT_STEPS: ThoughtStep[] = [
  { id: 1, label: "Titta", text: "Titta på rubriken och fundera på vad texten handlar om.", target: 'title' },
  { id: 2, label: "Skapa en bild", text: "Se framför dig hur Linn sitter i omklädningsrummet och laddar.", target: 'inner_image', image: true },
  { id: 3, label: "Skumläs", text: "Låt blicken hitta orden: simtävlingen · startskottet · personliga rekord", target: 'keywords' },
  { id: 4, label: "Lässtrategi", text: "Svaret står på raderna eller kan listas ut mellan raderna.", target: 'strategy' },
  { id: 5, label: "Red ut", text: "Klicka på ord som 'personliga rekord' om du vill ha en förklaring.", target: 'clickable' }
];

const QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "Hur länge hade Linn tränat inför simtävlingen?",
    options: [{ id: "a", text: "I två veckor" }, { id: "b", text: "I fyra månader" }, { id: "c", text: "I ett helt år" }],
    correctOptionId: "b",
    answerParagraphIndex: 0,
    strategyType: 'on_lines'
  },
  {
    id: "q2",
    question: "Vad gjorde Linn i omklädningsrummet?",
    options: [{ id: "a", text: "Pratade med sin tränare" }, { id: "b", text: "Åt en smörgås" }, { id: "c", text: "Satt i hörnet med hörlurar på" }],
    correctOptionId: "c",
    answerParagraphIndex: 1,
    strategyType: 'on_lines'
  },
  {
    id: "q3",
    question: "Hur kände sig Linn sannolikt i omklädningsrummet?",
    options: [{ id: "a", text: "Nervös och fokuserad" }, { id: "b", text: "Utråkad och trött" }, { id: "c", text: "Glad och fnissig" }],
    correctOptionId: "a",
    answerParagraphIndex: 1,
    strategyType: 'between_lines'
  },
];

export function ReadingComprehension({ activity, apiKey = "" }: Props) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(1.8);
  const [fontFamily, setFontFamily] = useState<FontOption>('Inter');

  const [rulerEnabled, setRulerEnabled] = useState<boolean>(false);
  const [rulerY, setRulerY] = useState<number>(180);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const [activeThoughtIndex, setActiveThoughtIndex] = useState<number | null>(null);
  const [isThoughtVisible, setIsThoughtVisible] = useState<boolean>(false);

  const [clickedWord, setClickedWord] = useState<{ word: string; definition?: string; x: number; y: number; isLoadingDef?: boolean } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rulerEnabled) setRulerY(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rulerEnabled]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel();
    };
  }, []);

  const stopSpeech = () => {
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    if (!synthRef.current) return;
    if (!isPlaying) {
      synthRef.current.cancel();
      const fullText = `${ARTICLE_TITLE}.${PARAGRAPHS.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'sv-SE';
      utterance.onend = () => {
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

  const handleWordClick = async (rawWord: string) => {
    const clean = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'–]/g, '').trim();
    if (!clean) return;

    const activeEl = document.activeElement as HTMLElement;
    const rect = activeEl?.getBoundingClientRect?.() || { left: 100, bottom: 100 };
    const x = Math.min(window.innerWidth - 260, Math.max(16, rect.left + window.scrollX - 40));
    const y = rect.bottom + window.scrollY + 8;

    setClickedWord({ word: rawWord, definition: `Hämtar förklaring för "${clean}"...`, x, y, isLoadingDef: false });
  };

  const handleEddaClick = () => {
    if (!isThoughtVisible) {
      setActiveThoughtIndex(0);
      setIsThoughtVisible(true);
    } else {
      setActiveThoughtIndex((prev) => {
        if (prev === null || prev >= THOUGHT_STEPS.length - 1) {
          setIsThoughtVisible(false);
          return null;
        }
        return prev + 1;
      });
    }
  };

  const activeThought = (isThoughtVisible && activeThoughtIndex !== null) ? THOUGHT_STEPS[activeThoughtIndex] : null;

  // Renderar stycken med ClickableText & dynamisk gulmarkering utifrån Eddas tankesteg
  const renderParagraph = (pText: string, pIndex: number) => {
    const currentHighlights: ClickableHighlight[] = [];

    if (activeThought?.target === 'keywords') {
      ['simtävlingen', 'startskottet', 'personliga rekord'].forEach((word) => {
        const idx = pText.toLowerCase().indexOf(word.toLowerCase());
        if (idx !== -1) {
          currentHighlights.push({
            start: idx,
            end: idx + word.length,
            type: 'keyword',
            explanation: `Nyckelord: ${word}`
          });
        }
      });
    } else if (activeThought?.target === 'clickable') {
      ['personliga rekord', 'omklädningsrummet'].forEach((word) => {
        const idx = pText.toLowerCase().indexOf(word.toLowerCase());
        if (idx !== -1) {
          currentHighlights.push({
            start: idx,
            end: idx + word.length,
            type: 'concept',
            explanation: `Begrepp: ${word}`
          });
        }
      });
    }

    return (
      <div key={pIndex} id={`paragraph-${pIndex}`}>
        <p style={{ fontSize: `${fontSize}px`, lineHeight, fontFamily }} className="text-left font-normal leading-relaxed">
          <ClickableText
            text={pText}
            highlights={currentHighlights}
            onWordClick={(word) => handleWordClick(word)}
          />
        </p>
      </div>
    );
  };

  return (
    <div className="w-full text-slate-800">
      {/* VERKTYGSFÄLT HÖGST UPP */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlayPause}
            className="px-3.5 py-1.5 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            {isPlaying && !isPaused ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying && !isPaused ? 'Pausa' : 'Läs texten'}</span>
          </button>

          <button
            type="button"
            onClick={stopSpeech}
            className="px-3 py-1.5 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-600 flex items-center gap-1 cursor-pointer"
          >
            <Square size={12} />
            <span>Stopp</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRulerEnabled(!rulerEnabled)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
              rulerEnabled ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <Ruler size={14} />
            <span>Lässkena</span>
          </button>
        </div>
      </div>

      {/* LÄSSKENA OVERLAY */}
      {rulerEnabled && (
        <div 
          style={{ top: `${rulerY}px` }}
          className="fixed left-0 right-0 h-12 pointer-events-none bg-amber-200/30 border-y-2 border-amber-500/60 z-40 transform -translate-y-1/2"
        />
      )}

      {/* ORDFÖRKLARINGSPOPUP */}
      {clickedWord && (
        <div 
          style={{ top: `${clickedWord.y}px`, left: `${clickedWord.x}px` }}
          className="fixed z-50 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl max-w-xs text-xs space-y-2 animate-fadeIn"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-900">"{clickedWord.word}"</span>
            <button
              type="button"
              onClick={() => setClickedWord(null)}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {clickedWord.definition}
          </p>
        </div>
      )}

      {/* HUVUDINNEHÅLL */}
      <div className="grid gap-8 lg:grid-cols-[1fr_280px] items-start">
        
        {/* ARTIKEL & FRÅGOR */}
        <article className="space-y-6">
          {/* RÄTT: flex-col tvingar "LÄSTEKNIK" att ligga överst och "SIMTÄVLINGEN" under */}
<div className="flex flex-col items-start gap-1">
  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
    {ARTICLE_CATEGORY}
  </span>
  <h1 className={`text-3xl font-extrabold text-slate-900 tracking-tight ${activeThought?.target === 'title' ? 'bg-amber-200/90 rounded px-1.5 py-0.5 inline-block' : ''}`}>
    <ClickableText text={ARTICLE_TITLE} onWordClick={(word) => handleWordClick(word)} />
  </h1>
</div>

          <div className="space-y-5">
            {PARAGRAPHS.map((p, idx) => renderParagraph(p, idx))}
          </div>

          {/* FRÅGEDEL */}
          <section className="mt-10 pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">
                Fråga {currentQuestionIndex + 1} av {QUESTIONS.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">
                {QUESTIONS[currentQuestionIndex].strategyType === 'on_lines' ? 'Läs på raderna' : 'Läs mellan raderna'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {QUESTIONS[currentQuestionIndex].question}
            </h3>

            <div className="space-y-2.5 pt-2">
              {QUESTIONS[currentQuestionIndex].options.map((opt) => {
                const isSelected = selectedAnswers[QUESTIONS[currentQuestionIndex].id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedAnswers(prev => ({
                        ...prev,
                        [QUESTIONS[currentQuestionIndex].id]: opt.id
                      }));
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition cursor-pointer flex items-center gap-3 ${
                      isSelected ? 'border-amber-700 bg-amber-50 text-amber-950 font-bold shadow-xs' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-amber-800 bg-amber-800 text-white' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 disabled:opacity-30 cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft size={14} />
                <span>Föregående</span>
              </button>

              {currentQuestionIndex < QUESTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(i => i + 1)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-800 text-amber-50 hover:bg-amber-900 cursor-pointer flex items-center gap-1"
                >
                  <span>Nästa</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <CheckCircle2 size={16} />
                  <span>Klar!</span>
                </div>
              )}
            </div>
          </section>
        </article>

        {/* HÖGERKOLUMN: HOVNARREN */}
        <aside className="flex flex-col items-center space-y-4 pt-2">
          <button
            type="button"
            onClick={handleEddaClick}
            className="group relative flex flex-col items-center focus:outline-none cursor-pointer"
          >
            <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-md transition-all group-hover:bg-amber-400/50" />
            <img
              src="/images/AItutor.png"
              alt="Edda AI-lärare"
              className="relative h-20 w-20 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110 active:scale-95"
            />
            <div className="mt-1.5 flex items-center gap-1 text-xs font-bold text-amber-900">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Klicka på Edda för en tanke</span>
            </div>
          </button>

          <div className="relative mt-6 w-full min-h-[200px] rounded-2xl bg-white p-4 flex flex-col items-center justify-center text-center">
            {activeThought ? (
              <div className="space-y-2 animate-fadeIn">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                  {activeThought.label}
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  {activeThought.text}
                </p>
                <button
                  type="button"
                  onClick={() => setIsThoughtVisible(false)}
                  className="mt-3 text-[11px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Dölj tanke
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Klicka på Edda ovanför när du vill ha hjälp eller en lässtanke!
              </p>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}