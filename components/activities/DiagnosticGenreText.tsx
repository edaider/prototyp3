"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface DiagnosticArgumentativeData {
  textData: {
    title: string;
    text: string;
    image?: string;
  };
}

interface DiagnosticArgumentativeProps {
  data?: DiagnosticArgumentativeData;
}

const DEFAULT_ARGUMENTATIVE_DIAGNOSTIC: DiagnosticArgumentativeData = {
  textData: {
    title: "ENERGIDRYCKER I SKOLAN",
    image: "/images/energidryck.png",
    text: `Det säljs och konsumeras allt fler energidrycker bland unga i Sverige. Många elever dricker energidryck för att orka med skoldagen, men lärare och läkare slår larm om biverkningar som hjärtklappning, koncentrationssvårigheter och sömnproblem. 

Vissa skolor har redan infört ett förbud mot energidrycker under skoltid, medan andra anser att det är upp till eleverna själva och deras föräldrar att bestämma.`,
  },
};

export default function DiagnosticArgumentative({
  data = DEFAULT_ARGUMENTATIVE_DIAGNOSTIC,
}: DiagnosticArgumentativeProps) {
  const [argumentativeText, setArgumentativeText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { textData } = data;

  const handleSubmit = () => {
    if (!argumentativeText.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 text-center space-y-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 my-6">
        <div className="flex justify-center">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44">
            <Image
              src="/images/byggtext.jpeg"
              alt="Erövrad förmåga: Bygga en text"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            Du har erövrat förmågan <span className="text-amber-800">Bygga en text!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            Du har visat att du kan strukturerat formulera din tes, argumentera och bygga en komplett text på egen hand. Du och draken flyger vidare!
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
              🗝️ Diagnos · Argumenterande text
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
                  Bakgrund
                </h2>
                <div className="text-base sm:text-lg leading-relaxed text-slate-700 whitespace-pre-line font-serif">
                  {textData.text}
                </div>
              </div>

              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 space-y-2 text-amber-950 text-xs sm:text-sm">
                <h3 className="font-bold text-base">Instruktioner till diagnosen:</h3>
                <p>
                  Bör skoltid vara helt fri från energidrycker? Skriv en argumenterande text helt på egen hand.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Formulera en tydlig <strong>tes</strong> (din åsikt).</li>
                  <li>Ge minst <strong>2 argument</strong> som stödjer din tes.</li>
                  <li>Resonera och motivera varför du tycker som du gör.</li>
                  <li>Avsluta med en kort <strong>sammanfattning/uppmaning</strong>.</li>
                </ul>
              </div>
            </section>

            {/* Höger spalt: Textområde för elevens text */}
            <aside className="space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900 border-b pb-2 border-slate-100">
                  Din argumenterande text
                </h2>
                <textarea
                  value={argumentativeText}
                  onChange={(e) => setArgumentativeText(e.target.value)}
                  rows={12}
                  placeholder="Skriv din argumenterande text här helt på egen hand..."
                  className="w-full p-4 text-base rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!argumentativeText.trim()}
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