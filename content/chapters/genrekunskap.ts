import type { ChapterConfig } from "../types";

export const genrekunskap: ChapterConfig = {
  id: "texttyper",
  title: "Känna igen texttyper",
  subtitle: "Upptäck hur olika texter är uppbyggda och vad som kännetecknar dem",

  rooms: {
    // STUDERA: TextTypesCards och RecognizeCards
    study: {
      title: "Studera – Lär känna texttyperna",
      description:
        "Lär dig känna igen typiska textdrag i skönlitteratur, sakprosa och multimodala texter.",

      activities: [
        {
          id: "text-types-cards-study",
          type: "text-types-cards",
          title: "Lär känna texttyperna",
        },
        {
          id: "recognize-cards-study",
          type: "recognize-cards",
          title: "Känn igen texttypen",
        },
      ],
    },

    // TRÄNA: TextOrderExercise
    practice: {
      title: "Träna – Känn igen textens kännetecken",
      description:
        "Öva på att identifiera texttyper och motivera dina val med hjälp av textens innehåll, struktur och uttryckssätt.",

      activities: [
        {
          id: "text-order-exercise-practice",
          type: "text-order-exercise",
          title: "Lägg texten i rätt ordning",
          props: {
            exercises: [
              {
                id: "novell-1",
                title: "Ett oväntat möte",
                instruction:
                  "Dra textdelarna till rätt ordning. Identifiera sedan texttypen.",
                parts: [
                  {
                    id: "novell-a",
                    text: "När hon vände sig om stod en pojke i dörröppningen. Hon kände genast igen honom, trots att det hade gått tio år.",
                  },
                  {
                    id: "novell-b",
                    text: "Regnet slag mot busskurens tak när Elin upptäckte det gamla fotografiet på marken.",
                  },
                  {
                    id: "novell-c",
                    text: "Hon stoppade fotografiet i fickan och gick mot huset där hon hade vuxit upp. För första gången på länge kände hon sig redo att knacka på.",
                  },
                  {
                    id: "novell-d",
                    text: "På bilden stod hon bredvid sin bästa vän, som hade flyttat utan att säga adjö när de var barn.",
                  },
                ],
                correctOrder: [
                  "novell-b",
                  "novell-d",
                  "novell-a",
                  "novell-c",
                ],
                typeOptions: [
                  "Skönlitteratur",
                  "Sakprosa",
                  "Multimodal text",
                ],
                correctType: "Skönlitteratur",
                typeExplanation:
                  "Texten är skönlitteratur eftersom den skildrar personer, miljö och händelser och bygger upp en berättelse.",
                structureExplanation:
                  "Texten börjar med att en situation presenteras, utvecklar en ledtråd från det förflutna och för berättelsen vidare mot ett möjligt möte.",
              },
              {
                id: "argumenterande-1",
                title: "Mobilfria lektioner",
                instruction:
                  "Ordna argumentationen och välj sedan den övergripande texttypen.",
                parts: [
                  {
                    id: "arg-a",
                    text: "Därför bör skolor införa mobilfria lektioner och samtidigt erbjuda tydliga regler för när mobiler får användas.",
                  },
                  {
                    id: "arg-b",
                    text: "Skolor bör införa mobilfria lektioner för att ge eleverna bättre studiero.",
                  },
                  {
                    id: "arg-c",
                    text: "För det första kan notiser och meddelanden störa koncentrationen. För det andra blir det lättare att delta i diskussioner när eleverna riktar uppmärksamheten mot undervisningen.",
                  },
                  {
                    id: "arg-d",
                    text: "Vissa menar att mobilen behövs för att snabbt kunna söka information. Men läraren kan planera in tillfällen då digitala verktyg faktiskt behövs.",
                  },
                ],
                correctOrder: ["arg-b", "arg-c", "arg-d", "arg-a"],
                typeOptions: [
                  "Skönlitteratur",
                  "Sakprosa",
                  "Multimodal text",
                ],
                correctType: "Sakprosa",
                typeExplanation:
                  "Texten är sakprosa i form av en argumenterande text. Den presenterar en åsikt, utvecklar argument, bemöter en invändning och avslutar med en slutsats.",
                structureExplanation:
                  "En argumenterande text presenterar ofta tesen först, följer upp med argument och eventuella motargument och avslutar med en slutsats eller uppmaning.",
              },
              {
                id: "utredande-1",
                title: "Varför behöver vi sömn?",
                instruction:
                  "Ordna textdelarna så att resonemanget blir sammanhängande. Välj sedan texttyp.",
                parts: [
                  {
                    id: "utred-a",
                    text: "Sammantaget påverkar sömnen både kroppens återhämtning och hjärnans förmåga att fungera. Hur mycket sömn en person behöver kan däremot variera med bland annat ålder och individuella förutsättningar.",
                  },
                  {
                    id: "utred-b",
                    text: "Sömn är viktig för människans hälsa, men vad händer egentligen när vi sover?",
                  },
                  {
                    id: "utred-c",
                    text: "Under sömnen får kroppen möjlighet att återhämta sig. Samtidigt bearbetar hjärnan information och minnen från dagen.",
                  },
                  {
                    id: "utred-d",
                    text: "Sömnbrist kan göra det svårare att koncentrera sig och lära sig nya saker. Effekterna kan dock skilja sig åt beroende på hur mycket och hur länge en person har sovit för lite.",
                  },
                ],
                correctOrder: ["utred-b", "utred-c", "utred-d", "utred-a"],
                typeOptions: [
                  "Skönlitteratur",
                  "Sakprosa",
                  "Multimodal text",
                ],
                correctType: "Sakprosa",
                typeExplanation:
                  "Texten är sakprosa och har en utredande karaktär. Den undersöker en fråga, presenterar fakta och förklaringar och sammanfattar olika aspekter.",
                structureExplanation:
                  "En utredande text introducerar en fråga, undersöker den ur relevanta perspektiv och avslutar med en sammanfattning av vad informationen visar.",
              },
            ],
          },
        },
      ],
    },

    // DIAGNOS: TextTypeDiagnosis
    diagnosis: {
      title: "Diagnos – Visa vad du kan",
      description:
        "Läs eller undersök varje exempel och identifiera om det är skönlitteratur, sakprosa eller en multimodal text.",

      activities: [
        {
          id: "text-types-diagnosis",
          type: "diagnostic-text",
          title: "Vilken texttyp är det?",
          instructions:
            "Läs texten och välj om den är skönlitteratur, sakprosa eller multimodal text.",
        },
      ],
    },
  },
};