import Fuse from "fuse.js";

import responses from "@/data/responses.json";

type ResponseItem = {
  category: string;
  keywords: string[];
  responses: string[];
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const data = (responses as ResponseItem[]).map((item) => ({
  ...item,
  searchText: item.keywords.join(" "),
}));

const fuse = new Fuse(data, {
  keys: ["searchText"],
  threshold: 1,
  includeScore: true,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function findResponse(message: string) {
  const normalizedMessage = normalize(message);

  const words = normalizedMessage.split(/\s+/);

  // prioridade 1:
  // keyword exata

  const exactMatch = data.find((item) =>
    item.keywords.some((keyword) => words.includes(normalize(keyword))),
  );

  if (exactMatch) {
    const response =
      exactMatch.responses[
        Math.floor(Math.random() * exactMatch.responses.length)
      ];

    return {
      found: true,
      source: "keyword",
      score: 0,
      category: exactMatch.category,
      response,
    };
  }

  // prioridade 2:
  // busca fuzzy

  const result = fuse.search(normalizedMessage)[0];

  console.log({
    query: message,
    score: result.score,
    original: message,
    normalizedMessage,
    words,
  });

  if ((result.score ?? 1) > 0.35) {
    return {
      found: false,
      source: "none",
      score: 1,
      response: null,
    };
  }

  const response =
    result.item.responses[
      Math.floor(Math.random() * result.item.responses.length)
    ];

  return {
    found: true,
    source: "fuse",
    score: result.score ?? 1,
    category: result.item.category,
    response,
  };
}
