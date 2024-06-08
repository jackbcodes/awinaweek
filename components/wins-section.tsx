import { Q } from '@nozbe/watermelondb';
import { useDatabase } from '@nozbe/watermelondb/react';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/text';
import { useWins } from '~/hooks/use-wins';
import { TableName } from '~/model/schema';
import { Win } from '~/model/win';

import dayjs from 'dayjs';
import { WinItem } from './win-item';
import { storage } from '~/utils/mmkv';
import isoWeek from 'dayjs/plugin/isoWeek';
import { weeksAgoFromToday } from '~/utils/date';

dayjs.extend(isoWeek);

// TODO: Create win with new streak changes and update on index page

export function WinsSection() {
  const database = useDatabase();
  const wins = useWins();

  async function createWin() {
    await database.write(async () => {
      try {
        await database.get<Win>(TableName.Wins).create((win) => {
          win.title = 'New win';
          win.description = 'Lorem ipsum...';
        });

        const newWinDate = dayjs().format('YYYY-MM-DD');
        const recentWinsDatesString = storage.getString(
          'streak.recent_wins_dates',
        );

        if (!recentWinsDatesString) {
          storage.set('streak.count', 1);
          storage.set('streak.recent_wins_dates', JSON.stringify([newWinDate]));
          return;
        }

        const recentWinsDates = JSON.parse(recentWinsDatesString) as string[];
        const lastWinDate = recentWinsDates[recentWinsDates.length - 1];

        const streak = storage.getNumber('streak.count') ?? 0;

        const weeksAgo = weeksAgoFromToday(lastWinDate);

        if (!weeksAgo) return;

        storage.set('streak.count', weeksAgo === 1 ? streak + 1 : 1);

        recentWinsDates.push(newWinDate);

        // Ensure recentWinsDates is never more than 8 items long (2 months)
        if (recentWinsDates.length > 8) recentWinsDates.shift();

        storage.set(
          'streak.recent_wins_dates',
          JSON.stringify(recentWinsDates),
        );
      } catch (error) {
        console.log('Error creating win', error);
      }
    });
  }

  return (
    <>
      <View className="mt-9 w-full flex-row items-center justify-between">
        <Text className="font-brand-bold text-2xl">Wins</Text>
        {/* <Link href="/new" asChild> */}
        <TouchableOpacity className="-mr-2 p-2" onPress={createWin}>
          <Text className="font-brand-bold text-sm text-brand-blue-primary">
            ADD NEW
          </Text>
        </TouchableOpacity>
        {/* </Link> */}
      </View>
      <View>
        <View className="w-full h-full bg-gray-300 rounded-lg absolute left-[2px] top-[2px]" />
        <FlatList
          data={wins}
          renderItem={({ item, index }) => (
            <>
              <WinItem win={item} />
              {index !== wins.length - 1 && (
                <View className="h-0.5 bg-gray-100 w-11/12 mx-auto" />
              )}
            </>
          )}
          className="border-2 rounded-lg border-gray-300 bg-white"
        ></FlatList>
      </View>
    </>
  );
}
