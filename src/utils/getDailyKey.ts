export function getDailyKey(hash: string, date: string) {
  return `daily:${hash}:${date}`;
}
