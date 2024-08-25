import { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation, useRouter } from 'expo-router';

import { SaveButton } from '~/components/header';
import { useStreak } from '~/hooks/use-streak';
import { TableName } from '~/model/schema';
import { Streak } from '~/model/streak';
import { Win } from '~/model/win';

export default function New() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const descriptionInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();
  const database = useDatabase();
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const streak = useStreak();

  useEffect(() => {
    async function createStreak() {
      try {
        console.log('creating streak...');
        await database.write(async () => {
          await database.get<Streak>(TableName.Streaks).create((newStreak) => {
            newStreak.count = 1;
            newStreak.achievedDates = [new Date()];
          });
        });
      } catch (error) {
        console.log('Error creating streak', error);
      }
    }

    async function createWin() {
      try {
        console.log('creating win...');
        await database.write(async () => {
          await database.get<Win>(TableName.Wins).create((win) => {
            win.title = title;
            win.description = description;
          });
        });
        if (!streak) {
          await createStreak();
        } else {
          if (streak.weeksSinceLastAchieved === 1) await streak.increment();
          if (streak.weeksSinceLastAchieved > 1) await streak.reset();
        }
        router.navigate('/');
      } catch (error) {
        console.log('Error creating win', error);
      }
    }

    navigation.setOptions({
      headerRight: () => (
        <SaveButton onPress={createWin} disabled={!title || !description} />
      ),
    });
  }, [navigation, database, title, description, streak, router]);

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
            autoFocus
            onSubmitEditing={() => descriptionInputRef.current?.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            className="flex-1 text-lg"
            value={description}
            onChangeText={setDescription}
            placeholder="Tap here to continue..."
            ref={descriptionInputRef}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
