import { SYSTEM_PROMPT } from "@/config/systemPrompt";

export async function askOpenRouter(message: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("OpenRouter failed");
  }

  const data = await response.json();

  return data.choices?.[0]?.message?.content ?? "Até eu fiquei sem resposta.";
}
