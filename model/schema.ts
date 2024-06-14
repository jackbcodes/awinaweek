import { appSchema, tableSchema } from '@nozbe/watermelondb';

export enum TableName {
  Wins = 'wins',
  Streaks = 'streaks',
}

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TableName.Wins,
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: TableName.Streaks,
      columns: [
        { name: 'count', type: 'number' },
        { name: 'achievedDates', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
