import { useEffect } from 'react';
import { AppState, FlatList, View } from 'react-native';

import dayjs from 'dayjs';
import { Link } from 'expo-router';

import { HeaderBorder } from '~/components/header';
import { Text } from '~/components/ui/text';
import { WinItem } from '~/components/win-item';
import { useStreak } from '~/hooks/use-streak';
import { useWins } from '~/hooks/use-wins';
import { getPastTwoMonths, isFirstWeekOfMonth } from '~/utils/date';

interface SectionHeaderProps {
  title: string;
  headerRight: React.ReactNode;
}

function SectionHeader({ title, headerRight }: SectionHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="text-2xl font-semibold">{title}</Text>
      {headerRight}
    </View>
  );
}

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
      <View className="gap-8 bg-secondary/30 p-6">
        <View className="gap-1">
          <SectionHeader
            title="Streak"
            headerRight={
              <Text className="text-xs font-bold text-muted-foreground">
                {streak?.formattedCount}
              </Text>
            }
          />
          <View>
            <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
            <View className="flex-row items-end justify-between rounded-lg border-2 border-input bg-white p-4">
              {dates.map((date, index) => {
                const color = getDateStreakColor(date);
                return (
                  <View key={date.toISOString()} className="items-center gap-1">
                    {(index === 0 || isFirstWeekOfMonth(date)) && (
                      <Text className="text-xs text-muted-foreground">
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
                        <Text className="font-bold" style={{ color }}>
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

        <View className="gap-1">
          <SectionHeader
            title="Wins"
            headerRight={
              <Link href="/new">
                <Text className="text-xs font-bold text-blue-400">ADD NEW</Text>
              </Link>
            }
          />
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
      </View>
    </>
  );
}
