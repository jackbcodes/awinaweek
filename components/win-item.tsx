import { useDatabase } from '@nozbe/watermelondb/react';
import { Link, useRouter } from 'expo-router';
import {
  View,
  Button,
  Pressable,
  TouchableHighlight,
  Platform,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import { useWin } from '~/hooks/use-win';
import { Win } from '~/model/win';
import { showDeleteWinAlert } from '~/utils/win';
import { Text } from '~/components/text';
import { cn } from '~/utils/cn';

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
        <View className="px-5 py-4">
          <View className="flex-row items-center justify-between">
            <Text className="font-brand-semibold">{win.title}</Text>
            <Text className="text-xs text-stone-500">
              {win.createdAt.toLocaleString(undefined, {
                day: 'numeric',
                month: 'short',
              })}
            </Text>
          </View>
          <Text>{win.description}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
