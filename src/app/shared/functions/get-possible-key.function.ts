import { findByPartOfKey } from './find-by-part-of-key.function';

export const getPossibleIdKey = <T>(obj: T): keyof T | undefined => findByPartOfKey(obj, '_id');
export const getPossibleNameKey = <T>(obj: T): keyof T | undefined => findByPartOfKey(obj, '_name');
