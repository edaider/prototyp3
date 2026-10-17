import type { ChapterConfig } from "../types";

export const samtal: ChapterConfig = {
  id: "samtal-och-diskussion",
  title: "Samtal och diskussion",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction:
        "Lär dig strukturen, tipsen och förberedelserna som behövs för att leda och delta i ett givande samtal.",

      activities: [
        // 1. EddaVideoIntro
        {
          id: "samtal-video-intro",
          type: "edda-video-intro",
          title: "Introduktion: Samtal & Diskussion",
          instructions:
            "Titta på videon där Edda förklarar hur du förbereder dig, leder och deltar i en diskussion.",
          content: {
            videoSrc: "/videos/lessonplaceholder.mp4",
            caption: "Lär dig grunderna i att leda och delta i samtal",
          },
        },
        // 2. DiscussionTips
        {
          id: "samtal-discussion-tips",
          type: "discussion-tips",
          title: "Tips för samtal och diskussion",
          instructions:
            "Gå igenom tipsen för att leda, delta i och strukturera din diskussion.",
          content: {
            // Här lägger du eventuell datastruktur om DiscussionTips tar props, 
            // annars renderar komponenten direkt utifrån sina egna data
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
        "Använd kontrollistan för att träna och bocka av alla viktiga moment under eller efter din diskussion.",

      activities: [
        // DiscussionChecklist
        {
          id: "samtal-discussion-checklist",
          type: "discussion-checklist",
          title: "Kontrollista för diskussion",
          instructions:
            "Bocka av punkterna i listan för att säkerställa att du genomför samtalet på ett strukturerat och engagerat sätt.",
          content: {
            // Kontrollistans innehåll kan styras härifrån om du vill ha det dynamiskt
          },
        },
      ],
    },

    // FÄNGELSEHÅLAN – DIAGNOS
    diagnosis: {
      title: "Fängelsehålan",
      backgroundImage: "/images/fängelsehåla.jpeg",
      backgroundVideo: "/videos/fängelsehålan.mp4",
      introduction:
        "Se och analysera exemplet på en genomförd diskussion utan hjälpmedel.",

      activities: [
        // FullScreenVideo
        {
          id: "samtal-fullscreen-video-diagnos",
          type: "fullscreen-video",
          title: "Diagnos – Exempel på diskussion",
          instructions:
            "Studera hur deltagarna i videon leder samtalet, ställer följdfrågor och fördelar ordet.",
          content: {
            videoSrc: "/videos/diskutera.mp4",
            caption: "Spegling och analys av ett strukturerat samtal",
          },
        },
      ],
    },
  },
};

export default samtal;