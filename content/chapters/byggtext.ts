import type { ChapterConfig } from "../types";

export const byggtext: ChapterConfig = {
  id: "bygg-text",
  title: "Bygga en text",

  rooms: {
    // TRONRUMMET – STUDERA
    study: {
      title: "Tronrummet",
      backgroundImage: "/images/tronrum.jpeg",
      backgroundVideo: "/videos/tronsalen.mp4",
      introduction:
        "Lär dig strukturen, begreppen och stilfigurerna som behövs för att bygga en argumenterande text.",

      activities: [
        // 1. EddaVideoIntro
        {
          id: "byggtext-video-intro",
          type: "edda-video-intro",
          title: "Introduktion: Hur man bygger en text",
          instructions:
            "Titta på videon där Edda förklarar hur du strukturerar och bygger en övertygande argumenterande text.",
          content: {
            videoSrc: "/videos/lessonplaceholder.mp4",
            caption: "Lär dig grunderna i argumenterande text",
          },
        },
        // 2. GenreWordsExplained (Litterära begrepp & Stilfigurer)
        {
          id: "byggtext-words-explained",
          type: "genre-words-explained",
          title: "Begrepp & stilfigurer",
          instructions:
            "Klicka på korten för att vända på dem och lära dig centrala begrepp, perspektiv och stilfigurer.",
          content: {
            categories: [
              "Alla",
              "Berättarperspektiv",
              "Språkliga knep & Bildspråk",
              "Textens uppbyggnad & Struktur",
            ],
            terms: [
              {
                id: "forstahandsperspektiv",
                term: "Förstahandsperspektiv",
                category: "Berättarperspektiv",
                definition:
                  'Historien berättas ur huvudpersonens eller en karaktärs egna ögon. Berättaren använder ordet "jag" (eller "vi").',
                example:
                  '"Jag gick nerför gatan och kände hur pulsen ökade."',
              },
              {
                id: "tredjepersonsperspektiv",
                term: "Tredjepersonsperspektiv",
                category: "Berättarperspektiv",
                definition:
                  'Berättaren står utanför handlingen och beskriver karaktärerna som "han", "hon" eller "de".',
                example:
                  '"Hon gick nerför gatan och försökte att inte visa att hon var rädd."',
              },
              {
                id: "allvetande-berattare",
                term: "Allvetande berättare",
                category: "Berättarperspektiv",
                definition:
                  "En variant av tredjepersonsperspektiv där berättaren vet allt om alla karaktärers tankar, känslor och framtid.",
                example:
                  '"Medan Lisa gick var hon rädd, ovetandes om att Erik redan väntade på henne."',
              },
              {
                id: "bildsprak",
                term: "Bildspråk",
                category: "Språkliga knep & Bildspråk",
                definition:
                  "Ett samlingsnamn för sätt att uttrycka sig där man skapar inre bilder hos läsaren istället för bokstavliga beskrivningar.",
              },
              {
                id: "liknelser",
                term: "Liknelser",
                category: "Språkliga knep & Bildspråk",
                definition:
                  'När man jämför två saker med ett jämförelseord (som "som" eller "likt").',
                example: '"Han var modig som ett lejon."',
              },
              {
                id: "metaforer",
                term: "Metaforer",
                category: "Språkliga knep & Bildspråk",
                definition:
                  "När man jämför två saker utan jämförelseord genom att säga att något ÄR någonting annat.",
                example:
                  '"Du är min solstråle" eller "Han har ett hjärta av sten."',
              },
              {
                id: "stilfigurer",
                term: "Stilfigurer",
                category: "Språkliga knep & Bildspråk",
                definition:
                  "Språkliga verktyg och effekter som författare använder för att göra en text mer intressant eller dramatisk.",
              },
              {
                id: "ingressen",
                term: "Ingressen",
                category: "Textens uppbyggnad & Struktur",
                definition:
                  "Den kortare, ofta fetstilta inledande texten under rubriken som sammanfattar det viktigaste.",
              },
              {
                id: "brodtext",
                term: "Brödtext",
                category: "Textens uppbyggnad & Struktur",
                definition:
                  "Själva huvudtexten i en artikel, bok eller rapport där hela historien eller resonemanget förklaras.",
              },
              {
                id: "citat",
                term: "Citat",
                category: "Textens uppbyggnad & Struktur",
                definition:
                  'En exakt återgivning av vad någon har sagt eller skrivit, markerat med citattecken ("...") eller talstreck (–).',
                example:
                  '"Jag kommer alltid att älska litteratur", sade författaren.',
              },
              {
                id: "kronologisk-ordning",
                term: "Kronologisk ordning",
                category: "Textens uppbyggnad & Struktur",
                definition:
                  "När händelser berättas i den tidsordning de faktiskt hände – från början till slut.",
                example:
                  "Måndag hände detta, tisdag hände nästa sak, och på onsdag avslutades det.",
              },
            ],
          },
        },
        // 3. TextGenreTable (Struktur-tabell)
        {
          id: "byggtext-genre-table",
          type: "text-genre-table",
          title: "Texttyper och genrer",
          instructions:
            "Jämför argumenterande text med andra textgenrer för att förstå vad som kännetecknar varje typ.",
          content: {
            genres: [
              {
                id: "argumenterande",
                name: "Argumenterande text",
                purpose: "Att övertyga läsaren om en specifik åsikt (tes).",
                features: [
                  "Tydlig tes",
                  "Starka argument",
                  "Motargument & bemötande",
                  "Sakuppgifter och bevis",
                ],
                examples: ["Debattartikel", "Insändare", "Krönika"],
              },
              {
                id: "berattande",
                name: "Berättande text",
                purpose: "Att underhålla och fängsla läsaren med en historia.",
                features: [
                  "Kronologisk ordning",
                  "Huvudperson & miljö",
                  "Konflikt/Problem",
                  "Upplösning",
                ],
                examples: ["Novell", "Saga", "Roman"],
              },
              {
                id: "informerande",
                name: "Informerande text",
                purpose: "Att ge saklig information och förklara fakta.",
                features: [
                  "Objektiv ton",
                  "Rubriker & ingress",
                  "Brödtext",
                  "Fakta utan egna åsikter",
                ],
                examples: ["Tidningsartikel", "Faktatext", "Rapport"],
              },
            ],
          },
        },
        // 4. Drag-and-Drop Övning (ArgumentativeTextOrder)
        {
          id: "byggtext-text-order",
          type: "drag-drop",
          component: "ArgumentativeTextOrder",
          title: "Pussla ihop texten",
          instructions:
            "Dra textstyckena till rätt plats i mallen så att den argumenterande texten byggs upp i rätt ordning.",
          content: {
            slots: [
              {
                id: "rubrik",
                label: "RUBRIK",
                description: "Fångar intresset och visar vad texten handlar om.",
              },
              {
                id: "inledning",
                label: "INLEDNING",
                description: "Presenterar ämnet och din åsikt (tes).",
              },
              {
                id: "argument-1",
                label: "ARGUMENT 1",
                description: "Första skälet till varför din åsikt stämmer.",
              },
              {
                id: "argument-2",
                label: "ARGUMENT 2",
                description: "Andra skälet till varför din åsikt stämmer.",
              },
              {
                id: "motargument",
                label: "MOTARGUMENT",
                description:
                  "Vad motståndarna tycker, och varför de har fel.",
              },
              {
                id: "avslutning",
                label: "AVSLUTNING",
                description:
                  "Sammanfattar budskapet och avslutar texten.",
              },
              {
                id: "signatur",
                label: "SIGNATUR",
                description: "Vem som har skrivit texten.",
              },
            ],
            items: [
              {
                id: "item-1",
                text: "Alla borde äta vegetarisk mat!",
                slotId: "rubrik",
              },
              {
                id: "item-2",
                text: "Alla vet vi att det är bra för vår hälsa att äta grönsaker. Ändå äter många människor kött istället. Jag tycker att det är helt fel. Det finns många anledningar till att jag tycker det.",
                slotId: "inledning",
              },
              {
                id: "item-3",
                text: "För det första är det inte bra för miljön att äta kött. Det kostar mycket onödiga koldioxidutsläpp att föda upp ett djur till slakt.",
                slotId: "argument-1",
              },
              {
                id: "item-4",
                text: "För det andra är det synd om djuren som dödas. Alla djur är lika mycket värda som människor och jag blir arg när jag tänker på hur människor behandlar djur.",
                slotId: "argument-2",
              },
              {
                id: "item-5",
                text: "Några hävdar nog att vi behöver äta kött för att få i oss bra näringsämnen. Men det finns många bra näringsämnen i grönsaker också, faktiskt! Dessutom innehåller grönsaker många viktiga vitaminer som kött saknar.",
                slotId: "motargument",
              },
              {
                id: "item-6",
                text: "För att sammanfatta gör vi inte bara en god gärning för miljön och djurens liv när vi slutar äta kött. Vi får också ett hälsosammare matintag som förbättrar vår hälsa avsevärt.",
                slotId: "avslutning",
              },
              {
                id: "item-7",
                text: "Stolt vegetarian",
                slotId: "signatur",
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
      introduction:
        "Träna på att skriva en argumenterande text med hjälp av skrivprocessen, checklistan och din AI-tutor.",

      activities: [
        {
          id: "byggtext-practice-log",
          type: "writing-log-practise-argumentative",
          title: "Träna på att skriva en argumenterande text",
          instructions: "",
          content: {
            question:
              "Bör skolor införa ett förbud mot energidrycker under skoltid? Skriv en argumenterande text där du framför din tes och stöder den med argument.",
            initialText: `Det säljs och konsumeras allt fler energidrycker bland unga i Sverige. Många elever dricker energidryck för att orka med skoldagen, men lärare och läkare slår larm om biverkningar som hjärtklappning, koncentrationssvårigheter och sömnproblem. Vissa skolor har redan infört ett förbud mot energidrycker under skoltid, medan andra anser att det är upp till eleverna själva och deras föräldrar att bestämma.`,
            imageSrc: "/images/energidryck.png",
            imageAlt: "Argumenterande text om energidrycker",
            studentInterest: "fotboll",
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
        "Visa din förmåga att bygga en argumenterande text helt själv utan Eddas stöd.",

      activities: [
        {
          id: "byggtext-diagnostic-text",
          type: "diagnostic-argumentative",
          title: "Diagnos – Bygga en text",
          content: {
            textData: {
              title: "ENERGIDRYCKER I SKOLAN",
              image: "/images/energidryck.png",
              text: `Det säljs och konsumeras allt fler energidrycker bland unga i Sverige. Många elever dricker energidryck för att orka med skoldagen, men lärare och läkare slår larm om biverkningar som hjärtklappning, koncentrationssvårigheter och sömnproblem.

Vissa skolor har redan infört ett förbud mot energidrycker under skoltid, medan andra anser att det är upp till eleverna själva och deras föräldrar att bestämma.`,
            },
          },
        },
      ],
    },
  },
};