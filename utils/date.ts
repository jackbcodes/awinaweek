import dayjs, { Dayjs, ConfigType } from 'dayjs';

export function weeksAgoFromToday(date: ConfigType) {
  return dayjs().diff(date, 'weeks');
}

export function isFirstWeekOfMonth(date: Dayjs) {
  return date.date() <= 7;
}

export function getPastTwoMonths() {
  let dates = [];

  for (let i = 0; i < 8; i++) {
    dates.unshift(dayjs().subtract(i, 'week').startOf('week'));
  }

  return dates;
}
