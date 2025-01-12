/**
 * Округление числа по банковскому округлению - спорные значения приводятся к ближайшему четному числу
 *
 * @param {number} number число
 * @param {number} decimal количество знаков после запятой, по умолчанию - 0
 * @example Правило округления значений более или менее 0.5
 * evenRound(2.4) = 2
 * evenRound(2.6) = 3
 * @example Правило округления значений равным 0.5 - округление к ближайшему четному числу
 * evenRound(2.5) = 2
 * evenRound(3.5) = 4
 */
export function evenRound(number: number, decimal = 0): number {
  const pow = Math.pow(10, decimal);
  const num = +(decimal ? number * pow : number).toFixed(8); // Avoid rounding errors
  const initialFloor = Math.floor(num);
  const floor = num - initialFloor;
  const error = 1e-8; // Allow for rounding errors in floor
  const round = floor > 0.5 - error && floor < 0.5 + error ? (initialFloor % 2 === 0 ? initialFloor : initialFloor + 1) : Math.round(num);
  return decimal ? round / pow : round;
}
