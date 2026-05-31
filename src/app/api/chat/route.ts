import { NextResponse } from "next/server";

import { findResponse } from "@/services/fuse";
import { createVisitorHash } from "@/services/hash";
import { askOpenRouter } from "@/services/openrouter";
import { redis } from "@/services/redis";
import {
  getUsageRate,
  incrementFuseUsage,
  incrementOpenRouterUsage,
} from "@/services/usage";
import { getDailyKey } from "@/utils/getDailyKey";
import { getToday } from "@/utils/getToday";

export async function POST(request: Request) {
  const usage = getUsageRate();

  await verifyDailyLimit(request);

  const { message } = await request.json();

  try {
    if (usage.rate < 0.7) {
      incrementFuseUsage();

      const match = findResponse(message);

      if (match?.found) {
        return NextResponse.json({
          message: match.response,
          source: match.source,
        });
      }
    }

    // OpenRouter
    const aiResponse = await askOpenRouter(message);

    incrementOpenRouterUsage();

    return NextResponse.json({
      message: aiResponse,
      source: "openrouter",
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

async function verifyDailyLimit(request: Request) {
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
}

function getTodayKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] ?? "unknown";

  const dailyKey = getDailyKey(createVisitorHash(ip), getToday());

  return dailyKey;
}
