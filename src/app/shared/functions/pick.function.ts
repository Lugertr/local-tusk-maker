export const pick = <T extends Object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce<Pick<T, K>>(
    (accumulator, key) => {
      accumulator[key] = obj[key];

      return accumulator;
    },
    <Pick<T, K>>{},
  );
};
