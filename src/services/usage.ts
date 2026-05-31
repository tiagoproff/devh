let fuseCount = 0;
let openRouterCount = 0;

export function incrementFuseUsage() {
  fuseCount += 1;
}

export function incrementOpenRouterUsage() {
  openRouterCount += 1;
}

export function getUsageRate() {
  const total = fuseCount + openRouterCount;

  return {
    fuseCount,
    openRouterCount,
    rate: total === 0 ? 0 : fuseCount / total,
  };
}
