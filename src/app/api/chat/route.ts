import { NextResponse } from "next/server";

import { findResponse } from "@/services/fuse";
import {
  getUsageRate,
  incrementFuseUsage,
  incrementOpenRouterUsage,
} from "@/services/usage";
import { getToday } from "@/utils/getToday";

import { getDailyKey } from "@/utils/getDailyKey";
import { createVisitorHash } from "@/services/hash";
import { redis } from "@/services/redis";

export async function POST(request: Request) {
  const usage = getUsageRate();
  const dailyKey = getTodayKey(request);
  const count = await redis.incr(dailyKey);

  if (count > 42) {
    return Response.json(
      {
        message: "Limite de 42 xícaras atingidos! Tente novamente amanhã.",
        error: "rate_limit_exceeded",
      },
      {
        status: 429,
      },
    );
  }

  if (count === 1) {
    await redis.expire(dailyKey, 60 * 60 * 24); // expira em 24 horas
  }

  try {
    if (usage.rate < 0.7) {
      incrementFuseUsage();

      const { message } = await request.json();
      const match = findResponse(message);

      if (match?.found) {
        return NextResponse.json({
          message: match.response,
          source: match.source,
        });
      }
    }

    incrementOpenRouterUsage();

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

function getTodayKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] ?? "unknown";

  const dailyKey = getDailyKey(createVisitorHash(ip), getToday());

  return dailyKey;
}
