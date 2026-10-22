import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      action,
      text,
      question,
      selectedText,
      answer,
      figure,
      strategy,
      keywords,
      author,
      year,
      sentence,
      source,
      step,
      interest,
    } = body;

    // -------------------------------------------------------------
    // ACTION 0: Live Scaffolding (Feedback under steg-för-steg-skrivandet)
    // -------------------------------------------------------------
    if (action === "live_scaffolding") {
      const stepNames: Record<number, string> = {
        1: "Inledning och tes",
        2: "Första argumentet",
        3: "Andra argumentet/fördjupning",
        4: "Motargument och bemötande",
        5: "Avslutning och sammanfattning",
        6: "Signatur",
      };

      const currentStepName = stepNames[step] || `Steg ${step}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en pedagogisk, varm och uppmuntrande AI-lärare i svenska för grundskolan (årskurs 9). Ge kort (1–2 korta meningar) och peppande feedback på det specifika delsteget i elevens argumenterande text. Om eleven nämner sitt intresse kan du väva in det lite lätt.",
          },
          {
            role: "user",
            content: `
UPPGIFT/FRÅGA:
${question || "Bör skolor införa ett förbud mot energidrycker under skoltid?"}

ELEVENS INTRESSE:
${interest || "allmänt"}

DELSTEG JUST NU:
Steg ${step}: ${currentStepName}

ELEVENS SKRIVNA TEXT FÖR DETTA STEG:
"${answer}"

Ge en kort, uppmuntrande kommentar (1–2 meningar) där du berömmer vad de skrivet och peppar dem inför nästa del i argumentationen! Svara i JSON med nyckeln "tip".
`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "live_scaffolding_schema",
            strict: true,
            schema: {
              type: "object",
              properties: {
                tip: { type: "string" },
              },
              required: ["tip"],
              additionalProperties: false,
            },
          },
        },
        temperature: 0.5,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error("Inget svar från OpenAI");

      return NextResponse.json(JSON.parse(content));
    }

    // -------------------------------------------------------------
    // ACTION 1: Skapa referat, citat & källhänvisning från vald mening
    // -------------------------------------------------------------
    if (action === "generate_reference_from_sentence") {
      const sourceAuthor = source?.author || author || "Okänd författare";
      const sourceYear = source?.year || year || "År saknas";
      const sourceTitle = source?.title || "Okänd titel";
      const sourcePage = source?.page ? `, s. ${source.page}` : "";

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en pedagogisk AI-lärare i svenska för grundskolan. Din uppgift är att utifrån en valfria källtext, en vald mening och källuppgifter hjälpa eleven att se hur ett korrekt referat, ett direkt citat och en källhänvisning ser ut. Svara alltid i JSON-format enligt angivet schema på enkel och tydlig svenska.",
          },
          {
            role: "user",
            content: `
KÄLLTEXT:
"${text}"

VALD MENING ATT REFERERA:
"${sentence}"

KÄLLUPPGIFTER:
Författare: ${sourceAuthor}
År: ${sourceYear}
Titel: ${sourceTitle}
${sourcePage}

Skapa följande fyra delar:
1. reference: Ett referat av den valda meningen skriven med egna ord (bevara innebörden).
2. directQuote: Det exakta direktcitatet omgiven av citationstecken ("...").
3. citation: En tydlig källhänvisning som väver in författare och år (t.ex. "Enligt ${sourceAuthor} (${sourceYear})...").
4. explanation: En kort, uppmuntrande förklaring (2–3 meningar) till varför referatet och källhänvisningen är utformade på detta sätt.
`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "generate_reference_schema",
            strict: true,
            schema: {
              type: "object",
              properties: {
                reference: { type: "string" },
                directQuote: { type: "string" },
                citation: { type: "string" },
                explanation: { type: "string" },
              },
              required: ["reference", "directQuote", "citation", "explanation"],
              additionalProperties: false,
            },
          },
        },
        temperature: 0.3,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error("Inget svar från OpenAI");

      return NextResponse.json(JSON.parse(content));
    }

    // -------------------------------------------------------------
    // ACTION 2: Bedömning av skrivlogg, sammanfattning, referat & argumentation (Two Stars and a Wish)
    // -------------------------------------------------------------
    if (
      action === "writing_feedback" ||
      action === "summary_feedback" ||
      action === "report_feedback" ||
      action === "argumentative_feedback"
    ) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en varm, pedagogisk och uppmuntrande AI-lärare i svenska. Du ska ge kort och konstruktiv feedback på en elevs argumenterande text, svar, sammanfattning eller referat enligt metoden 'Two Stars and a Wish' (Två stjärnor och en önskan). Svara på svenska i JSON-format.",
          },
          {
            role: "user",
            content: `
LÄSTEXT/KÄLLA:
${text || "Standardtext om energidrycker"}
${author ? `KÄLLFAKTA: Författare: ${author}, År: ${year}` : ""}

FRÅGA/UPPGIFT:
${question}

${figure ? `ANVÄND LÄSSTRATEGI:\n${figure} (${strategy || ""})\n` : ""}

ELEVENS TEXT:
${answer}

GE FEEDBACK ENLIGT FÖLJANDE:
- star1: Något konkret som eleven gör bra (t.ex. tydlig tes, bra bindord som 'för det första', eller starka argument).
- star2: En till positiv observation kring resonemanget eller uppbyggnaden.
- wish: ETT konkret, tydligt nästa steg för att utveckla texten (t.ex. bemöta ett motargument eller utveckla en avslutande sammanfattning).
- label: En kort nivåbedömning, t.ex. "Argumenterande text", "Tydlig tes & argument" eller "Väl utvecklat resonemang".
`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "writing_feedback_schema",
            strict: true,
            schema: {
              type: "object",
              properties: {
                star1: { type: "string" },
                star2: { type: "string" },
                wish: { type: "string" },
                label: { type: "string" },
              },
              required: ["star1", "star2", "wish", "label"],
              additionalProperties: false,
            },
          },
        },
        temperature: 0.3,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error("Inget svar från OpenAI");

      return NextResponse.json(JSON.parse(content));
    }

    // -------------------------------------------------------------
    // ACTION 3: Skapa sammanfattning från utvalda stödord
    // -------------------------------------------------------------
    if (action === "generate_summary_from_keywords") {
      const selectedKeywords = Array.isArray(keywords)
        ? keywords.join(", ")
        : keywords || "";

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en varm och hjälpsam AI-lärare i svenska för grundskolan. Din uppgift är att utifrån en källtext och några stödord som en elev valt ut, skapa EN kort, tydlig och välformulerad mening som sammanfattar texten. Meningen ska naturally väva in de utvalda stödorden.",
          },
          {
            role: "user",
            content: `
KÄLLTEXT:
${text}

ELEVENS VALDA STÖDORD:
${selectedKeywords}

Skriv EN sammanfattande mening på korrekt och enkel svenska som knyter ihop stödorden med källtextens innehåll. Svara endast med själva meningen utan extra introduktion.
`,
          },
        ],
        temperature: 0.4,
      });

      const summary =
        completion.choices[0]?.message?.content?.trim() ||
        "Kunde inte generera en sammanfattning just nu.";

      return NextResponse.json({ summary });
    }

    // -------------------------------------------------------------
    // ACTION 4 & STANDARD: Ordförklaring / Edda-stöd
    // -------------------------------------------------------------
    let systemPrompt = `Du är Edda, en pedagogisk, varm och uppmuntrande AI-lärare i grundskolan.
Svara kort (1–3 meningar), enkelt och på svenska. Hjälp elevens förståelse utan att bara ge det direkta svaret.`;

    let userPrompt = `TEXT:\n${text || "Ingen text angiven."}\n\nFRÅGA:\n${question || "Ingen fråga."}`;

    if (action === "text_explanation") {
      userPrompt += `\n\nFörklara följande ord/uttryck kort och enkelt utifrån texten: "${selectedText}"`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.5,
    });

    const responseAnswer =
      completion.choices[0]?.message?.content || "Jag kunde inte svara just nu.";

    return NextResponse.json({
      title: action === "text_explanation" ? "Ordförklaring" : "Edda hjälper",
      message: responseAnswer,
      keywords: [],
    });
  } catch (error) {
    console.error("Tutor API Error:", error);
    return NextResponse.json(
      { error: "Kunde inte kontakta Edda just nu." },
      { status: 500 }
    );
  }
}