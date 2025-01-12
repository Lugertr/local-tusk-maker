export const isPresent = <T>(value: T): value is T => {
  if (typeof value === 'boolean' || value instanceof Date) {
    return true;
  }

  if (['string', 'number'].includes(typeof value)) {
    return Boolean(value);
  }

  if (value instanceof Object) {
    return Object.entries(value).length > 0;
  }

  return false;
};
