import dayjs, { ConfigType } from 'dayjs';

export function weeksAgoFromToday(date: ConfigType) {
  return dayjs().diff(date, 'weeks');
}
