export function compareByField<T extends Record<string, any>>(
  field: keyof T,
  desc = false,
  options: Intl.CollatorOptions = {
    numeric: true,
    sensitivity: 'base',
  },
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const collator = new Intl.Collator(undefined, options);
    const result = collator.compare(a[field], b[field]);

    return desc ? result : -result;
  };
}
