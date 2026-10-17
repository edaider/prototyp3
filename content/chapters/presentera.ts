import type { ChapterConfig } from "../types";

export const presentera: ChapterConfig = {
  id: "framfora-muntligt",
  title: "Presentera muntligt",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction: "Lär dig hur du strukturerar en presentation och använder retoriska grepp för att nå ut till dina lyssnare.",

      activities: [
        // 1. EddaVideoIntro
        {
          id: "presentera-video-intro",
          type: "edda-video-intro",
          title: "Introduktion: Att hålla en presentation",
          instructions: "Titta på videon där Edda förklarar hur du förbereder och genomför en muntlig presentation.",
          content: {
            videoSrc: "/videos/presentera.mp4",
            caption: "Grunderna i muntlig framställning och retorik",
          },
        },
        // 2. PresentationWordsExplained (Retoriska begrepp)
        {
          id: "presentera-words-explained",
          type: "presentation-words-explained",
          title: "Retoriska begrepp & stilfigurer",
          instructions: "Klicka på korten för att utforska stilfigurer som gör ditt framförande fängslande.",
          content: {
            categories: ["Alla", "Stilfigurer & Retorik", "Bildspråk"],
            terms: [
              {
                id: "anafor",
                term: "Anafor",
                category: "Stilfigurer & Retorik",
                definition: "När man upprepar ett eller flera ord i början av flera meningar efter varandra för att skapa rytm och förstärka budskapet.",
                example: '"Jag har en dröm... Jag har en dröm om att en dag..."',
              },
              {
                id: "hyperbol",
                term: "Hyperbol",
                category: "Stilfigurer & Retorik",
                definition: "En medveten och kraftig överdrift för att göra en poäng extra tydlig eller dramatisk.",
                example: '"Jag har sagt till dig tusen gånger!"',
              },
              {
                id: "litotes",
                term: "Litotes",
                category: "Stilfigurer & Retorik",
                definition: "En medveten underdrift där man uttrycker sig svagare än vad situationen kräver.",
                example: '"Det var inte helt fel" (om något fantastiskt).',
              },
              {
                id: "metafor",
                term: "Metafor",
                category: "Bildspråk",
                definition: "När man jämför två saker utan jämförelseord genom att säga att något ÄR någonting annat.",
                example: '"Du är min solstråle" eller "Han har ett hjärta av sten."',
              },
            ],
          },
        },
      ],
    },

    // BIBLIOTEKET – TRÄNA
    practice: {
      title: "Biblioteket",
      backgroundImage: "/images/bibliotek.jpeg",
      backgroundVideo: "/videos/biblioteket.mp4",
      introduction: "Organisera din sammanfattning till ett köra-klart manus och öva med stödordskort och timer.",

      activities: [
        {
          id: "presentera-oral-practice",
          type: "oral-presentation-prep",
          title: "Förbered din muntliga presentation",
          instructions: "Strukturera din inledning, huvuddel och avslutning samt öva på framförandet.",
          content: {
            title: "Förberedelse inför presentation",
          },
        },
      ],
    },

    // FÄNGELSEHÅLAN – DIAGNOS
    diagnosis: {
      title: "Fängelsehålan",
      backgroundImage: "/images/fängelsehåla.jpeg",
      backgroundVideo: "/videos/fängelsehålan.mp4",
      introduction: "Titta på hela instruktionsfilmen i fullskärm för att slutföra diagnosen.",

      activities: [
        {
          id: "presentera-full-screen-video",
          type: "full-screen-video",
          title: "Diagnos – Presentera underlag",
          content: {
            videoSrc: "/videos/presenteraunderlag.mp4",
            title: "Instruktionsfilm: Presentera underlag",
          },
        },
      ],
    },
  },
};