export const arrayDiff = <T>(baseArray: T[] = [], comparedArray: T[] = []): T[] => {
  const uniqItems = new Set(comparedArray ?? []);

  return (baseArray ?? []).filter(item => !uniqItems.has(item));
};
