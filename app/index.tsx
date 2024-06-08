import { AppState, FlatList, TouchableOpacity, View } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { Link, Stack } from 'expo-router';

import { useWins } from '~/hooks/use-wins';
import { Win } from '~/model/win';
import { WinItem } from '~/components/win-item';
import { Text } from '~/components/text';
import { HeaderBorder, HeaderTitle } from '~/components/header';
import { Settings } from 'lucide-react-native';
import { colors } from '~/constants/colors';
import { StreakSection } from '~/components/streak-section';

import dayjs from 'dayjs';
import { TableName } from '~/model/schema';
import { WinsSection } from '~/components/wins-section';
import { useEffect, useRef, useState } from 'react';
import { storage } from '~/utils/mmkv';
import { weeksAgoFromToday } from '~/utils/date';

// TODO: Streak feature

export default function Index() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (appState) => {
      if (appState !== 'active') return;

      const streak = storage.getNumber('streak.count') ?? 0;

      // If no streak, no need to reset streak
      if (!streak) return;

      const recentWinsDatesString = storage.getString(
        'streak.recent_wins_dates',
      );

      if (!recentWinsDatesString) return;

      const recentWinsDates = JSON.parse(recentWinsDatesString) as string[];
      const lastWinDate = recentWinsDates[recentWinsDates.length - 1];

      const weeksAgo = weeksAgoFromToday(lastWinDate);

      // If last win is this week, no need to reset streak
      if (weeksAgo === 0) return;

      // If last win is two weeks ago, reset streak
      if (weeksAgo >= 2) storage.set('streak.count', 0);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => <HeaderTitle>AWinAWeek</HeaderTitle>,
          headerLeft: () => (
            <Link href="/settings" asChild>
              <TouchableOpacity className="-ml-2 p-2">
                <Settings color={colors['brand-blue'].primary} />
              </TouchableOpacity>
            </Link>
          ),
          headerShadowVisible: false,
        }}
      />
      <HeaderBorder />

      <View className="px-6">
        <StreakSection />
        <WinsSection />
      </View>
    </>
  );
}
