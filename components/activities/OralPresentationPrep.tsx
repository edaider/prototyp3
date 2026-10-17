'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Mic, CheckCircle2, AlertCircle } from 'lucide-react';

interface OutlineItem {
  id: string;
  section: 'inledning' | 'huvuddel' | 'avslutning';
  title: string;
  hint: string;
  placeholder: string;
  bullets: string[];
}

export default function OralPresentationPrep() {
  const [activeTab, setActiveTab] = useState<'disposition' | 'ovning'>('disposition');

  // Dispositionsdata
  const [introTitle, setIntroTitle] = useState('');
  const [introHook, setIntroHook] = useState('');
  const [mainPoints, setMainPoints] = useState<string[]>(['', '', '']);
  const [outroConclusion, setOutroConclusion] = useState('');
  const [selectedRhetoric, setSelectedRhetoric] = useState<string>('');

  // Övningsläge & Timer
  const [seconds, setSeconds] = useState(0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);

  // Hantera stödord i huvuddelen
  const handleMainPointChange = (index: number, value: string) => {
    const updated = [...mainPoints];
    updated[index] = value;
    setMainPoints(updated);
  };

  // Timer-logik
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActiveTimer) {
      interval = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    } else if (!isActiveTimer && seconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActiveTimer, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActiveTimer(false);
  };

  // Kontroll om elev har fyllt i tillräckligt för att träna
  const isReadyToPractice =
    introTitle.trim() !== '' &&
    mainPoints.some((p) => p.trim() !== '') &&
    outroConclusion.trim() !== '';

  return (
    <div className="w-full max-w-4xl mx-auto font-sans text-slate-800 space-y-6">
      {/* Navigering mellan förberedelse och övningsläge */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('disposition')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === 'disposition'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          1. Organisera din disposition
        </button>
        <button
          onClick={() => isReadyToPractice && setActiveTab('ovning')}
          disabled={!isReadyToPractice}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'ovning'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          <span>2. Öva med stödordskort & timer</span>
          {isReadyToPractice && <CheckCircle2 size={16} className="text-emerald-600" />}
        </button>
      </div>

      {/* STEG 1: DISPOSITION */}
      {activeTab === 'disposition' && (
        <div className="space-y-8 animate-fadeIn">
          <header className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Förbered din muntliga presentation
            </h2>
            <p className="text-sm text-slate-600">
              Gör om din sammanfattning till ett framförande. Skriv bara <strong>stödord och korta fraser</strong> – inte hela meningar!
            </p>
          </header>

          <div className="space-y-6">
            {/* INLEDNING */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white font-bold text-xs">
                  1
                </span>
                <h3 className="font-bold text-base text-slate-900">Inledning</h3>
              </div>
              <p className="text-xs text-slate-600">
                Fånga klassens intresse direkt. Vad heter texten och hur ska du starta?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Textens titel & författare:</label>
                  <input
                    type="text"
                    value={introTitle}
                    onChange={(e) => setIntroTitle(e.target.value)}
                    placeholder="t.ex. 'Simtävlingen' av författaren..."
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Intresseväckare / Startfras:</label>
                  <input
                    type="text"
                    value={introHook}
                    onChange={(e) => setIntroHook(e.target.value)}
                    placeholder="t.ex. Har ni någonsin varit riktigt nervösa?"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* HUVUDDEL */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white font-bold text-xs">
                  2
                </span>
                <h3 className="font-bold text-base text-slate-900">Huvuddel (Stödord)</h3>
              </div>
              <p className="text-xs text-slate-600">
                Ange de 2–3 viktigaste händelserna eller punkterna från sammanfattningen som du ska tala om.
              </p>

              <div className="space-y-3">
                {mainPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 font-bold">{idx + 1}.</span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handleMainPointChange(idx, e.target.value)}
                      placeholder={`Stödord ${idx + 1}...`}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* AVSLUTNING */}
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-xs">
                  3
                </span>
                <h3 className="font-bold text-base text-slate-900">Avslutning</h3>
              </div>
              <p className="text-xs text-slate-600">
                Knyta ihop säcken. Vad ska din sista mening till klassen vara?
              </p>

              <div>
                <input
                  type="text"
                  value={outroConclusion}
                  onChange={(e) => setOutroConclusion(e.target.value)}
                  placeholder="t.ex. Sammanfattningsvis visar texten att övning ger färdighet."
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
            </div>

            {/* RETORISK KRYDDA */}
            <div className="border border-amber-200 bg-amber-50/60 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2">
                <span>✨ Retorisk krydda (Frivilligt)</span>
              </h3>
              <p className="text-xs text-amber-900">
                Välj en stilfigur som du vill försöka väva in i ditt framförande:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'anafor', label: 'Anafor (Upprepa startord)' },
                  { id: 'hyperbol', label: 'Hyperbol (Kraftig överdrift)' },
                  { id: 'litotes', label: 'Litotes (Underdrift)' },
                  { id: 'metafor', label: 'Metafor (Bildspråk)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setSelectedRhetoric(selectedRhetoric === item.id ? '' : item.id)
                    }
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors ${
                      selectedRhetoric === item.id
                        ? 'bg-amber-900 text-amber-50 border-amber-900'
                        : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('ovning')}
            disabled={!isReadyToPractice}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl transition-all disabled:opacity-40 shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Klar! Gå till övningsläget med timer</span>
          </button>
        </div>
      )}

      {/* STEG 2: ÖVNINGSLÄGE MED TIMER */}
      {activeTab === 'ovning' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top-bar med timer */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
                Övningsläge
              </span>
              <h3 className="text-xl font-bold">Öva på din presentation</h3>
            </div>

            <div className="flex items-center gap-4 bg-slate-800 px-5 py-3 rounded-2xl border border-slate-700">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">Tid</span>
                <span className="text-2xl font-mono font-bold">{formatTime(seconds)}</span>
              </div>

              <button
                onClick={() => setIsActiveTimer(!isActiveTimer)}
                className="p-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all cursor-pointer"
              >
                {isActiveTimer ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button
                onClick={resetTimer}
                className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition-all cursor-pointer"
                title="Återställ timer"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Stödordskort / Manusvy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* KORT 1: INLEDNING */}
            <div className="border-2 border-amber-400 bg-amber-50/30 p-5 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                1. Inledning
              </span>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Startfras / Intresseväckare:</p>
                <p className="text-base font-bold text-slate-900 mt-1">"{introHook}"</p>
              </div>
              <div className="border-t border-amber-200/60 pt-2">
                <p className="text-xs text-slate-500 font-semibold">Titel & Författare:</p>
                <p className="text-sm font-medium text-slate-800">{introTitle}</p>
              </div>
            </div>

            {/* KORT 2: HUVUDDEL */}
            <div className="border-2 border-sky-400 bg-sky-50/30 p-5 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 block">
                2. Huvuddel (Stödord)
              </span>
              <ul className="space-y-2">
                {mainPoints
                  .filter((p) => p.trim() !== '')
                  .map((point, i) => (
                    <li key={i} className="text-sm font-bold text-slate-800 flex items-start gap-2">
                      <span className="text-sky-600 font-mono">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* KORT 3: AVSLUTNING */}
            <div className="border-2 border-emerald-400 bg-emerald-50/30 p-5 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                3. Avslutning
              </span>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Slutord / Budskap:</p>
                <p className="text-base font-bold text-slate-900 mt-1">"{outroConclusion}"</p>
              </div>
              {selectedRhetoric && (
                <div className="border-t border-emerald-200/60 pt-2 text-xs text-emerald-900">
                  <span className="font-bold">Kom ihåg din krydda: </span>
                  <span className="capitalize">{selectedRhetoric}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tips för framförandet */}
          <div className="border border-slate-200 bg-slate-50 p-5 rounded-2xl space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 text-sm">Kom ihåg när du pratar:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <p>👀 <strong>Ögonkontakt:</strong> Titta upp från korten regelbundet.</p>
              <p>🗣️ <strong>Röstläge:</strong> Tala tydligt och stressa inte.</p>
              <p>⏱️ <strong>Pauser:</strong> Våga ta en kort paus mellan inledning och huvuddel.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}