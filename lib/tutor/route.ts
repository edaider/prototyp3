import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, text, question, selectedText, answer, figure, strategy } = body;

    // -------------------------------------------------------------
    // ACTION 1: Bedömning av skrivlogg (Two Stars and a Wish)
    // -------------------------------------------------------------
    if (action === "writing_feedback") {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är Edda, en varm, pedagogisk och uppmuntrande AI-lärare i svenska. Du ska ge kort och konstruktiv feedback på en elevs svar enligt metoden 'Two Stars and a Wish' (Två stjärnor och en önskan). Svara på svenska i JSON-format.",
          },
          {
            role: "user",
            content: `
LÄSTEXT:
${text}

FRÅGA:
${question}

ANVÄND LÄSSTRATEGI:
${figure || "Pusslaren"} (${strategy || "Läsa mellan raderna"})

ELEVENS SVAR:
${answer}

GE FEEDBACK ENLIGT FÖLJANDE:
- star1: Något konkret som eleven gör bra i sitt svar.
- star2: En till positiv observation kring hur svaret besvarar frågan eller använder texten.
- wish: ETT konkret, tydligt nästa steg för att utveckla svaret (t.ex. att lägga till ett exempel från texten eller förklara orsaken).
- label: En kort nivåbedömning, t.ex. "Enkelt resonemang", "Utvecklat resonemang" eller "Väl utvecklat resonemang".
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
    // ACTION 2 & STANDARD: Ordförklaring / Edda-stöd
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