import { View } from 'react-native';

import dayjs from 'dayjs';

import { Text } from '~/components/ui/text';
import { useStreak } from '~/hooks/use-streak';
import { useWins } from '~/hooks/use-wins';
import { cn } from '~/utils/cn';
import { getPastTwoMonths, isFirstWeekOfMonth } from '~/utils/date';

export function StreakSection() {
  const streak = useStreak();

  const dates = getPastTwoMonths();

  return (
    <View className="gap-1">
      <View className="w-full flex-row items-center justify-between">
        <Text className="text-2xl font-semibold">Streak</Text>
        <Text className="text-xs font-bold text-muted-foreground">
          {streak?.formattedCount}
        </Text>
      </View>
      <View>
        <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
        <View className="flex-row items-end justify-between rounded-lg border-2 border-input bg-white p-4">
          {dates.map((date, index) => {
            const isWeekAchieved = streak?.achievedDates.some((achievedDate) =>
              dayjs(achievedDate).isSame(date, 'week'),
            );

            const isWeekPending = dayjs().isSame(date, 'week');

            const colour = isWeekAchieved
              ? 'orange-400'
              : isWeekPending
                ? 'gray-300'
                : 'gray-500';

            const bgColour = `bg-${colour}`;
            const borderColour = `border-${colour}`;
            const textColour = `text-${colour}`;

            return (
              <View key={date.toISOString()} className="items-center gap-1">
                {(index === 0 || isFirstWeekOfMonth(date)) && (
                  <Text className="text-xs text-muted-foreground">
                    {date.format('MMM')}
                  </Text>
                )}
                <View>
                  <View
                    className={cn(
                      bgColour,
                      'absolute left-px top-px size-full rounded-lg',
                    )}
                  />
                  <View
                    className={cn(
                      borderColour,
                      'p-0.5 aspect-square rounded-lg border-2 bg-white items-center justify-center',
                    )}
                  >
                    <Text className={`font-bold ${textColour}`}>
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
  );
}
