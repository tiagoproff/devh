import Fuse from "fuse.js";

import responses from "@/data/responses.json";

const fuse = new Fuse(responses, {
  keys: ["keywords"],
  threshold: 0.4,
});

export function findResponse(message: string) {
  const result = fuse.search(message)[0];

  if (!result) {
    return null;
  }

  const responsesList = result.item.responses;

  return responsesList[Math.floor(Math.random() * responsesList.length)];
}
