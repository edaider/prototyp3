import type { ChapterConfig } from "../types";

export const sammanfattningChapter: ChapterConfig = {
  id: "sammanfatta",
  title: "Att skriva en sammanfattning",
  description: "Lär dig kännetecknen och stegen för att göra en bra sammanfattning.",
  rooms: {
    study: {
      title: "Studera: Vad är en sammanfattning?",
      description: "Gå igenom reglerna, se videon och testa ditt minne på tid.",
      activities: [
        {
          id: "summary-video",
          type: "edda-video-intro",
          title: "1. Vad är typiskt för en sammanfattning?",
          instructions: "Se videon för en genomgång.",
          props: {
            title: "Vad är typiskt för en sammanfattning?",
            videoSrc: "/videos/sammanfattning.mp4",
          },
        },
        {
          id: "summary-flipcards",
          type: "summary-flip-cards",
          title: "Sammanfatta i fyra steg",
          instructions: "Klicka på korten för att se vilka steg du ska ta.",
          props: {
            cards: [
              {
                id: "typiskt",
                title: "Vad är typiskt för en sammanfattning?",
                content: [
                  "En sammanfattning är kortare än originaltexten",
                  "Syftet är att återge det viktigaste i texten",
                  "Man skriver sammanfattningen med egna ord",
                  "Man lägger inte till några egna åsikter",
                  "Det viktigaste är att den som läser förstår innehållet",
                  "Skriv bara så att du själv förstår, d.v.s. använda egna ord",
                ],
              },
              {
                id: "steg",
                title: "Gör så här! (5 steg)",
                content: [
                  "1. Läs texten noga och flera gånger",
                  "2. Stryk under den information som du tycker är viktigast",
                  "3. Skriv ner det du har strukit under som stödord på ett papper",
                  "4. Prova att återberätta texten muntligt med hjälp av stödorden",
                  "5. Skriv ner en text med hjälp av stödorden med egna ord",
                ],
              },
            ],
          },
        },
        {
          id: "summary-timed-memory",
          type: "timed-text-memory",
          title: "Samarbeta med Edda för att skriva en sammanfattning",
          props: {
            timerSeconds: 15,
            summaryPoints: [
              "Jordens torraste områden",
              "Nära vändkretsarna",
              "Regnar lite och bara en kort tid",
              "Vissa år inget regn alls",
              "55 grader på dagen, minusgrader på natten",
            ],
            words: [
              { text: "Öknarna", isKeyWord: true },
              { text: "är", isKeyWord: false },
              { text: "jordens", isKeyWord: false },
              { text: "torraste", isKeyWord: true },
              { text: "områden", isKeyWord: true },
              { text: "och", isKeyWord: false },
              { text: "finns", isKeyWord: false },
              { text: "i", isKeyWord: false },
              { text: "högtrycksområdena", isKeyWord: false },
              { text: "nära", isKeyWord: true },
              { text: "vändkretsarna.", isKeyWord: true },
              { text: "I", isKeyWord: false },
              { text: "en", isKeyWord: false },
              { text: "öken", isKeyWord: false },
              { text: "regnar", isKeyWord: true },
              { text: "det", isKeyWord: false },
              { text: "sällan", isKeyWord: false },
              { text: "mer", isKeyWord: false },
              { text: "än", isKeyWord: false },
              { text: "250", isKeyWord: false },
              { text: "mm/år,", isKeyWord: false },
              { text: "oftast", isKeyWord: false },
              { text: "koncentrerat", isKeyWord: false },
              { text: "till", isKeyWord: false },
              { text: "en", isKeyWord: false },
              { text: "mycket", isKeyWord: false },
              { text: "kort", isKeyWord: true },
              { text: "regntid.", isKeyWord: true },
            ],
          },
        },
      ],
    },
    practice: {
      title: "Träna: Skriv med AI-stöd",
      description: "Skriv en sammanfattning och få direktfeedback från din AI-tutor.",
      activities: [
        {
          id: "summary-writing-practice",
          type: "summary-writing-practice",
          title: "Träna på att sammanfatta texten",
          instructions: "Edda vägleder dig och talar om vad du kan förbättra.",
          props: {
            question: "Skriv en kort sammanfattning av texten om Linn med dina egna ord.",
          },
        },
      ],
    },
    diagnosis: {
      title: "Diagnos: Sammanfatta själv",
      description: "Visa att du kan sammanfatta helt utan hjälpmedel.",
      activities: [
        {
          id: "summary-diagnosis",
          type: "summary-diagnosis",
          title: "Slutdiagnos: Sammanfatta utan stöd",
          props: {},
        },
      ],
    },
  },
};