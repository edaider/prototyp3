import type { ChapterConfig } from "../types";

export const mottext: ChapterConfig = {
  id: "mota-en-text",
  title: "Möta en text",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction:
        "Här lär du dig grundläggande lästeknik för att ta dig an och förstå en ny text.",

      activities: [
        {
          id: "mota-text-edda-video",
          type: "edda-video-intro",
          title: "Lyssna på vad Edda har att lära dig om lästeknik",
          props: {
            videoSrc: "/videos/lästeknik.mp4",
            title: "Lyssna på vad Edda har att lära dig",
          },
        },
        {
          id: "mota-text-technique",
          type: "reading-technique",
          title: "Prova nu att läsa texten själv",
          instructions:
            "Följ med i texten och se hur du stegvis stannar upp för att titta, skapa inre bilder och red ut svåra ord.",
          content: {
            title: "Simtävlingen",
            category: "Lästeknik",
            paragraphs: [
              "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.",
              "I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer.",
              "Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder."
            ],
            steps: [
              {
                id: 1,
                label: "Titta",
                text: "Titta på rubriken och fundera på vad texten kan handla om."
              },
              {
                id: 2,
                label: "Skapa en bild",
                text: "Skapa en inre bild av hur Linn sitter fokuserad i omklädningsrummet.",
                image: true
              },
              {
                id: 3,
                label: "Skumläsa",
                text: "simtävlingen · startskottet · personliga rekord"
              },
              {
                id: 4,
                label: "Red ut",
                text: "Personligt rekord betyder den bästa tid hon någonsin klarat tidigare."
              }
            ]
          }
        },
        {
          id: "mota-text-between-lines",
          type: "reading-strategies",
          title: "Testa om du kan läsa på eller mellan raderna",
          content: {
            imageSrc: "/images/mellanraderna.png",
            excerpt: "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.",
            leftQuestion: {
              title: "Hur länge har Linn tränat?",
              badge: "Läs på raderna",
              options: [
                { id: 1, text: "1. I sex månader", isCorrect: false },
                { id: 2, text: "2. I fyra månader", isCorrect: true }
              ],
              correctFeedback: "Rätt! Svaret står direkt utskrivet i texten: '...i fyra månader.'",
              incorrectFeedback: "Inte riktigt. Titta i texten igen – där står 'i fyra månader'."
            },
            rightQuestion: {
              title: "Hur tror du hon känner sig innan tävlingen?",
              badge: "Läs mellan raderna",
              options: [
                { id: 1, text: "1. Lugn", isCorrect: false },
                { id: 2, text: "2. Nervös", isCorrect: true }
              ],
              correctFeedback: "Exakt! Det står inte rakt ut, men att hon packat väskan noga och inte kan äta frukost visar att hon är nervös.",
              incorrectFeedback: "Tänk efter: Om man inte kan äta frukost för att det tar emot i magen, är man lugn då?"
            }
          }
        }
      ]
    },

    // BIBLIOTEKET – TRÄNA
    practice: {
      title: "Biblioteket",
      backgroundImage: "/images/bibliotek.jpeg",
      backgroundVideo: "/videos/biblioteket.mp4",
      introduction:
        "Träna på din läsförståelse genom att besvara frågor och använda verktygen för uppläsning och ordförklaringar.",

      activities: [
        {
          id: "mota-text-comprehension",
          type: "reading-comprehension",
          title: "Läsförståelse – Simtävlingen",
          instructions:
            "Läs texten om Linn och svara på frågorna. Klicka på ord om du behöver förklaringar.",
          content: {
            title: "Simtävlingen",
            category: "Lästeknik",
            paragraphs: [
              "Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.",
              "I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer.",
              "Men när startskottet ljöd var hon ändå först i vattnet, och när hon slog i kanten efter sista längden hade hon sänkt sitt personliga rekord med två sekunder."
            ],
            thoughtSteps: [
              { id: 1, label: "Titta", text: "Titta på rubriken och fundera på vad texten handlar om.", target: "title" },
              { id: 2, label: "Skapa en bild", text: "Se framför dig hur Linn sitter i omklädningsrummet och laddar.", target: "inner_image", image: true },
              { id: 3, label: "Skumläs", text: "Låt blicken hitta orden: simtävlingen · startskottet · personliga rekord", target: "keywords" },
              { id: 4, label: "Lässtrategi", text: "Svaret står på raderna eller kan listas ut mellan raderna.", target: "strategy" },
              { id: 5, label: "Red ut", text: "Klicka på ord som 'personliga rekord' om du vill ha en förklaring.", target: "clickable" }
            ],
            questions: [
              {
                id: "q1",
                question: "Hur länge hade Linn tränat inför simtävlingen?",
                options: [
                  { id: "a", text: "I två veckor" },
                  { id: "b", text: "I fyra månader" },
                  { id: "c", text: "I ett helt år" }
                ],
                correctOptionId: "b",
                answerParagraphIndex: 0,
                strategyType: "on_lines"
              },
              {
                id: "q2",
                question: "Vad gjorde Linn i omklädningsrummet innan tävlingen?",
                options: [
                  { id: "a", text: "Hon pratade med sin tränare" },
                  { id: "b", text: "Hon åt en stor frukost" },
                  { id: "c", text: "Hon satt i hörnet med hörlurar på och stirrade på sina händer" }
                ],
                correctOptionId: "c",
                answerParagraphIndex: 1,
                strategyType: "on_lines"
              },
              {
                id: "q3",
                question: "Hur kände sig Linn sannolikt i omklädningsrummet?",
                options: [
                  { id: "a", text: "Nervös och fokuserad" },
                  { id: "b", text: "Utråkad och trött" },
                  { id: "c", text: "Arg på sin mamma" }
                ],
                correctOptionId: "a",
                answerParagraphIndex: 1,
                strategyType: "between_lines"
              }
            ]
          }
        }
      ]
    },

    // FÄNGELSEHÅLAN – DIAGNOS
    diagnosis: {
      title: "Fängelsehålan",
      backgroundImage: "/images/fängelsehåla.jpeg",
      backgroundVideo: "/videos/fängelsehålan.mp4",
      introduction:
        "Visa vad du har lärt dig om lästeknikens steg utan hjälpmedel eller AI.",

      activities: [
        {
          id: "mota-text-quiz",
          type: "quiz",
          title: "Diagnos: Lästeknikens steg",
          instructions: "Testa dina kunskaper om lästeknikens 4 steg.",
          content: {
            questions: [
              {
                id: "step1",
                question: "Vad är det första du ska göra när du möter en helt ny text?",
                options: [
                  "Slå upp alla svåra ord i en ordbok",
                  "Titta på rubriken och bilderna för att förutspå innehållet",
                  "Läsa sista meningen i texten",
                  "Skriva en sammanfattning"
                ],
                correctAnswer: 1,
                explanation: "Rätt! Steg 1 är 'Titta' – du granskar rubrik och bild för att skapa dig en uppfattning om texten."
              },
              {
                id: "step2",
                question: "Vad innebär lästeknikens andra steg: 'Skapa en inre bild'?",
                options: [
                  "Att du ritar en teckning på ett papper bredvid",
                  "Att du ser framför dig vad som händer i texten som en film i huvudet",
                  "Att du fotograferar sidan med mobilen",
                  "Att du blundar och sover"
                ],
                correctAnswer: 1,
                explanation: "Exakt! Genom att visualisera innehållet blir det mycket lättare att förstå och komma ihåg texten."
              },
              {
                id: "step3",
                question: "Vad gör du när du 'skumläser' en text?",
                options: [
                  "Läser varje ord så långsamt du bara kan",
                  "Hoppar över hela texten och gissar svaren",
                  "Låter blicken snabbt glida över texten för att hitta viktiga nyckelord",
                  "Läser bara orden som börjar på bokstaven S"
                ],
                correctAnswer: 2,
                explanation: "Helt rätt! Skumläsning handlar om att snabbt svepa med blicken för att fånga upp nyckelord."
              },
              {
                id: "step4",
                question: "Vad gör du i det fjärde steget: 'Red ut'?",
                options: [
                  "Rätar ut veckade papper",
                  "Stannar upp och tar reda på vad svåra eller nya ord betyder",
                  "Avslutar läsningen direkt",
                  "Frågar en kompis vad klockan är"
                ],
                correctAnswer: 1,
                explanation: "Bra jobbat! Att reda ut oklarheter och svåra ord säkrar att du inte missar viktiga poänger."
              }
            ]
          }
        }
      ]
    }
  }
};