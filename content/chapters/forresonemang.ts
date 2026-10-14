import type { ChapterConfig } from "../types";

export const resonemang: ChapterConfig = {
  id: "fora-resonemang",
  title: "Föra resonemang",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction: "Lär dig att läsa mellan rader och bygga välutvecklade svar.",

      activities: [
        {
          id: "resonemang-abilities",
          type: "reading-strategies",
          title: "Förmågor – Läs på och mellan raderna",
          instructions: "Lär dig skillnaden mellan direkt information och att dra egna slutsatser.",
          content: {
            title: "Läs på eller mellan raderna",
            text: "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.",
            image: "/images/swimming-girl.png",
            questions: [
              {
                title: "Hur länge har Linn tränat?",
                badge: "Läs på raderna",
                description: "Svaret står direkt utskrivet i texten."
              },
              {
                title: "Hur tror du hon känner sig innan tävlingen?",
                badge: "Läs mellan raderna",
                description: "Kräver att du lägger ihop ledtrådar för att lista ut svaret."
              }
            ]
          }
        },
        {
          id: "resonemang-svarsteknik",
          type: "svarsteknik",
          title: "Svarsteknik – Studera frågan och svara exakt",
          instructions: "Lär dig vad som krävs för att nå en 'Fullträff' i ditt resonemang.",
          content: {
            questionText: '"Vilket humör är personen på, och vilket exempel från texten visar det?"',
            breakdown: [
              { label: "1. Vad?", text: "Personens humör" },
              { label: "2. Hur?", text: "Exempel från texten" },
              { label: "3. Krav", text: "Svar + Bevis" }
            ],
            examples: [
              {
                type: "FEL FOKUS",
                studentAnswer: '"Personen ska spela fotboll på idrottslektionen."',
                color: "rose"
              },
              {
                type: "NÄSTAN – NÅGOT SAKNAS",
                studentAnswer: '"Personen är glad."',
                color: "amber"
              },
              {
                type: "FULLTRÄFF",
                studentAnswer: '"Personen är glad och förväntansfull. Det märks eftersom hen har ett leende..."',
                color: "emerald"
              }
            ]
          }
        }
      ]
    },

    // BIBLIOTEKET – TRÄNA
    practice: {
      title: "Biblioteket",
      backgroundImage: "/images/bibliotek.jpeg",
      backgroundVideo: "/videos/biblioteket.mp4",
      introduction: "Träna på att föra underbyggda resonemang.",

      activities: [
        {
          id: "resonemang-practice",
          type: "writing-input",
          title: "Besvara frågan med stöd i texten",
          instructions: "Ge ett svar i två delar: Påstående (Svar) och Belägg (Citat eller exempel från texten).",
          content: {
            placeholder: "Skriv ditt fylliga svar här..."
          }
        }
      ]
    },

    // FÄNGELSEHÅLAN – DIAGNOS
    diagnosis: {
      title: "Fängelsehålan",
      backgroundImage: "/images/fängelsehåla.jpeg",
      backgroundVideo: "/videos/fängelsehålan.mp4",
      introduction: "Visa din förmåga att resonerande svara på frågor helt själv.",

      activities: [
        {
          id: "resonemang-diagnosis",
          type: "writing-input",
          title: "Diagnos – Resonemang",
          instructions: "Besvara den givna frågan. Se till att ha med både ditt svar och bevis från texten.",
          content: {
            placeholder: "Skriv ditt slutgiltiga resonemang..."
          }
        }
      ]
    }
  }
};