"use client";

import React, { useState } from "react";

export interface TextOrderPart {
  id: string;
  text: string;
}

export interface TextOrderExerciseItem {
  id: string;
  title: string;
  instruction: string;
  parts: TextOrderPart[];
  correctOrder: string[];
  typeOptions: string[];
  correctType: string;
  typeExplanation: string;
  structureExplanation: string;
}

interface TextOrderExerciseProps {
  exercises: TextOrderExerciseItem[];
}

export default function TextOrderExercise({
  exercises,
}: TextOrderExerciseProps) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [orders, setOrders] = useState<Record<string, string[]>>({});
  const [orderChecked, setOrderChecked] = useState<Record<string, boolean>>({});
  const [selectedTypes, setSelectedTypes] = useState<Record<string, string>>({});
  const [typeChecked, setTypeChecked] = useState<Record<string, boolean>>({});
  const [draggedId, setDraggedId] = useState<string | null>(null);

  if (!exercises.length) return null;

  const exercise = exercises[exerciseIndex];
  const id = exercise.id;

  const currentOrder = orders[id] ?? exercise.parts.map((part) => part.id);
  const parts = currentOrder
    .map((partId) => exercise.parts.find((part) => part.id === partId))
    .filter((part): part is TextOrderPart => !!part);

  const isOrderCorrect =
    orderChecked[id] === true &&
    currentOrder.every((partId, index) => partId === exercise.correctOrder[index]);

  const isTypeCorrect =
    typeChecked[id] === true &&
    selectedTypes[id] === exercise.correctType;

  const completedCount = exercises.filter((item) => {
    const itemOrder = orders[item.id] ?? item.parts.map((part) => part.id);
    return (
      orderChecked[item.id] === true &&
      itemOrder.every((partId, index) => partId === item.correctOrder[index]) &&
      typeChecked[item.id] === true &&
      selectedTypes[item.id] === item.correctType
    );
  }).length;

  const movePart = (from: number, to: number) => {
    if (isOrderCorrect || to < 0 || to >= parts.length) return;

    const next = [...currentOrder];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);

    setOrders((prev) => ({ ...prev, [id]: next }));
    setOrderChecked((prev) => ({ ...prev, [id]: false }));
    setTypeChecked((prev) => ({ ...prev, [id]: false }));
  };

  const dropOn = (targetId: string) => {
    if (!draggedId || draggedId === targetId || isOrderCorrect) return;

    const from = currentOrder.indexOf(draggedId);
    const to = currentOrder.indexOf(targetId);

    if (from !== -1 && to !== -1) movePart(from, to);
    setDraggedId(null);
  };

  const checkOrder = () => {
    setOrderChecked((prev) => ({ ...prev, [id]: true }));
    setTypeChecked((prev) => ({ ...prev, [id]: false }));
  };

  const resetExercise = () => {
    setOrders((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setOrderChecked((prev) => ({ ...prev, [id]: false }));
    setSelectedTypes((prev) => ({ ...prev, [id]: "" }));
    setTypeChecked((prev) => ({ ...prev, [id]: false }));
  };

  const resetAll = () => {
    setExerciseIndex(0);
    setOrders({});
    setOrderChecked({});
    setSelectedTypes({});
    setTypeChecked({});
    setDraggedId(null);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Pussla ihop texten
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Ordna textdelarna. Identifiera sedan texttypen och undersök
          hur textens struktur hjälper läsaren att förstå innehållet.
        </p>

        <div className="mt-5 flex justify-between text-sm font-semibold text-slate-600">
          <span>Övning {exerciseIndex + 1} av {exercises.length}</span>
          <span>{completedCount} av {exercises.length} klara</span>
        </div>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{
              width: `${(completedCount / exercises.length) * 100}%`,
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {exercises.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setExerciseIndex(index);
                setDraggedId(null);
              }}
              className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                index === exerciseIndex
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {index + 1}. {item.title}
            </button>
          ))}
        </div>
      </header>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">
          {exercise.title}
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          {exercise.instruction}
        </p>

        <h4 className="font-bold text-slate-900 mb-3">
          Steg 1: Ordna textdelarna
        </h4>

        <div className="space-y-3">
          {parts.map((part, index) => (
            <div
              key={part.id}
              draggable={!isOrderCorrect}
              onDragStart={(event) => {
                setDraggedId(part.id);
                event.dataTransfer.setData("text/plain", part.id);
                event.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const droppedId = event.dataTransfer.getData("text/plain");
                if (droppedId) {
                  setDraggedId(droppedId);
                  dropOn(part.id);
                }
              }}
              onDragEnd={() => setDraggedId(null)}
              className={`rounded-2xl border p-4 ${
                draggedId === part.id
                  ? "border-indigo-400 bg-indigo-50 opacity-60"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg bg-slate-100 font-bold text-slate-700">
                  {index + 1}
                </span>

                <p className="flex-1 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {part.text}
                </p>

                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    disabled={index === 0 || isOrderCorrect}
                    aria-label="Flytta upp"
                    onClick={() => movePart(index, index - 1)}
                    className="w-8 h-8 rounded-lg border border-slate-200 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={index === parts.length - 1 || isOrderCorrect}
                    aria-label="Flytta ned"
                    onClick={() => movePart(index, index + 1)}
                    className="w-8 h-8 rounded-lg border border-slate-200 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isOrderCorrect && (
          <button
            type="button"
            onClick={checkOrder}
            className="w-full mt-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3"
          >
            Kontrollera ordningen
          </button>
        )}

        {orderChecked[id] && !isOrderCorrect && (
          <div role="status" className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <p className="font-bold text-amber-900 mb-1">
              Inte riktigt än!
            </p>
            <p className="text-sm text-amber-900">
              Fundera på hur texten börjar, hur innehållet utvecklas
              och vad som behöver komma sist. Flytta delarna och försök igen.
            </p>
          </div>
        )}

        {isOrderCorrect && (
          <div role="status" className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4">
            <p className="font-bold text-emerald-900 mb-2">
              Rätt ordning!
            </p>
            <p className="text-sm text-emerald-900 leading-relaxed">
              {exercise.structureExplanation}
            </p>
          </div>
        )}

        {isOrderCorrect && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">
              Steg 2: Vilken texttyp är det?
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Välj det alternativ som bäst beskriver textens syfte och typiska drag.
            </p>

            <div className="space-y-2">
              {exercise.typeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  disabled={isTypeCorrect}
                  onClick={() => {
                    setSelectedTypes((prev) => ({ ...prev, [id]: option }));
                    setTypeChecked((prev) => ({ ...prev, [id]: false }));
                  }}
                  className={`w-full rounded-xl border p-4 text-left text-sm font-semibold ${
                    selectedTypes[id] === option
                      ? "border-violet-500 bg-violet-50 text-violet-900"
                      : "border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {selectedTypes[id] === option ? "◉ " : "○ "}
                  {option}
                </button>
              ))}
            </div>

            {!isTypeCorrect && (
              <button
                type="button"
                disabled={!selectedTypes[id]}
                onClick={() =>
                  setTypeChecked((prev) => ({ ...prev, [id]: true }))
                }
                className="w-full mt-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-3 disabled:opacity-40"
              >
                Kontrollera texttypen
              </button>
            )}

            {typeChecked[id] && (
              <div
                role="status"
                className={`mt-4 rounded-xl border p-4 ${
                  isTypeCorrect
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <p className="font-bold mb-2">
                  {isTypeCorrect
                    ? `Rätt svar: ${exercise.correctType}!`
                    : "Försök igen!"}
                </p>
                <p className="text-sm leading-relaxed">
                  {isTypeCorrect
                    ? exercise.typeExplanation
                    : "Fundera på textens syfte och hur innehållet är uppbyggt. Välj ett annat alternativ."}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetExercise}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Börja om
          </button>

          {exerciseIndex < exercises.length - 1 && (
            <button
              type="button"
              onClick={() => {
                setExerciseIndex((prev) => prev + 1);
                setDraggedId(null);
              }}
              className="flex-1 rounded-xl bg-slate-900 text-white font-bold px-4 py-3 hover:bg-slate-800"
            >
              Nästa text →
            </button>
          )}

          <button
            type="button"
            onClick={resetAll}
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
          >
            Börja om alla
          </button>
        </div>
      </div>
    </section>
  );
}