import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { Stack } from 'expo-router';

import { schema } from '~/model/schema';
import { Win } from '~/model/win';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: (error: any) => {
    console.error('Error setting up database', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Win],
});

export default function RootLayout() {
  return (
    <DatabaseProvider database={database}>
      <Stack />
    </DatabaseProvider>
  );
}
