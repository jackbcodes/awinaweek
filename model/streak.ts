import { Model } from '@nozbe/watermelondb';
import {
  date,
  field,
  json,
  readonly,
  writer,
} from '@nozbe/watermelondb/decorators';
import dayjs from 'dayjs';

import { TableName } from './schema';

function sanitiseAchievedDates(rawDates: unknown) {
  return Array.isArray(rawDates) ? rawDates.map((date) => new Date(date)) : [];
}

export class Streak extends Model {
  static table = TableName.Streaks;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @field('count') count!: number;
  @json('achievedDates', sanitiseAchievedDates) achievedDates!: Date[];

  get weeksSinceLastAchieved() {
    return dayjs().diff(
      this.achievedDates[this.achievedDates.length - 1],
      'weeks',
    );
  }

  get formattedCount() {
    return this.count === 1 ? '1 WEEK' : `${this.count} WEEKS`;
  }

  @writer async increment() {
    await this.update((streak) => {
      streak.count = this.count + 1;
      streak.achievedDates = [...this.achievedDates, new Date()];
    });
  }

  @writer async reset(count = 0) {
    await this.update((streak) => {
      streak.count = count;
      streak.achievedDates = [...this.achievedDates, new Date()];
    });
  }
}
