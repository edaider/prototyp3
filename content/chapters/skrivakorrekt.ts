import type { ChapterConfig } from "../types";

export const skrivakorrekt: ChapterConfig = {
  id: "skriva-korrekt",
  title: "Skriva korrekt",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction:
        "Lär dig språkliga normer, skrivregler, meningsbyggnad och textbindning för att skriva tydliga och strukturerade texter.",

      activities: [
        // 1. EddaVideoIntro
        {
          id: "skrivakorrekt-video-intro",
          type: "edda-video-intro",
          title: "Introduktion: Skriva korrekt",
          instructions:
            "Titta på videon där Edda förklarar vikten av skrivregler, textbindning och språklig variation.",
          content: {
            videoSrc: "/videos/lessonplaceholder.mp4",
            caption: "Lär dig grunderna i att skriva korrekt",
          },
        },
        // 2. CorrectText (Mysteriet i Skrivboken)
        {
          id: "skrivakorrekt-correct-text",
          type: "correct-text",
          title: "Mysteriet i Skrivboken",
          instructions:
            "Studera den felaktiga texten och tabellen över de 5 språkliga områdena för att se hur texten kan rättas.",
          content: {
            title: "Mysteriet i Skrivboken – Hitta och rätta felet",
            instructions:
              "Läs den felaktiga texten nedan. Studera sedan tabellen för att förstå vilka språkliga fel som gjorts och hur de kan rättas.",
          },
        },
      ],
    },

    // BIBLIOTEKET – TRÄNA
    practice: {
      title: "Biblioteket",
      backgroundImage: "/images/bibliotek.jpeg",
      backgroundVideo: "/videos/biblioteket.mp4",
      introduction:
        "Träna på att skriva och bearbeta en novell med hjälp av skrivprocessen, checklistan och återkoppling från Edda.",

      activities: [
        // WritingLogPractiseCorrect
        {
          id: "skrivakorrekt-practice-log",
          type: "writing-log-practise-correct",
          title: "Träna på att skriva och bearbeta en novell",
          instructions: "",
          content: {
            question:
              "Skriv en spännande novell där du tillämpar goda skrivregler, gestaltande beskrivningar och en tydlig röd tråd.",
            initialText:
              "Det var en gång en person som gick ut i skogen. Skogen var mörk och mystisk. Personen hörde ett ljud bakom ett träd. Det var en skugga som rörde sig. Personen blev rädd och sprang därifrån så fort som möjligt.",
            imageSrc: "/images/skonlitteratur.png",
            imageAlt: "Skriva novell och berättande text",
          },
        },
      ],
    },

    // FÄNGELSEHÅLAN – DIAGNOS
    diagnosis: {
      title: "Fängelsehålan",
      backgroundImage: "/images/fängelsehåla.jpeg",
      backgroundVideo: "/videos/fangelsehalan.mp4",
      introduction:
        "Visa din förmåga att skriva korrekt och strukturera en novell helt på egen hand utan stöd.",

      activities: [
        // DiagnosticCorrect
        {
          id: "skrivakorrekt-diagnostic",
          type: "diagnostic-correct",
          title: "Diagnos – Skriva korrekt",
          content: {
            textData: {
              title: "SKRIVA NOVELL",
              image: "/images/skonlitteratur.png",
              text: `I denna diagnos ska du visa din förmåga att skriva och bearbeta en berättande text på egen hand.\n\nAnvänd dina kunskaper om skrivregler, meningsbyggnad, textbindning, språklig variation och språkliga normer för att skapa en välstrukturerad och fängslande novell.`,
            },
          },
        },
      ],
    },
  },
};

export default skrivakorrekt;