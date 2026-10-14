"use client";

import { useState } from "react";
import type { ActivityConfig } from "@/content/types";

type Props = {
  activity: ActivityConfig;
  mode: "study" | "practice" | "diagnosis";
};

export function WritingInput({ activity }: Props) {
  const [answer, setAnswer] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{activity.title}</h2>
        {activity.instructions && (
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            {activity.instructions}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`${activity.id}-input`}
          className="block text-sm font-semibold text-slate-800"
        >
          Ditt svar
        </label>

        <textarea
          id={`${activity.id}-input`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Skriv ditt resonemang här..."
          rows={6}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 transition-all"
        />

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {answer.length} tecken
          </span>

          <button
            type="button"
            disabled={!answer.trim()}
            onClick={() => console.log("Svar sparat:", answer)}
            className="group relative inline-flex items-center justify-center rounded-lg border border-amber-900/40 bg-gradient-to-b from-amber-700 to-amber-900 px-6 py-2.5 text-sm font-bold text-amber-50 shadow-md transition-all hover:border-amber-600 hover:from-amber-600 hover:to-amber-800 disabled:opacity-40"
          >
            Spara svar
          </button>
        </div>
      </div>
    </div>
  );
}