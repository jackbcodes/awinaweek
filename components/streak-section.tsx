import { Q } from '@nozbe/watermelondb';
import { useDatabase } from '@nozbe/watermelondb/react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from '~/components/text';
import { useWins } from '~/hooks/use-wins';
import { TableName } from '~/model/schema';
import { Win } from '~/model/win';

import dayjs from 'dayjs';

// Do I save the created date in UTC or local time?
// I think it's better to save it in UTC
// and then convert it to local time when displaying it
// so that it's always in the same timezone
// and it's easier to compare it with the current time

export function StreakSection() {
  const wins = useWins();

  const pastTwoMonths = [7, 6, 5, 4, 3, 2, 1, 0].map((week) => {
    return dayjs()
      .isoWeek(dayjs().isoWeek() - week)
      .day(1);
  });

  return (
    <>
      <View className="mt-9 w-full flex-row items-center justify-between">
        <Text className="font-brand-bold text-2xl">Streak</Text>
        <Text className="font-brand-bold text-sm text-stone-600">4 weeks</Text>
      </View>
      <View>
        <View className="w-full h-full bg-gray-300 rounded-lg absolute left-[2px] top-[2px]" />
        <View className="border-2 rounded-lg border-gray-300 bg-white flex-row items-center justify-between p-4">
          {pastTwoMonths.map((date) => (
            <View key={date.toISOString()}>
              <Text className="mx-auto mb-1 font-brand-light text-xs text-stone-600">
                {date.format('MMM')}
              </Text>
              <View>
                <View className="w-full h-full bg-streak-achieved rounded-lg absolute left-[1px] top-[1px]" />
                <View className="border-2 rounded-lg border-streak-achieved h-8 w-8 bg-white">
                  <Text className="mx-auto my-auto font-brand-bold mt-0.5 text-streak-achieved">
                    {date.format('D')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
