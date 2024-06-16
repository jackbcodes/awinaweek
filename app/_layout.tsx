import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { DatabaseProvider } from '@nozbe/watermelondb/react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  SettingsIconButton,
  MoreIconButton,
  SaveButton,
} from '~/components/header';
import { Text } from '~/components/ui/text';
import { schema } from '~/model/schema';
import { Streak } from '~/model/streak';
import { Win } from '~/model/win';

import '~/global.css';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true /* Platform.OS === 'ios' */,
  onSetUpError: (error: any) => {
    console.error('Error setting up database', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Win, Streak],
});

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DatabaseProvider database={database}>
          <Stack
            screenOptions={{
              headerBackTitle: 'Back',
              headerTitle: (props) => (
                <Text className="text-xl font-semibold">{props.children}</Text>
              ),
              headerTintColor: '#60a5fa',
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                title: 'AWinAWeek',
                headerLeft: () => <SettingsIconButton />,
              }}
            />
            <Stack.Screen
              name="new"
              options={{
                title: '',
                headerRight: () => <SaveButton disabled />,
                headerStyle: {
                  backgroundColor: '#F2F2F2',
                },
              }}
            />
            <Stack.Screen
              name="win/[id]"
              options={{
                title: '',
                headerRight: () => <MoreIconButton />,
                headerStyle: {
                  backgroundColor: '#F2F2F2',
                },
              }}
            />
          </Stack>
        </DatabaseProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
