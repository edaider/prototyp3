"use client";

import { useState } from "react";
import { X, Check, Flame, Award, BookOpen, Heart } from "lucide-react";

interface FordiagnosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { profile: string; dragon: string; interest: string }) => void;
}

const dragons = [
  { id: "drake1", name: "Eldgnistan", src: "/images/drake1.png", color: "from-amber-500 to-red-600" },
  { id: "drake2", name: "Frostskuggam", src: "/images/drake2.png", color: "from-cyan-500 to-blue-600" },
  { id: "drake3", name: "Skogsbris", src: "/images/drake3.png", color: "from-emerald-500 to-teal-700" },
];

const profiles = [
  {
    id: "stod",
    title: "Behöver lite extra stöd",
    desc: "Jag vill ta det i en lugn takt och ha tydlig guidning.",
    icon: "🛡️",
  },
  {
    id: "utmaning",
    title: "Vill ha rejäla utmaningar",
    desc: "Jag förstår snabbt och vill pröva mina krafter på svårare uppdrag.",
    icon: "⚔️",
  },
  {
    id: "omotiverad",
    title: "Tycker skolan känns lite tråkig",
    desc: "Jag vill att äventyret ska överraska mig och hålla tempot uppe.",
    icon: "🌀",
  },
];

const interests = [
  { id: "fotboll", title: "Fotboll", src: "/images/fotboll.png" },
  { id: "gaming", title: "Gaming", src: "/images/gaming.png" },
  { id: "socialamedier", title: "Sociala medier", src: "/images/socialamedier.png" },
];

export default function FordiagnosModal({ isOpen, onClose, onSave }: FordiagnosModalProps) {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedDragon, setSelectedDragon] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

  if (!isOpen) return null;

  const isFormValid = selectedProfile && selectedDragon && selectedInterest;

  const handleComplete = () => {
    if (!isFormValid) return;
    if (onSave) {
      onSave({
        profile: selectedProfile,
        dragon: selectedDragon,
        interest: selectedInterest,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Huvudkort för fördiagnosen */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-amber-600/60 bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950/90 text-amber-100 shadow-2xl p-6 md:p-8">
        
        {/* Stängknapp i hörnet */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/40 bg-stone-900/80 text-amber-300 hover:bg-amber-900/60 hover:text-white transition-all z-10"
          title="Stäng fördiagnos"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header / Intro med Draktränaren */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-amber-800/40">
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-amber-500/20 blur-md animate-pulse" />
            <img
              src="/images/draktranaren.png"
              alt="Draktränaren"
              className="relative h-44 w-auto object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-amber-200 tracking-wide">
              Hälsningar, unga draktränare!
            </h2>
            <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
              Jag är din Draktränare och master. Runt om i landet reser sig <strong>fyra magiska slott</strong>. För att ta dig dit måste du rida på en drakrygg! Idag tilldelar jag dig din alldeles egna drakunge. 
            </p>
            <p className="text-xs md:text-sm text-amber-200/80 leading-relaxed italic">
              Genom varje utmaning du klarar växer din drake sig större och starkare, tills det slutligen blir dags för den stora <strong>Slutstriden</strong> – där du och alla andra draktränare möts i en episk Quiz-kamp!
            </p>
          </div>
        </div>

        {/* Steg 1: Välj din Drake */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-400" /> Steg 1: Välj din drakunge
          </h3>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {dragons.map((dragon) => {
              const isSelected = selectedDragon === dragon.id;
              return (
                <button
                  key={dragon.id}
                  onClick={() => setSelectedDragon(dragon.id)}
                  className={`relative flex flex-col items-center justify-between p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/20 scale-[1.02]"
                      : "border-stone-800 bg-stone-900/60 hover:border-amber-700/60 hover:bg-stone-900"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-stone-950">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                  <img
                    src={dragon.src}
                    alt={dragon.name}
                    className="h-20 w-20 md:h-24 md:w-24 object-contain my-1 transition-transform group-hover:scale-105"
                  />
                  <span className="text-xs md:text-sm font-bold text-amber-200">
                    {dragon.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Steg 2: Välj din Lärprofil */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-amber-400" /> Steg 2: Hur lär du dig bäst?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {profiles.map((profile) => {
              const isSelected = selectedProfile === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/20"
                      : "border-stone-800 bg-stone-900/60 hover:border-amber-700/60 hover:bg-stone-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{profile.icon}</span>
                    {isSelected && <Check className="h-4 w-4 text-amber-400" />}
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-amber-100">
                    {profile.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                    {profile.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Steg 3: Välj Intresseområde */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <Heart className="h-4 w-4 text-amber-400" /> Steg 3: Vilka är dina intresseområden?
          </h3>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {interests.map((item) => {
              const isSelected = selectedInterest === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedInterest(item.id)}
                  className={`relative flex flex-col items-center justify-between p-3 rounded-xl border transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/20 scale-[1.02]"
                      : "border-stone-800 bg-stone-900/60 hover:border-amber-700/60 hover:bg-stone-900"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-stone-950">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center my-1">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-amber-200 mt-2">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Starta Äventyret-knapp */}
        <div className="mt-8 flex justify-end">
          <button
            disabled={!isFormValid}
            onClick={handleComplete}
            className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
              isFormValid
                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-500/20 cursor-pointer"
                : "bg-stone-800 text-stone-500 cursor-not-allowed"
            }`}
          >
            <Award className="h-4 w-4" /> Ta emot din drake & Starta äventyret
          </button>
        </div>

      </div>
    </div>
  );
}