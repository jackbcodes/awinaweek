import { appSchema, tableSchema } from '@nozbe/watermelondb';

export enum TableName {
  Wins = 'wins',
}

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TableName.Wins,
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
      ],
    }),
  ],
});
