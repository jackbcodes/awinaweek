import { View, Pressable, Platform, ActionSheetIOS, Alert } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import dayjs from 'dayjs';
import { Link } from 'expo-router';

import { Text } from '~/components/ui/text';
import { Win } from '~/model/win';
import { showDeleteWinAlert } from '~/utils/win';

interface WinItemProps {
  win: Win;
}

export function WinItem({ win }: WinItemProps) {
  const database = useDatabase();

  async function deleteWin() {
    try {
      await database.write(async () => {
        await win.destroyPermanently();
      });
    } catch (error) {
      console.log('Error deleting win', error);
    }
  }

  function onLongPress() {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Delete'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          title: win.title,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              break;
            case 1:
              showDeleteWinAlert(deleteWin);
              break;
          }
        },
      );
      return;
    }

    Alert.alert(
      win.title,
      undefined,
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => showDeleteWinAlert(deleteWin),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <Link href={`/win/${win.id}`} asChild>
      <Pressable
        className="bg-white active:bg-gray-100"
        onLongPress={onLongPress}
      >
        <View className="px-4 py-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold">
              {win.title ?? 'New win'}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {dayjs(win.createdAt).format('D MMM')}
            </Text>
          </View>
          <Text className="text-lg text-muted-foreground">
            {win.description !== '' ? win.description : 'No description'}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
