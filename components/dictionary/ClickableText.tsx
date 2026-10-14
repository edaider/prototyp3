"use client";

import { useMemo, useState } from "react";

type Highlight = {
start: number;
end: number;
};

export type ClickableHighlight = {
start: number;
end: number;
text?: string;
type?: "keyword" | "passage" | "concept" | "title";
explanation?: string;
};

type ClickableTextProps = {
text?: string | null;

/**

En generell markering.
*/
highlight?: Highlight | null;

/**

Flera AI-markeringar.

Används exempelvis när AI:n vill markera

flera svåra ord eller textstycken.
*/
highlights?: ClickableHighlight[];

/**

Klick på ett vanligt ord.
*/
onWordClick?: (word: string) => void;

/**

Klick på en AI-markerad del.
*/
onHighlightClick?: (
highlight: ClickableHighlight,
text: string
) => void;
};

type TextPart = {
text: string;
isWord: boolean;
start: number;
end: number;
};

function isWordCharacter(character: string) {
return /[A-Za-zÅÄÖåäö0-9'-]/.test(character);
}

function splitIntoWords(text: string): TextPart[] {
const parts: TextPart[] = [];

let index = 0;

while (index < text.length) {
const character = text[index];

if (isWordCharacter(character)) {
  const start = index;

  while (
    index < text.length &&
    isWordCharacter(text[index])
  ) {
    index += 1;
  }

  parts.push({
    text: text.slice(start, index),
    isWord: true,
    start,
    end: index,
  });

  continue;
}

const start = index;

while (
  index < text.length &&
  !isWordCharacter(text[index])
) {
  index += 1;
}

parts.push({
  text: text.slice(start, index),
  isWord: false,
  start,
  end: index,
});


}

return parts;
}

function getHighlightClasses(
type?: ClickableHighlight["type"]
) {
switch (type) {
case "concept":
return [
"rounded-sm",
"bg-amber-100",
"text-slate-900",
"border-b-2",
"border-dotted",
"border-amber-400",
"hover:bg-amber-200",
].join(" ");

case "passage":
  return [
    "rounded-md",
    "bg-yellow-100",
    "text-slate-900",
    "box-decoration-clone",
    "hover:bg-yellow-200",
  ].join(" ");

case "title":
  return [
    "rounded-md",
    "bg-amber-200/80",
    "text-slate-900",
  ].join(" ");

case "keyword":
default:
  return [
    "rounded-sm",
    "bg-amber-200/80",
    "text-slate-900",
    "hover:bg-amber-300",
  ].join(" ");


}
}

export default function ClickableText({
text = "",
highlight = null,
highlights = [],
onWordClick,
onHighlightClick,
}: ClickableTextProps) {
const safeText = text ?? "";

const [activeHighlight, setActiveHighlight] =
useState<string | null>(null);

const parts = useMemo(
() => splitIntoWords(safeText),
[safeText]
);

const sortedHighlights = useMemo(
() =>
[...highlights].sort(
(a, b) => a.start - b.start
),
[highlights]
);

const findHighlight = (
start: number,
end: number
) => {
return sortedHighlights.find(
(item) =>
end > item.start &&
start < item.end
);
};

return (
<>
{parts.map((part, index) => {
const aiHighlight = findHighlight(
part.start,
part.end
);

    const isGenericHighlighted =
      highlight !== null &&
      part.end > highlight.start &&
      part.start < highlight.end;

    /*
     * AI-MARKERAD TEXT
     */

    if (aiHighlight) {
      const isActive =
        activeHighlight ===
        `${aiHighlight.start}-${aiHighlight.end}`;

      const highlightedClass =
        getHighlightClasses(
          aiHighlight.type
        );

      const isClickable =
        Boolean(onHighlightClick) ||
        aiHighlight.type === "concept";

      if (isClickable) {
        return (
          <button
            key={`${part.start}-${index}`}
            type="button"
            onClick={() => {
              setActiveHighlight(
                `${aiHighlight.start}-${aiHighlight.end}`
              );

              onHighlightClick?.(
                aiHighlight,
                safeText.slice(
                  aiHighlight.start,
                  aiHighlight.end
                )
              );
            }}
            className={[
              highlightedClass,
              "cursor-pointer",
              "transition-colors",
              "focus:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-amber-400",
              "focus-visible:ring-offset-1",
              isActive
                ? "bg-amber-300"
                : "",
            ].join(" ")}
            title={
              aiHighlight.explanation ??
              "Klicka för att få hjälp."
            }
          >
            {part.text}
          </button>
        );
      }

      return (
        <span
          key={`${part.start}-${index}`}
          className={[
            highlightedClass,
            isActive
              ? "bg-amber-300"
              : "",
          ].join(" ")}
        >
          {part.text}
        </span>
      );
    }

    /*
     * VANLIG TEXT
     */

    if (!part.isWord) {
      return (
        <span
          key={`${part.start}-${index}`}
        >
          {part.text}
        </span>
      );
    }

    /*
     * VANLIG GENERELL MARKERING
     */

    if (isGenericHighlighted) {
      if (!onWordClick) {
        return (
          <span
            key={`${part.start}-${index}`}
            className="rounded-sm bg-indigo-100 text-indigo-900"
          >
            {part.text}
          </span>
        );
      }

      return (
        <button
          key={`${part.start}-${index}`}
          type="button"
          onClick={() =>
            onWordClick(part.text)
          }
          className={[
            "cursor-pointer rounded-sm",
            "bg-indigo-100 text-indigo-900",
            "transition-colors",
            "hover:bg-indigo-200",
            "focus:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-indigo-400",
            "focus-visible:ring-offset-1",
            "underline decoration-indigo-300",
            "decoration-2 underline-offset-4",
          ].join(" ")}
          aria-label={`Förklara ordet ${part.text}`}
        >
          {part.text}
        </button>
      );
    }

    /*
     * VANLIGT KLICKBART ORD
     */

    if (!onWordClick) {
      return (
        <span
          key={`${part.start}-${index}`}
        >
          {part.text}
        </span>
      );
    }

    return (
      <button
        key={`${part.start}-${index}`}
        type="button"
        onClick={() =>
          onWordClick(part.text)
        }
        className={[
          "cursor-pointer rounded-sm",
          "transition-colors",
          "hover:bg-indigo-50",
          "hover:text-indigo-700",
          "focus:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-indigo-400",
          "focus-visible:ring-offset-1",
        ].join(" ")}
        aria-label={`Förklara ordet ${part.text}`}
      >
        {part.text}
      </button>
    );
  })}
</>


);
}