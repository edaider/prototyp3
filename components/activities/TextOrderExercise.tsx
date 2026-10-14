"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, RotateCcw } from "lucide-react";
import { AITutorShell, Message } from "../ai/AITutor"; 

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

// Steg för att leda eleven genom textens delar
const STEP_ROLES = [
  {
    title: "Inledning",
    instruction: "Hjälp mig att hitta INLEDNINGEN! Vilket stycke presenterar situationen, miljön eller ämnet först?",
  },
  {
    title: "Huvuddel – del 1",
    instruction: "Bra! Vilket stycke ska komma sedan för att utveckla handlingen eller argumenten?",
  },
  {
    title: "Huvuddel – del 2",
    instruction: "Snyggt! Vilket stycke bygger vidare på förloppet eller resonemanget härnäst?",
  },
  {
    title: "Avslutning",
    instruction: "Sista pusselbiten! Vilket stycke knyter ihop säcken och utgör AVSLUTNINGEN?",
  },
];

export default function TextOrderExercise({ exercises }: TextOrderExerciseProps) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedPartIds, setSelectedPartIds] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [isTypeCorrect, setIsTypeCorrect] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // AI-tutor chattmeddelanden
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "edda",
      title: "Edda hälsar",
      text: STEP_ROLES[0].instruction,
    },
  ]);

  if (!exercises || exercises.length === 0) return null;

  const currentExercise = exercises[exerciseIndex];
  const totalSteps = currentExercise.correctOrder.length;

  // Hämta vilka delar som redan placerats
  const selectedParts = selectedPartIds
    .map((id) => currentExercise.parts.find((p) => p.id === id))
    .filter((p): p is TextOrderPart => !!p);

  // Hantera klick på ett textstycke
  const handlePartClick = (part: TextOrderPart) => {
    if (isCompleted || selectedPartIds.includes(part.id)) return;

    const targetCorrectId = currentExercise.correctOrder[currentStepIndex];

    if (part.id === targetCorrectId) {
      // RÄTT VAL
      const newSelected = [...selectedPartIds, part.id];
      setSelectedPartIds(newSelected);

      if (currentStepIndex + 1 < totalSteps) {
        const nextStep = currentStepIndex + 1;
        setCurrentStepIndex(nextStep);
        const nextPrompt = STEP_ROLES[nextStep]?.instruction || "Vilket stycke kommer härnäst?";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "user",
            text: `Jag väljer: "${part.text.substring(0, 35)}..."`,
          },
          {
            id: (Date.now() + 1).toString(),
            sender: "edda",
            title: "Klockrent!",
            text: `Rätt tänkt! Det stycket passar perfekt här. Now: ${nextPrompt}`,
          },
        ]);
      } else {
        // Alla delar sorterade -> Gå till texttyp
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "user",
            text: `Jag väljer: "${part.text.substring(0, 35)}..."`,
          },
          {
            id: (Date.now() + 1).toString(),
            sender: "edda",
            title: "Texten är komplett!",
            text: `Härligt! ${currentExercise.structureExplanation} Välj nu vilken texttyp detta är nedan.`,
          },
        ]);
      }
    } else {
      // FEL VAL
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "user",
          text: `Jag väljer: "${part.text.substring(0, 35)}..."`,
        },
        {
          id: (Date.now() + 1).toString(),
          sender: "edda",
          title: "Inte riktigt!",
          text: `Nja, det där stycket hör hemma på en annan plats i strukturen. Tänk på: ${STEP_ROLES[currentStepIndex]?.instruction || "vad som bör komma härnäst."}`,
        },
      ]);
    }
  };

  // Hantera val av texttyp
  const handleTypeSelect = (option: string) => {
    setSelectedType(option);
    if (option === currentExercise.correctType) {
      setIsTypeCorrect(true);
      setIsCompleted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "user",
          text: `Jag tror det är: ${option}`,
        },
        {
          id: (Date.now() + 1).toString(),
          sender: "edda",
          title: "Fantastiskt!",
          text: `Helt rätt! ${currentExercise.typeExplanation}`,
        },
      ]);
    } else {
      setIsTypeCorrect(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "user",
          text: `Jag tror det är: ${option}`,
        },
        {
          id: (Date.now() + 1).toString(),
          sender: "edda",
          title: "Gissa igen",
          text: `Inte riktigt ${option}. Fundera på textens syfte och prova ett annat alternativ!`,
        },
      ]);
    }
  };

  // Hantera meddelande skickat via Edda chatt-rutan
  const handleSendMessage = (userText: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "user",
        text: userText,
      },
      {
        id: (Date.now() + 1).toString(),
        sender: "edda",
        text: `Kika på korten nedan! ${STEP_ROLES[currentStepIndex]?.instruction || "Klicka på det stycke du tror passar bäst."}`,
      },
    ]);
  };

  // Återställ nuvarande övning
  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedPartIds([]);
    setSelectedType("");
    setIsTypeCorrect(null);
    setIsCompleted(false);
    setMessages([
      {
        id: Date.now().toString(),
        sender: "edda",
        title: "Börja om",
        text: STEP_ROLES[0].instruction,
      },
    ]);
  };

  // Byt övning
  const handleNextExercise = () => {
    const nextIndex = (exerciseIndex + 1) % exercises.length;
    setExerciseIndex(nextIndex);
    setCurrentStepIndex(0);
    setSelectedPartIds([]);
    setSelectedType("");
    setIsTypeCorrect(null);
    setIsCompleted(false);
    setMessages([
      {
        id: Date.now().toString(),
        sender: "edda",
        title: `Övning: ${exercises[nextIndex].title}`,
        text: STEP_ROLES[0].instruction,
      },
    ]);
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* HEADER & EDDA-TUTOR INTEGRATION HÖGST UPP */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border-2 border-amber-900/20 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 p-5 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>Övning {exerciseIndex + 1} av {exercises.length}: {currentExercise.title}</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-stone-800 leading-relaxed">
            "{messages[messages.length - 1]?.text || STEP_ROLES[currentStepIndex]?.instruction}"
          </p>
        </div>

        {/* AI Tutor Komponent i hörnet */}
        <div className="flex-shrink-0 self-end sm:self-center">
          <AITutorShell
            messages={messages}
            onSendMessage={handleSendMessage}
            subtitle="Din textguide"
          />
        </div>
      </div>

      {/* FLIKAR FÖR FLERA ÖVNINGAR */}
      {exercises.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {exercises.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setExerciseIndex(idx);
                setCurrentStepIndex(0);
                setSelectedPartIds([]);
                setSelectedType("");
                setIsTypeCorrect(null);
                setIsCompleted(false);
                setMessages([
                  {
                    id: Date.now().toString(),
                    sender: "edda",
                    title: item.title,
                    text: STEP_ROLES[0].instruction,
                  },
                ]);
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                idx === exerciseIndex
                  ? "bg-amber-800 text-amber-50"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {idx + 1}. {item.title}
            </button>
          ))}
        </div>
      )}

      {/* BYGGD TEXT (VISAS EFTER HAND SOM ELEVEN KLICKAR RÄTT) */}
      {selectedParts.length > 0 && (
        <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Byggd text i rätt ordning ({selectedParts.length} av {totalSteps}):</span>
          </h4>
          <div className="space-y-2">
            {selectedParts.map((part, index) => (
              <div
                key={part.id}
                className="rounded-xl border border-emerald-200 bg-white p-3.5 text-sm text-stone-800 shadow-xs flex gap-3 items-start animate-fade-in"
              >
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                  {index + 1}
                </span>
                <p className="leading-relaxed">{part.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEG 1: OSORTERADE KORT ATT KLICKA PÅ */}
      {selectedParts.length < totalSteps && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Klicka på det stycke som passar in på Eddas instruktion:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentExercise.parts.map((part) => {
              const isUsed = selectedPartIds.includes(part.id);
              if (isUsed) return null;

              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => handlePartClick(part)}
                  className="w-full text-left rounded-2xl border-2 border-stone-200 bg-white p-5 text-sm sm:text-base text-stone-800 transition-all hover:border-amber-500 hover:bg-amber-50/30 hover:shadow-md active:scale-[0.99] flex flex-col justify-between"
                >
                  <p className="leading-relaxed">{part.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    Välj detta stycke
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEG 2: VÄLJ TEXTTYP EFTER ATT ORDNINGEN ÄR KLAR */}
      {selectedParts.length === totalSteps && (
        <div className="rounded-2xl border-2 border-amber-200 bg-white p-5 space-y-4">
          <h4 className="text-base font-bold text-stone-900">
            Steg 2: Vilken texttyp har vi pusslat ihop?
          </h4>
          <p className="text-sm text-stone-600">
            Läs hela texten ovan och välj den texttyp som stämmer bäst:
          </p>

          <div className="space-y-2">
            {currentExercise.typeOptions.map((option) => (
              <button
                key={option}
                type="button"
                disabled={isCompleted}
                onClick={() => handleTypeSelect(option)}
                className={`w-full rounded-xl border p-4 text-left text-sm font-semibold transition-colors ${
                  selectedType === option
                    ? isTypeCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-amber-500 bg-amber-50 text-amber-900"
                    : "border-stone-200 hover:bg-stone-50 text-stone-800"
                }`}
              >
                {selectedType === option ? "◉ " : "○ "}
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AVSLUTNINGSKORT & ÅTERSTÄLLNING */}
      {isCompleted && (
        <div className="flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center gap-3">
          <h3 className="text-xl font-bold text-emerald-900">Bra jobbat!</h3>
          <p className="text-sm text-emerald-800 max-w-md">
            Du och Edda har framgångsrikt ordnat texten och identifierat rätt texttyp!
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-bold text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Gör om denna</span>
            </button>
            {exercises.length > 1 && (
              <button
                type="button"
                onClick={handleNextExercise}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-5 py-2.5 text-sm font-bold text-amber-50 hover:bg-amber-900 transition-colors"
              >
                <span>Nästa text →</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}