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
      introduction: "Lär dig att läsa mellan raderna och bygga välutvecklade svar.",

      activities: [
        // 1. CharacterCards
        {
          id: "resonemang-character-cards",
          type: "character-cards",
          title: "Studera olika typer av läsprocesser",
          content: {
            cards: [
              {
                id: "card-1",
                title: "Personlighet och handlingar",
                description: "Vad en karaktär gör avslöjar ofta mer än vad som står rakt ut.",
                examples: ["Säger förlåt → Ångerfull", "Delar med sig → Generös"]
              },
              {
                id: "card-2",
                title: "Inre tankar och känslor",
                description: "Lägg märke till hur en karaktär reagerar i svåra situationer.",
                examples: ["Hjärtat slår snabbt → Nervös/Rädd"]
              }
            ]
          }
        },
        // 2. UnderstandQuestion
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
        },
        // 3. ReadingSkillCards
        {
          id: "resonemang-reading-skills",
          type: "reading-skill-cards",
          title: "Lässtrategier för resonemang",
          instructions: "Repetera verktygen du använder för att koppla ihop textens ledtrådar.",
          content: {
            skills: [
              {
                title: "Hitta belägg",
                description: "Sök alltid efter citat eller konkreta exempel i texten som stöder ditt svar."
              },
              {
                title: "Koppla till egna erfarenheter",
                description: "Jämför karaktärens situation med vad du själv eller andra varit med om."
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
      introduction: "Träna på att föra underbyggda resonemang med stöd av din AI-lärare.",

      activities: [
        {
          id: "resonemang-practice-log",
          type: "writing-log-practice",
          title: "Träna på att föra resonemang om texten",
          instructions: "Edda vägleder dig och talar om vad du kan förbättra.",
          content: {
            prompt: "Varför reagerade personen som hen gjorde när brevet anlände?",
            placeholder: "Skriv ditt resonerande svar här..."
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
          id: "resonemang-diagnosis-text",
          type: "diagnostic-text",
          title: "Diagnos – Resonemang",
          content: {
            textData: {
              title: "SIMTÄVLINGEN",
              image: "/images/simtavling.jpg",
              text: `Linn hade tränat inför simtävlingen i fyra månader. Kvällen innan stod väskan packad vid dörren. På morgonen åt hon ingen frukost, fast mamma tjatade.

I omklädningsrummet satt hon längst in i hörnet med hörlurarna på och stirrade på sina händer. Hon försökte fokusera på musikens taktslag, men tankarna flög hela tiden i väg till startpallen och det kalla vattnet.

När startskottet slutligen ljöd var hon ändå först i vattnet. All tvekan försvann och ersattes av de invanda rörelserna hon tränat på så länge. När hon slog i kanten efter sista längden och såg upp mot resultattavlan insåg hon att hon hade sänkt sitt personliga rekord med två sekunder.`,
            },
            questions: [
              {
                id: 1,
                type: "multiple",
                question: "1. Hur länge hade Linn tränat inför tävlingen enligt texten?",
                options: ["I fyra veckor", "I fyra månader", "I två månader"],
                correct: 1,
              },
              {
                id: 2,
                type: "multiple",
                question: "2. Vad gör Linn i omklädningsrummet för att hantera situationen?",
                options: [
                  "Hon pratar och skrattar med sina lagkamrater.",
                  "Hon sitter ensam med hörlurar på och lyssnar på musik.",
                  "Hon ber sin mamma om hjälp med simglasögonen.",
                ],
                correct: 1,
              },
              {
                id: 3,
                type: "open",
                question:
                  "3. Resonerande fråga: Hur märks det i texten att Linn är nervös, utan att ordet 'nervös' skrivs ut? Motivera med stöd från texten.",
              },
              {
                id: 4,
                type: "open",
                question:
                  "4. Resonerande fråga: Vilken inställning har Linn till simningen och sin träning? Använd flera delar av texten för att förklara ditt svar.",
              },
            ],
          }
        }
      ]
    }
  }
};