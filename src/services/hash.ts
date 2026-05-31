import crypto from "node:crypto";

export function createVisitorHash(ip: string) {
  return crypto
    .createHash("sha256")
    .update(`${ip}:${process.env.RATE_LIMIT_SALT}`)
    .digest("hex");
}
