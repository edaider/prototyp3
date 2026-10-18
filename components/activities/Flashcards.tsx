"use client";

import { useState } from "react";
import type { ActivityConfig } from "@/content/types";

type Card = {
  front: string;
  back: string;
};

type Props = {
  activity: ActivityConfig;
};

export function Flashcards({ activity }: Props) {
  const cards = ((activity as any).content as { cards?: Card[] })?.cards ?? [];
  const [revealed, setRevealed] = useState<number[]>([]);

  function toggleCard(index: number) {
    setRevealed((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <section className="rounded-2xl border border-white/15 bg-stone-950/85 p-6 shadow-xl">
      <h2 className="text-2xl font-bold">{activity.title}</h2>

      {activity.instructions && (
        <p className="mt-2 text-white/80">
          {activity.instructions}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const isRevealed = revealed.includes(index);

          return (
            <button
              key={`${card.front}-${index}`}
              type="button"
              onClick={() => toggleCard(index)}
              aria-expanded={isRevealed}
              className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-amber-300/40 bg-gradient-to-br from-amber-100 to-amber-300 p-5 text-center text-stone-950 shadow-lg transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-200"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                {isRevealed ? "Förklaring" : "Begrepp"}
              </span>

              <span className="mt-3 text-lg font-bold">
                {isRevealed ? card.back : card.front}
              </span>

              <span className="mt-4 text-xs text-stone-700">
                Klicka för att {isRevealed ? "vända tillbaka" : "vända kortet"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}