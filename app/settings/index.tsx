import { Alert, ScrollView, View } from 'react-native';

import { A } from '@expo/html-elements';
import { useDatabase } from '@nozbe/watermelondb/react';
import { Link } from 'expo-router';
import * as StoreReview from 'expo-store-review';
import * as WebBrowser from 'expo-web-browser';

import { Menu, MenuItem, MenuItemBorder } from '~/components/menu';
import { useNotification } from '~/components/notification-provider';
import { ChevronRight } from '~/components/ui/icons';
import { Text } from '~/components/ui/text';
import { useStreak } from '~/hooks/use-streak';

const isDev = process.env.NODE_ENV !== 'production';

export default function SettingsIndex() {
  const database = useDatabase();
  const notification = useNotification();
  const streak = useStreak();

  const onClearData = () => {
    Alert.alert(
      'Clear all data?',
      'This will permanently delete all wins and your streak. You cannot undo this action.',
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
    <ScrollView>
      <View className="gap-8 bg-secondary/30 px-6 py-4">
        <Menu title="NOTIFICATIONS">
          <Link href="settings/weekly" asChild>
            <MenuItem className="flex-row items-center justify-between">
              <Text className="text-lg">Weekly reminder</Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-lg text-muted-foreground">
                  {notification.trigger ? 'On' : 'Off'}
                </Text>
                <ChevronRight width={20} className="text-gray-400" />
              </View>
            </MenuItem>
          </Link>
        </Menu>

        <Menu title="GENERAL">
          <MenuItem
            onPress={async () => {
              if (await StoreReview.hasAction()) {
                await StoreReview.requestReview();
              }
            }}
          >
            <Text className="text-lg text-blue-400">Review app</Text>
          </MenuItem>
          <MenuItemBorder />
          <MenuItem>
            <A
              className="text-lg text-blue-400"
              href="mailto:brown_jack80@hotmail.com?subject=AWinAWeek%20Feedback"
            >
              Send feedback
            </A>
          </MenuItem>
          <MenuItemBorder />
          <MenuItem
            onPress={async () => {
              await WebBrowser.openBrowserAsync(
                'https://jackbcodes.com/awinaweek/privacy',
              );
            }}
          >
            <Text className="text-lg text-blue-400">Privacy policy</Text>
          </MenuItem>
          {isDev && (
            <>
              {streak && (
                <>
                  <MenuItemBorder />
                  <MenuItem
                    onPress={async () => {
                      try {
                        await database.write(async () => {
                          await streak.destroyPermanently();
                        });
                      } catch (error) {
                        console.log('Error resetting streak', error);
                      }
                    }}
                  >
                    <Text className="text-lg text-red-400">Reset streak</Text>
                  </MenuItem>
                </>
              )}
              <MenuItemBorder />
              <MenuItem onPress={onClearData}>
                <Text className="text-lg text-red-400">Delete data</Text>
              </MenuItem>
            </>
          )}
        </Menu>
      </View>
    </ScrollView>
  );
}
