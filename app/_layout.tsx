import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { Stack } from 'expo-router';
import {
  Hind_300Light,
  Hind_400Regular,
  Hind_500Medium,
  Hind_600SemiBold,
  Hind_700Bold,
  useFonts,
} from '@expo-google-fonts/hind';

import { schema } from '~/model/schema';
import { Win } from '~/model/win';

import '~/global.css';
import { useEffect } from 'react';

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
  const [loaded, error] = useFonts({
    Hind_300Light,
    Hind_400Regular,
    Hind_500Medium,
    Hind_600SemiBold,
    Hind_700Bold,
  });

  return (
    <DatabaseProvider database={database}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'AWinAWeek',
          }}
        />
      </Stack>
    </DatabaseProvider>
  );
}
