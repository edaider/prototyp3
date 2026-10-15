import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, text, question, selectedText, answer, figure, strategy, keywords } = body;

    // -------------------------------------------------------------
    // ACTION 1: Bedömning av skrivlogg (Two Stars and a Wish)
    // -------------------------------------------------------------
    if (action === "writing_feedback" || action === "summary_feedback") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en varm, pedagogisk och uppmuntrande AI-lärare i svenska. Du ska ge kort och konstruktiv feedback på en elevs svar eller sammanfattning enligt metoden 'Two Stars and a Wish' (Två stjärnor och en önskan). Svara på svenska i JSON-format.",
          },
          {
            role: "user",
            content: `
LÄSTEXT:
${text}

FRÅGA/UPPGIFT:
${question}

${figure ? `ANVÄND LÄSSTRATEGI:\n${figure} (${strategy || ""})\n` : ""}

ELEVENS SVAR:
${answer}

GE FEEDBACK ENLIGT FÖLJANDE:
- star1: Något konkret som eleven gör bra i sitt svar (t.ex. att de använt egna ord eller fångat huvudhändelsen).
- star2: En till positiv observation kring hur svaret besvarar frågan eller använder texten.
- wish: ETT konkret, tydligt nästa steg för att utveckla eller förbättra sammanfattningen/svaret.
- label: En kort nivåbedömning, t.ex. "Enkelt resonemang", "Sammanfattning med egna ord" eller "Väl utvecklat resonemang".
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
    // ACTION 2: Skapa sammanfattning från utvalda stödord
    // -------------------------------------------------------------
    if (action === "generate_summary_from_keywords") {
      const selectedKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords || "";

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en varm och hjälpsam AI-lärare i svenska för grundskolan. Din uppgift är att utifrån en källtext och några stödord som en elev valt ut, skapa EN kort, tydlig och välformulerad mening som sammanfattar texten. Meningen ska naturligt väva in de utvalda stödorden.",
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

      const summary = completion.choices[0]?.message?.content?.trim() || "Kunde inte generera en sammanfattning just nu.";

      return NextResponse.json({ summary });
    }

    // -------------------------------------------------------------
    // ACTION 3 & STANDARD: Ordförklaring / Edda-stöd
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

    const responseAnswer = completion.choices[0]?.message?.content || "Jag kunde inte svara just nu.";

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