"use client";

import { useState } from "react";
import { AITutorShell, Message } from "./AITutor";
import { Compass, Lightbulb } from "lucide-react";

type Props = {
  text: string; // Hela lektionstexten
  question?: string; // Den aktuella uppgiftsfrågan
  selectedText?: string; // Om du vill skicka med ett förvalt/markerat ord
};

type TutorAction = "getting_started" | "hint" | "text_explanation";

type ApiResponse = {
  title: string;
  message: string;
  keywords?: string[];
  highlight?: { start: number; end: number } | null;
  image?: { type: string } | null;
  error?: string;
};

export function ReadingStrategyTutor({ text, question = "", selectedText = "" }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "edda",
      title: "Hej!",
      text: "Jag är Edda. Klicka på 'Kom igång' eller 'Få en ledtråd' om du vill ha hjälp med texten!",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [hintStep, setHintStep] = useState(0);
  const [gettingStartedStep, setGettingStartedStep] = useState(0);

  // Anropar din app/api/tutor/route.ts
  async function callTutorApi(
    action: TutorAction,
    overrideStep?: number,
    customSelectedText?: string
  ) {
    if (loading || !text) return;

    setLoading(true);

    const stepToUse =
      overrideStep !== undefined
        ? overrideStep
        : action === "hint"
        ? hintStep
        : action === "getting_started"
        ? gettingStartedStep
        : 0;

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          text,
          question,
          step: stepToUse,
          selectedText: customSelectedText || selectedText,
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kunde inte hämta svar från Edda.");
      }

      // Lägg till Eddas svar i meddelandehistoriken
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "edda",
          title: data.title,
          text: data.message,
        },
      ]);

      // Om din route.ts skickade med keywords (Sökläsning - Steg 3) -> Gulmarkera i texten
      if (data.keywords && data.keywords.length > 0) {
        highlightKeywordsInDocument(data.keywords);
      }

      // Stega framåt för nästa klick
      if (action === "hint") {
        setHintStep((prev) => (prev < 2 ? prev + 1 : 0));
      } else if (action === "getting_started") {
        setGettingStartedStep((prev) => (prev < 3 ? prev + 1 : 0));
      }
    } catch (err) {
      console.error("Tutor Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "edda",
          title: "Hoppsan!",
          text: "Det uppstod ett litet fel när jag skulle hämta hjälp. Försök igen om en stund!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Gulmarkerar ord i dokumentets lektionstext
  function highlightKeywordsInDocument(keywords: string[]) {
    const mainEl = document.querySelector("main") || document.body;

    // Rensa gamla gulmarkeringar
    const oldMarks = mainEl.querySelectorAll(".edda-highlight");
    oldMarks.forEach((mark) => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        parent.normalize();
      }
    });

    // Markera de nya orden
    let html = mainEl.innerHTML;
    keywords.forEach((word) => {
      if (!word) return;
      // Eskapera speciella regex-tecken
      const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`(${escapedWord})`, "gi");
      html = html.replace(
        regex,
        `<mark class="edda-highlight bg-amber-300 text-stone-900 rounded px-1 transition-all animate-pulse">$1</mark>`
      );
    });

    mainEl.innerHTML = html;
  }

  return (
    <AITutorShell
      messages={messages}
      loading={loading}
      subtitle="Din läshandledare"
      onSendMessage={(userQuery) =>
        callTutorApi("text_explanation", 0, userQuery)
      }
      quickActions={
        <>
          {/* Knapp för Kom igång */}
          <button
            type="button"
            disabled={loading}
            onClick={() => callTutorApi("getting_started")}
            className="flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-100/80 px-3 py-1.5 text-xs font-semibold text-amber-950 transition hover:bg-amber-200 disabled:opacity-50"
          >
            <Compass className="h-3.5 w-3.5 text-amber-800" />
            <span>Kom igång</span>
          </button>

          {/* Knapp för Ledtråd */}
          <button
            type="button"
            disabled={loading}
            onClick={() => callTutorApi("hint")}
            className="flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-800 px-3 py-1.5 text-xs font-semibold text-amber-50 transition hover:bg-amber-900 disabled:opacity-50"
          >
            <Lightbulb className="h-3.5 w-3.5 text-yellow-300" />
            <span>Få en ledtråd</span>
          </button>
        </>
      }
    />
  );
}