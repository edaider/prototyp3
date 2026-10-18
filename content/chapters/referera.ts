import type { ChapterConfig } from "../types";

export const referera: ChapterConfig = {
  id: "referera-och-citera",
  title: "Referera och citera",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction:
        "Lär dig att återge andras kunskap och texter med egna ord, korrekt källhänvisning och citat.",

      activities: [
        // 1. EddaVideoIntro
        {
          id: "referera-edda-video",
          type: "edda-video-intro",
          title: "Lyssna på vad Edda har att lära dig om att referera och citera",
          props: {
            videoSrc: "/videos/lessonplaceholder.mp4",
            title: "Lyssna på vad Edda har att lära dig",
          },
        },
        // 2. CitationFlipCards
        {
          id: "referera-citation-flip-cards",
          type: "citation-flip-cards",
          title: "Källhänvisning & citatregler",
          instructions: "",
        },
        // 3. CitationTutorExercise
        {
          id: "referera-citation-tutor-exercise",
          type: "citation-tutor-exercise",
          title: "Känn igen ett korrekt citat och referat",
          instructions: "",
        },
      ],
    },

    // BIBLIOTEKET – TRÄNA
    practice: {
      title: "Biblioteket",
      backgroundImage: "/images/bibliotek.jpeg",
      backgroundVideo: "/videos/biblioteket.mp4",
      introduction:
        "Träna på att skriva ett eget referat med källhänvisning och citat med stöd av Edda.",

      activities: [
        {
          id: "referera-practice-report",
          type: "writing-log-practise-report",
          title: "Skriv ett referat med källhänvisning",
          props: {
            author: "Karin Lindström",
            year: "2023",
            source: "Ungdomsnoveller & Berättelser",
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
        "Visa din förmåga att på egen hand skriva ett referat med korrekt källhänvisning.",

      activities: [
        {
          id: "referera-diagnosis-report",
          type: "diagnostic-report",
          title: "Diagnos – Referera och citera",
        },
      ],
    },
  },
};