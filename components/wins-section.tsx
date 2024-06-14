import { FlatList, TouchableOpacity, View } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Link } from 'expo-router';

import { Text } from '~/components/ui/text';
import { useStreak } from '~/hooks/use-streak';
import { useWins } from '~/hooks/use-wins';
import { TableName } from '~/model/schema';
import { Streak } from '~/model/streak';
import { Win } from '~/model/win';

import { WinItem } from './win-item';

dayjs.extend(isoWeek);

export function WinsSection() {
  const database = useDatabase();
  const wins = useWins();
  const streak = useStreak();

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
          win.title = 'New win';
          win.description = 'Lorem ipsum...';
        });
      });
    } catch (error) {
      console.log('Error creating win', error);
    }
  }

  async function onAddNew() {
    await createWin();
    if (!streak) {
      await createStreak();
      return;
    }
    if (streak.weeksSinceLastUpdate === 1) await streak.increment();
    if (streak.weeksSinceLastUpdate > 1) await streak.reset();
  }

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">Wins</Text>
        <Link href="/new">
          <Text className="text-xs font-bold text-blue-400">ADD NEW</Text>
        </Link>
      </View>
      <View>
        <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
        <FlatList
          data={wins}
          renderItem={({ item, index }) => (
            <>
              <WinItem win={item} />
              {index !== wins.length - 1 && (
                <View className="mx-auto h-0.5 w-11/12 bg-gray-100" />
              )}
            </>
          )}
          className="rounded-lg border-2 border-input bg-white"
        />
      </View>
    </View>
  );
}
