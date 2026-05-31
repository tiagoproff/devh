import { NextResponse } from "next/server";

import { findResponse } from "@/services/fuse";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const match = findResponse(message);

    if (match?.found) {
      return NextResponse.json({
        message: match.response,
        source: match.source,
      });
    }

    // IA aqui!

    return NextResponse.json({
      message: "Não faço ideia. Já tentou desligar e ligar?",
      source: "fallback",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Até eu consegui quebrar isso.",
      },
      {
        status: 500,
      },
    );
  }
}
