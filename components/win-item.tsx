import { View, Pressable, Platform, ActionSheetIOS, Alert } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import dayjs from 'dayjs';
import { Link, useRouter } from 'expo-router';

import { Text } from '~/components/ui/text';
import { Win } from '~/model/win';
import { showDeleteWinAlert } from '~/utils/win';

interface WinItemProps {
  win: Win;
}

export function WinItem({ win }: WinItemProps) {
  const database = useDatabase();
  const router = useRouter();

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
          options: ['Cancel', 'Edit', 'Delete'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
          title: win.title,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              break;
            case 1:
              router.push(`/edit/${win.id}`);
              break;
            case 2:
              showDeleteWinAlert(async () => await deleteWin());
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
          text: 'Edit',
          onPress: () => router.push(`/edit/${win.id}`),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => showDeleteWinAlert(async () => await deleteWin()),
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
        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold">{win.title ?? 'New win'}</Text>
            <Text className="text-xs text-muted-foreground">
              {dayjs(win.createdAt).format('D MMM')}
            </Text>
          </View>
          <Text className="text-muted-foreground">
            {win.description !== '' ? win.description : 'No description'}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
