import { Alert, Button, ScrollView } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { Stack } from 'expo-router';

import { HeaderBack, HeaderBorder, HeaderTitle } from '~/components/header';
import { Text } from '~/components/ui/text';

export default function Settings() {
  const database = useDatabase();

  const onClearData = () => {
    Alert.alert(
      'Clear all data?',
      'This will permenantely delete all wins. You cannot undo this action.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: async () => {
            try {
              await database.write(async () => {
                await database.unsafeResetDatabase();
              });
            } catch (error) {
              console.log('Error clearing data', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          // headerTitle: () => <HeaderTitle>Settings</HeaderTitle>,
          headerTitle(props) {
            return <Text className="text-xl font-semibold">Settings</Text>;
          },
          headerShadowVisible: false,
          headerBackTitle: 'Back',
        }}
      />
      <HeaderBorder />
      <ScrollView className="px-6 pt-9">
        <Button title="Clear all data" onPress={onClearData} />
      </ScrollView>
    </>
  );
}
