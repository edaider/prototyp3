"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface DiagnosticSummaryData {
  textData: {
    title: string;
    text: string;
    image?: string;
  };
  instructions?: string;
}

interface DiagnosticSummaryProps {
  data?: DiagnosticSummaryData;
}

const DEFAULT_SUMMARY_DIAGNOSTIC: DiagnosticSummaryData = {
  textData: {
    title: "Jordens öknar",
    image: "/images/oknar.jpg",
    text: `Öknarna är jordens torraste områden och finns i högtrycksområdena nära vändkretsarna. I en öken regnar det sällan mer än 250 mm/år, oftast koncentrerat till en mycket kort regntid. När regnet väl kommer är det som häftiga störtskurar som gör uttorkade flodbäddar till forsande floder. Regnen i öknarna är också opålitliga och vissa år uteblir de helt. I en öken kan det bli 55 grader varmt under dagen. Under natten däremot kan det bli kallt eftersom det inte finns någon vegetation eller några moln som kan hålla kvar värmen.`,
  },
  instructions: "Läs texten om öknarna noggrant. Skriv därefter en egen sammanfattning där du återger det viktigaste med egna ord utan hjälp från AI-tutorn.",
};

export default function DiagnosticSummary({ data = DEFAULT_SUMMARY_DIAGNOSTIC }: DiagnosticSummaryProps) {
  const [summaryText, setSummaryText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { textData, instructions } = data;

  const handleSubmit = () => {
    if (!summaryText.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 text-center space-y-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 my-6">
        <div className="flex justify-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44">
            <Image
              src="/images/sammanfatta.jpeg"
              alt="Erövrad förmåga: Sammanfatta"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Du har erövrat förmågan <span className="text-amber-800">Att sammanfatta!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            Du kan nu plocka ut det viktigaste och återge med egna ord. Du och draken flyger vidare!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-8 py-3 text-sm font-bold text-amber-50 shadow-md transition hover:bg-amber-900 cursor-pointer"
          >
            <span>Flyg vidare</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-xs pt-4">
          <video autoPlay loop muted playsInline className="w-full h-auto object-cover bg-transparent">
            <source src="/videos/drake.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 font-sans text-slate-800">
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-6 md:p-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              🗝️ Diagnos · Sammanfattning
            </p>
            <h1 className="text-xl font-extrabold">{textData.title}</h1>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {instructions && (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-sm text-amber-950 font-medium">
              💡 {instructions}
            </div>
          )}

          {textData.image && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 max-h-64">
              <img src={textData.image} alt={textData.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
                Lästext
              </h2>
              <div className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line font-serif">
                {textData.text}
              </div>
            </section>

            <aside className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
                Din sammanfattning
              </h2>
              <textarea
                value={summaryText}
                onChange={(e) => setSummaryText(e.target.value)}
                rows={10}
                placeholder="Skriv din sammanfattning här med egna ord..."
                className="w-full p-4 text-base rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!summaryText.trim()}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-colors shadow-md cursor-pointer"
              >
                Lämna in diagnos
              </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}