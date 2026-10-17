'use client';

import React, { useState } from 'react';

interface ChecklistItem {
  id: number;
  text: string;
}

const initialItems: ChecklistItem[] = [
  { id: 1, text: 'Sammanfattar du texten väl inför de andra eleverna?' },
  { id: 2, text: 'Framför du dina åsikter utifrån texten och de givna frågorna?' },
  { id: 3, text: 'Har du väl utbyggda resonemang för din diskussionsfråga?' },
  { id: 4, text: 'Talar du engagerat så att ditt ämne väcker intresse?' },
  { id: 5, text: 'Anpassar du ditt tal och språk efter deltagarna?' },
  { id: 6, text: 'Tittar du upp ibland och talar tydligt?' },
  { id: 7, text: 'Fördelar du ordet mellan alla deltagare i samtalet?' },
  { id: 8, text: 'Återger du diskussionen korrekt?' },
  { id: 9, text: 'Håller du dig inom tidsgränsen för din sammanfattning? (2–3 min)' },
  { id: 10, text: 'Gör du en sammanfattning av det viktigaste i diskussionen?' },
  { id: 11, text: 'Lyssnar du på de andra deltagarna och ställer frågor till dem?' },
  { id: 12, text: 'Lämnar du ordet till dina klasskompisar och visar engagemang för deras bidrag?' },
];

export default function DiscussionChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / initialItems.length) * 100);

  const resetAll = () => setCheckedItems({});

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800">
      {/* Header & Progress Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Kontrollista för diskussion
            </h2>
            <p className="text-sm text-slate-600">
              Bocka av punkterna för att säkerställa att du fått med alla moment.
            </p>
          </div>
          <button
            onClick={resetAll}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 underline self-start sm:self-auto"
          >
            Nollställ alla
          </button>
        </div>

        {/* Framstegsindikator */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Framsteg</span>
            <span>{completedCount} av {initialItems.length} avklarade ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lista på kontrollpunkter */}
      <div className="grid grid-cols-1 gap-3">
        {initialItems.map((item) => {
          const isChecked = !!checkedItems[item.id];
          return (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-150 select-none ${
                isChecked
                  ? 'bg-indigo-50/60 border-indigo-200 text-slate-900'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // Hanteras av label onClick
                className="mt-0.5 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 flex-shrink-0 cursor-pointer"
              />
              <span className={`text-sm leading-relaxed ${isChecked ? 'line-through text-slate-500' : ''}`}>
                {item.text}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}