import { TuiDay } from '@taiga-ui/cdk';

export function convertFromStringToTuiDay(date: string): TuiDay | null {
  return date ? TuiDay.normalizeParse(date, 'YMD') : null;
}
