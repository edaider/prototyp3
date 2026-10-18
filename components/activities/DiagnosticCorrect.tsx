"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface DiagnosticCorrectData {
  textData: {
    title: string;
    text: string;
    image?: string;
  };
}

interface DiagnosticCorrectProps {
  data?: DiagnosticCorrectData;
}

const DEFAULT_CORRECT_DIAGNOSTIC: DiagnosticCorrectData = {
  textData: {
    title: "SKRIVA NOVELL",
    image: "/images/skonlitteratur.png",
    text: `I denna diagnos ska du visa din förmåga att skriva och bearbeta en berättande text på egen hand. 

Använd dina kunskaper om skrivregler, meningsbyggnad, textbindning, språklig variation och språkliga normer för att skapa en välstrukturerad och fängslande novell.`,
  },
};

export default function DiagnosticCorrect({
  data = DEFAULT_CORRECT_DIAGNOSTIC,
}: DiagnosticCorrectProps) {
  const [novellText, setNovellText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { textData } = data;

  const handleSubmit = () => {
    if (!novellText.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 text-center space-y-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 my-6">
        <div className="flex justify-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44">
            <Image
              src="/images/skrivkorrekt.jpeg"
              alt="Erövrad förmåga: Skriva korrekt"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Du har erövrat förmågan <span className="text-amber-800">Skriva korrekt!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            Du har visat att du kan tillämpa skrivregler, variera din meningsbyggnad och binda ihop din text på ett riktigt bra sätt helt på egen hand. Du och draken flyger vidare!
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
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 md:p-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              🗝️ Diagnos · Skriva korrekt
            </p>
            <h1 className="text-xl font-extrabold">{textData.title}</h1>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {textData.image && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 max-h-64 flex justify-center bg-white">
              <img src={textData.image} alt={textData.title} className="w-auto h-full max-h-64 object-contain" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vänster spalt: Bakgrundstext & Instruktioner */}
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
                  Instruktion
                </h2>
                <div className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line font-serif">
                  {textData.text}
                </div>
              </div>

              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-2 text-amber-950 text-xs sm:text-sm">
                <h3 className="font-bold text-base">Att tänka på under diagnosen:</h3>
                <p>
                  Skriv en novell utifrån en valfri eller given händelse helt på egen hand:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Skrivregler:</strong> Följ regler för stavning, punkt, komma samt stor/liten bokstav.</li>
                  <li><strong>Meningsbyggnad:</strong> Skapa varierad meningslängd utan korta, hackiga satsradsfel.</li>
                  <li><strong>Textbindning:</strong> Bind samman meningarna med varierande bindord.</li>
                  <li><strong>Språklig variation:</strong> Använd gestaltande beskrivningar och adekvat ordförråd.</li>
                  <li><strong>Struktur:</strong> Inledning, händelseförlopp, klimax och avslutning.</li>
                </ul>
              </div>
            </section>

            {/* Höger spalt: Textområde för elevens novell */}
            <aside className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
                  Din novell
                </h2>
                <textarea
                  value={novellText}
                  onChange={(e) => setNovellText(e.target.value)}
                  rows={14}
                  placeholder="Skriv din novell här helt utan hjälpmedel..."
                  className="w-full p-4 text-base rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!novellText.trim()}
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