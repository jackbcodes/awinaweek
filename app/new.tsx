import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TextInput, View } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { useFocusEffect, useNavigation } from 'expo-router';

import { TableName } from '~/model/schema';
import { Win } from '~/model/win';

export default function New() {
  const [win, setWin] = useState<Win | undefined>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const descriptionInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const database = useDatabase();

  useFocusEffect(
    useCallback(() => {
      async function createWin() {
        try {
          console.log('creating win...');
          await database.write(async () => {
            const newWin = await database
              .get<Win>(TableName.Wins)
              .create((win) => {
                win.title = '';
                win.description = '';
              });
            setWin(newWin);
          });
        } catch (error) {
          console.log('Error creating win', error);
        }
      }

      createWin();
    }, [database]),
  );

  useEffect(
    () =>
      navigation.addListener('beforeRemove', async () => {
        if (!title && !description) {
          try {
            console.log('deleting win...');
            await database.write(async () => {
              await win!.destroyPermanently();
            });
          } catch (error) {
            console.log('Error deleting win', error);
          }
        }
      }),
    [navigation, title, description, database, win],
  );

  if (!win) return null;

  async function handleTitleChange(text: string) {
    setTitle(text);

    try {
      await database.write(async () => {
        await win!.update((win) => {
          win.title = text;
        });
      });
    } catch (error) {
      console.log('Error updating win title', error);
    }
  }

  async function handleDescriptionChange(text: string) {
    setDescription(text);

    try {
      await database.write(async () => {
        await win!.update((win) => {
          win.description = text;
        });
      });
    } catch (error) {
      console.log('Error updating win description', error);
    }
  }

  return (
    <View className="gap-1 bg-secondary/30 px-6 py-2">
      <TextInput
        className="text-2xl font-bold"
        value={title}
        onChangeText={handleTitleChange}
        autoFocus
        onSubmitEditing={() => descriptionInputRef.current?.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        value={description}
        onChangeText={handleDescriptionChange}
        ref={descriptionInputRef}
        multiline
      />
    </View>
  );
}
