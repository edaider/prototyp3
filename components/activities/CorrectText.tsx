'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface CorrectTextProps {
  title?: string;
  instructions?: string;
}

export default function CorrectText({
  title = 'Mysteriet i skrivboken – Hitta och rätta felet',
  instructions = 'Läs den felaktiga texten nedan. Studera sedan tabellen för att förstå vilka språkliga fel som gjorts och hur de kan rättas.',
}: CorrectTextProps) {
  const [showCorrect, setShowCorrect] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-slate-800">

      {/* 1. DEN FELAKTIGA TEXTEN */}
      <div className="bg-slate-100 border border-slate-500 rounded-2xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm uppercase tracking-wider">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>Kan du hitta elevens felskrivningar?</span>
        </div>
        <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-serif italic bg-white/80 p-4 rounded-xl border border-amber-200/60 shadow-inner">
          "imorgon ska klassen åka på utflykt till museet det ska bli så kul. dom sa att vi måste ta med oss matsäck. Bananer smörgåsar och festis. eftersom det regnar ute. vi måste ha på oss regnkläder. sedan ska vi gå hem sedan ska vi äta mat sedan ska vi sova."
        </p>
      </div>

      {/* 2. TABELL INDELAD I DE 5 OMRÅDENA */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>📊</span> Analys av de 5 språkliga områdena
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold">
                <th className="p-4 min-w-[140px]">Område</th>
                <th className="p-4 min-w-[220px]">Vad som blev fel</th>
                <th className="p-4 min-w-[240px]">Hur det kan rättas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/30">
                  Skrivregler
                </td>
                <td className="p-4 text-slate-600">
                  Liten bokstav på <em className="text-amber-800 font-medium font-serif">"imorgon"</em> och felaktig stor bokstav mitt i meningen på <em className="text-amber-800 font-medium font-serif">"Bananer"</em>.
                </td>
                <td className="p-4 text-emerald-800 font-medium">
                  Använd stor bokstav i början av meningar och ta bort felaktiga versaler.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/30">
                  Meningsbyggnad
                </td>
                <td className="p-4 text-slate-600">
                  <em className="text-amber-800 font-medium font-serif">"eftersom det regnar ute."</em> är en ofullständig mening (satsrad) som står helt för sig själv.
                </td>
                <td className="p-4 text-emerald-800 font-medium">
                  Koppla ihop bisatsen med föregående mening med komma.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/30">
                  Textbindning
                </td>
                <td className="p-4 text-slate-600">
                  Ordet <em className="text-amber-800 font-medium font-serif">"sedan"</em> upprepas tre gånger i rad och gör texten hackig och enformig.
                </td>
                <td className="p-4 text-emerald-800 font-medium">
                  Variera bindningsorden med t.ex. <em>"Därefter"</em>, <em>"När vi är klara"</em> eller <em>"Slutligen"</em>.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/30">
                  Språklig variation
                </td>
                <td className="p-4 text-slate-600">
                  Användning av talspråksordet <em className="text-amber-800 font-medium font-serif">"dom"</em> samt mycket enkla, upprepande ordval.
                </td>
                <td className="p-4 text-emerald-800 font-medium">
                  Byt ut talspråk mot skriftspråk (<em>"de"</em> / <em>"lärarna"</em>) och utöka ordförrådet.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/30">
                  Språkliga normer
                </td>
                <td className="p-4 text-slate-600">
                  Saknade skiljetecken (punkter och kommatecken) gör att meningarna flyter ihop.
                </td>
                <td className="p-4 text-emerald-800 font-medium">
                  Sätt ut punkter vid tankeuppehåll och kommatecken vid uppräkningar.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. KNAPP & DEN RÄTTADE TEXTEN */}
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={() => setShowCorrect(!showCorrect)}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-slate-800 cursor-pointer active:scale-98"
        >
          {showCorrect ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Dölj korrekt version</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Se korrekt version</span>
            </>
          )}
        </button>

        {showCorrect && (
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-6 shadow-sm space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="flex items-center gap-1">
                Korrekt och bearbetad version <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              </span>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-slate-900 font-serif bg-white p-5 rounded-xl border border-emerald-200 shadow-sm">
              "I morgon ska klassen åka på utflykt till museet, vilket ska bli väldigt roligt. Lärarna sade att vi måste ta med oss matsäck bestående av bananer, smörgåsar och festis. Eftersom det regnar ute behöver vi dessutom ha på oss regnkläder. Därefter går vi hem för att äta och slutligen sova."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}