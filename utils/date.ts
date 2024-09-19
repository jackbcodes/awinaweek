import dayjs, { Dayjs } from 'dayjs';

export function getPastWeeks(numberOfWeeks: number = 8): Dayjs[] {
  return Array.from({ length: numberOfWeeks }, (_, i) =>
    dayjs().subtract(i, 'week').startOf('isoWeek'),
  ).reverse();
}
