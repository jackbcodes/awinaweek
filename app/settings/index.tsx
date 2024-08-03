import { Alert, Pressable, View } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { Link } from 'expo-router';

import { useNotification } from '~/components/notification-provider';
import { ChevronRight } from '~/components/ui/icons';
import { Text } from '~/components/ui/text';

export default function SettingsIndex() {
  const database = useDatabase();
  const notification = useNotification();

  const onClearData = () => {
    Alert.alert(
      'Clear all data?',
      'This will permanently delete all wins. You cannot undo this action.',
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
      <View className="gap-8 bg-secondary/30 px-6 py-4">
        <View className="gap-2">
          <Text className="ml-4 text-sm text-muted-foreground">
            NOTIFICATIONS
          </Text>
          <View>
            <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
            <Link href="settings/weekly" asChild>
              <Pressable className="flex-row items-center justify-between overflow-hidden rounded-lg border-2 border-input bg-white px-4 py-3 active:bg-gray-100">
                <Text className="text-lg">Weekly reminder</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-lg text-muted-foreground">
                    {notification.trigger ? 'On' : 'Off'}
                  </Text>
                  <ChevronRight width={20} className="text-gray-400" />
                </View>
              </Pressable>
            </Link>
          </View>
        </View>

        <View className="gap-2">
          <Text className="ml-4 text-sm text-muted-foreground">GENERAL</Text>
          <View>
            <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
            <View className="overflow-hidden rounded-lg border-2 border-input bg-white">
              <View className="flex-row items-center px-4 py-3">
                <Text className="text-lg text-blue-400">Review app</Text>
              </View>
              <View className="ml-4 h-0.5 w-full text-clip bg-gray-100" />
              <View className="flex-row items-center px-4 py-3">
                <Text className="text-lg text-blue-400">Send feedback</Text>
              </View>
              <View className="ml-4 h-0.5 w-full bg-gray-100" />
              <View className="flex-row items-center px-4 py-3">
                <Text className="text-lg text-blue-400">FAQs</Text>
              </View>
              <View className="ml-4 h-0.5 w-full bg-gray-100" />
              <View className="flex-row items-center px-4 py-3">
                <Text className="text-lg text-blue-400">
                  Terms & conditions
                </Text>
              </View>
              <View className="ml-4 h-0.5 w-full bg-gray-100" />
              <View className="flex-row items-center px-4 py-3">
                <Text className="text-lg text-blue-400">Privacy policy</Text>
              </View>
              <View className="ml-4 h-0.5 w-full bg-gray-100" />
              <View className="flex-row items-center px-4 py-3">
                <Text className="text-lg text-red-400">Delete data</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* <View className="gap-8 p-6">
        <View className="gap-1">
          <SectionHeader title="Development" />
          <Button title="CLEAR DATA" onPress={onClearData} />
        </View>
        <View className="gap-1">
          <SectionHeader title="Weekly Reminder" />
          <Button title="ENABLE NOTIFICATIONS" onPress={onClearData} />
        </View>
        <View className="gap-1">
          <SectionHeader title="General" />
          <View className="gap-3">
            <Button title="REVIEW APP" onPress={onClearData} />
            <Button title="SEND FEEDBACK" onPress={onClearData} />
            <Button title="HELP" onPress={onClearData} />
            <Button title="TERMS" onPress={onClearData} />
            <Button title="PRIVACY POLICY" onPress={onClearData} />
          </View>
        </View>
      </View> */}
    </>
  );
}
