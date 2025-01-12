export const isNil = (value: unknown): value is null | undefined => value === undefined || value === null;
