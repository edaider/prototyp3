'use client';

import React from 'react';

export default function DiscussionTips() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800">

      {/* Att tänka på */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
          <span>💡</span> Att tänka på
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Leda */}
          <div className="bg-slate-50 border border-blue-100 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-grey-700 font-bold text-lg flex items-center gap-2">
              <span>🗣️</span> Leda diskussion
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Förbered dig noga genom att läsa på om ämnet och tänka igenom vilka argument du vill presentera. Presentera dina synpunkter och sammanfattningen av texten i inledningen till samtalet.
            </p>
          </div>

          {/* Delta */}
          <div className="bg-slate-50 border border-emerald-100 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-grey-700 font-bold text-lg flex items-center gap-2">
              <span>🤝</span> Delta i diskussion
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dra paralleller och gör associationer utifrån dina egna erfarenheter, texten och vad andra i gruppen säger.
            </p>
          </div>

          {/* Lyssna */}
          <div className="bg-slate-50 border border-purple-100 rounded-xl p-5 shadow-sm space-y-2">
            <div className="text-grey-700 font-bold text-lg flex items-center gap-2">
              <span>👂</span> Lyssna
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Lyssna uppmärksamt och ställ följdfrågor. Kom ihåg att det är ett samtal, inte en monolog!
            </p>
          </div>
        </div>
      </section>

      {/* Strukturera */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <span>📋</span> Strukturera: Förslag på upplägg
        </h3>

        <ol className="space-y-3 text-sm text-slate-700 list-none">
          <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white font-semibold text-xs rounded-full flex items-center justify-center">1</span>
            <span>Börja med att presentera samtalets ämne.</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white font-semibold text-xs rounded-full flex items-center justify-center">2</span>
            <span>Du kan också börja med att sammanfatta och uttrycka din åsikt innan du ger ordet till någon annan, eller ställer en direkt fråga om vad någon tycker.</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white font-semibold text-xs rounded-full flex items-center justify-center">3</span>
            <span>Fördela ordet mellan alla klasskompisar så att alla får ta plats.</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white font-semibold text-xs rounded-full flex items-center justify-center">4</span>
            <span>När en klasskompis pratat klart kan du bekräfta det som sagts eller ställa en följdfråga.</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white font-semibold text-xs rounded-full flex items-center justify-center">5</span>
            <span>Om du eller någon annan kommer av er och in på ett annat ämne kan du leda tillbaka samtalet till rätt ämne igen.</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <span className="flex-shrink-0 w-6 h-6 bg-slate-800 text-white font-semibold text-xs rounded-full flex items-center justify-center">6</span>
            <span>När samtalet går mot sitt slut sammanfattar du det viktigaste som kommit fram.</span>
          </li>
        </ol>
      </section>
    </div>
  );
}