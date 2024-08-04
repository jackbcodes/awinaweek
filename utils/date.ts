import dayjs from 'dayjs';

export function getPastTwoMonths() {
  let dates = [];

  for (let i = 0; i < 8; i++) {
    dates.unshift(
      dayjs()
        .subtract(i + 1, 'week')
        .startOf('week')
        .add(1, 'day'),
    );
  }

  return dates;
}
