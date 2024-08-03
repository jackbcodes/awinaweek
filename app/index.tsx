import { useEffect } from 'react';
import {
  AppState,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import dayjs from 'dayjs';
import { Link } from 'expo-router';

import { HeaderBorder } from '~/components/header';
import { SectionHeader } from '~/components/section-header';
import { Text } from '~/components/ui/text';
import { WinItem } from '~/components/win-item';
import { useStreak } from '~/hooks/use-streak';
import { useWins } from '~/hooks/use-wins';
import { getPastTwoMonths, isFirstWeekOfMonth } from '~/utils/date';

export default function Index() {
  const wins = useWins();
  const streak = useStreak();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (state) => {
      if (state !== 'active' || !streak) return;

      if (streak.weeksSinceLastUpdate > 1) {
        streak.reset();
        return;
      }
    });

    return () => subscription.remove();
  }, [streak]);

  const dates = getPastTwoMonths();

  function getDateStreakColor(date: dayjs.Dayjs) {
    const isWeekAchieved = streak?.achievedDates.some((achievedDate) =>
      dayjs(achievedDate).isSame(date, 'week'),
    );

    const isWeekPending = dayjs().isSame(date, 'week');

    return isWeekAchieved ? '#fb923c' : isWeekPending ? '#d1d5db' : '#9ca3af';
  }

  return (
    <>
      <HeaderBorder />
      <ScrollView>
        <View className="gap-8 bg-secondary/30 p-6 pb-16">
          <View className="gap-1.5">
            <SectionHeader
              title="Streak"
              headerRight={() => (
                <Text className="text-sm font-bold text-muted-foreground">
                  {streak?.formattedCount}
                </Text>
              )}
            />
            <View>
              <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
              <View className="flex-row items-end justify-between rounded-lg border-2 border-input bg-white p-4">
                {dates.map((date, index) => {
                  const color = getDateStreakColor(date);
                  return (
                    <View
                      key={date.toISOString()}
                      className="items-center gap-1"
                    >
                      {(index === 0 || isFirstWeekOfMonth(date)) && (
                        <Text className="text-sm text-muted-foreground">
                          {date.format('MMM')}
                        </Text>
                      )}
                      <View>
                        <View
                          className="absolute left-px top-px size-full rounded-lg"
                          style={{ backgroundColor: color }}
                        />
                        <View
                          className="aspect-square items-center justify-center rounded-lg border-2 bg-white p-0.5"
                          style={{ borderColor: color }}
                        >
                          <Text className="text-lg font-bold" style={{ color }}>
                            {date.format('D')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          <View className="gap-1.5">
            <SectionHeader
              title="Wins"
              headerRight={() => (
                <Link href="/new" asChild>
                  <TouchableOpacity>
                    <Text className="text-sm font-bold text-blue-400">
                      ADD NEW
                    </Text>
                  </TouchableOpacity>
                </Link>
              )}
            />
            {wins.length > 0 ? (
              <View>
                <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
                <FlatList
                  data={wins}
                  renderItem={({ item, index }) => (
                    <>
                      <WinItem win={item} />
                      {index !== wins.length - 1 && (
                        <View className="ml-4 h-0.5 w-full bg-gray-100" />
                      )}
                    </>
                  )}
                  scrollEnabled={false}
                  className="rounded-lg border-2 border-input bg-white"
                />
              </View>
            ) : (
              <Text className="text-center text-muted-foreground">No wins</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
