import { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Platform,
  ActionSheetIOS,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation, useRouter } from 'expo-router';

import { MoreIconButton, SaveButton } from '~/components/header';
import { Text } from '~/components/ui/text';
import { useWin } from '~/hooks/use-win';
import { showDeleteWinAlert } from '~/utils/win';

export default function WinId() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const database = useDatabase();
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const win = useWin();

  useEffect(() => {
    if (!win) return;
    setTitle(win.title);
    setDescription(win.description);
  }, [win]);

  useEffect(() => {
    async function deleteWin() {
      if (!win) throw new Error('Win not found');

      try {
        await database.write(async () => {
          await win.destroyPermanently();
        });
        router.navigate('/');
      } catch (error) {
        console.log('Error deleting win', error);
      }
    }

    function onMorePress() {
      if (!win) throw new Error('Win not found');

      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', 'Edit', 'Delete'],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            switch (buttonIndex) {
              case 0:
                break;
              case 1:
                setIsEditing(true);
                titleInputRef.current?.focus();
                break;
              case 2:
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
            text: 'Edit',
            onPress: () => {
              setIsEditing(true);
              titleInputRef.current?.focus();
            },
          },
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

    async function updateWin() {
      if (!win) throw new Error('Win not found');

      try {
        await database.write(async () => {
          await win.update((newWin) => {
            newWin.title = title;
            newWin.description = description;
          });
        });
        setIsEditing(false);
      } catch (error) {
        console.log('Error deleting win', error);
      }
    }

    navigation.setOptions({
      headerRight: () =>
        isEditing ? (
          <SaveButton onPress={updateWin} disabled={!title || !description} />
        ) : (
          <MoreIconButton onPress={onMorePress} />
        ),
    });
  }, [navigation, database, win, isEditing, title, description, router]);

  if (!win) return <Text>Loading...</Text>;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={headerHeight}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 gap-1 p-6 pt-2">
          <TextInput
            className="text-3xl font-bold"
            value={title}
            placeholder="Untitled"
            onChangeText={setTitle}
            editable={isEditing}
            autoFocus
            onSubmitEditing={() => descriptionInputRef.current?.focus()}
            blurOnSubmit={false}
            ref={titleInputRef}
          />
          <TextInput
            className="flex-1 text-lg"
            value={description}
            onChangeText={setDescription}
            editable={isEditing}
            placeholder="Tap here to continue..."
            ref={descriptionInputRef}
            multiline
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
