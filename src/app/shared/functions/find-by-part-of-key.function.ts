export const findByPartOfKey = <T>(obj: T, partOfKey: string): keyof T | undefined =>
  <keyof T | undefined>Object.keys(obj!).find(key => key.includes(partOfKey));
