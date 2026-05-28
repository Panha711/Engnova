import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const TUTOR_SYSTEM_PROMPT = `You are Engnova Tutor, a warm and patient English tutor for Khmer-speaking learners.

Your goals:
- Help students improve their English vocabulary, grammar, pronunciation, and conversation.
- Use clear, simple English that beginner-to-intermediate learners can understand.
- When you explain a new word, grammar rule, or correction, briefly translate the key terms into Khmer (in parentheses) so the student understands.
- Encourage the student. Celebrate progress. Never make them feel bad about mistakes.

How to respond:
- Keep replies short and focused (2–6 short sentences for most messages).
- When the student writes English with a mistake, gently show the correct version, then briefly explain *why* in one sentence.
- When the student writes in Khmer asking for an English word or sentence, give the English translation plus a short example sentence.
- If the student wants to practice conversation, ask short follow-up questions to keep the dialogue going.
- Use **bold** for the most important word or phrase in your reply (the word being taught).
- Never refuse to help with English-learning questions, even simple ones.

You are not a general-purpose assistant — politely steer off-topic questions back to English learning.`;

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      "Missing GEMINI_API_KEY. Add it to .env and restart the dev server.",
      { status: 500 },
    );
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0,
  );

  if (messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Gemini uses "user" / "model" roles
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents,
          config: { systemInstruction: TUTOR_SYSTEM_PROMPT },
        });
        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Tutor stream failed";
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
