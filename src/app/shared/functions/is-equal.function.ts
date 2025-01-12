import { isNil } from './is-nil.function';
import { tuiIsObject } from '@taiga-ui/cdk';

export const isEqual = <T>(source: T, compare: T): boolean => {
  if (isNil(source) || isNil(compare) || !tuiIsObject(source) || !tuiIsObject(compare)) {
    return source === compare;
  }

  if (source instanceof Date && compare instanceof Date) {
    return source.getTime() === compare.getTime();
  }

  if (Array.isArray(source) && Array.isArray(compare)) {
    if (source.length !== compare.length) {
      return false;
    }

    return source.every((item, index) => isEqual(item, compare[index]));
  }

  const sourceKeys = Object.keys(source) as (keyof T)[];

  if (sourceKeys.length !== Object.keys(compare).length) {
    return false;
  }

  return sourceKeys.every(sourceKey => compare.hasOwnProperty(sourceKey) && isEqual(source[sourceKey], compare[sourceKey]));
};
