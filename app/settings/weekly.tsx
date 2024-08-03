import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Switch } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { useNotification } from '~/components/notification-provider';
import { Check } from '~/components/ui/icons';
import { Text } from '~/components/ui/text';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function WeeklyReminder() {
  const [date, setDate] = useState(new Date());
  const { trigger, schedule, cancel } = useNotification();

  useEffect(() => {
    if (!trigger) return;

    const now = new Date();
    now.setHours(trigger.hour);
    now.setMinutes(trigger.minute);
    setDate(now);
  }, [trigger]);

  return (
    <View className="gap-8 bg-secondary/30 px-6 py-4">
      <View>
        <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
        <View className="flex-row items-center justify-between overflow-hidden rounded-lg border-2 border-input bg-white px-4 py-3">
          <Text className="text-lg">Weekly reminder</Text>
          <Switch
            onValueChange={trigger ? () => cancel() : () => schedule()}
            value={Boolean(trigger)}
          />
        </View>
      </View>

      {trigger && (
        <View className="gap-8">
          <View className="gap-2">
            <Text className="ml-4 text-sm text-muted-foreground">DAY</Text>
            <View>
              <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
              <View className="overflow-hidden rounded-lg border-2 border-input bg-white">
                {DAYS.map((day, index) => (
                  <View key={day}>
                    <Pressable
                      onPress={() => {
                        schedule({
                          ...trigger,
                          // Expo counts Sunday as 1, Monday as 2, etc
                          weekday: index === 6 ? 1 : index + 2,
                        });
                      }}
                      className="flex-row items-center justify-between px-4 py-3 active:bg-gray-100"
                    >
                      <Text className="text-lg">{day}</Text>
                      {day ===
                        DAYS[
                          trigger.weekday === 1 ? 6 : trigger.weekday - 2
                        ] && <Check height={20} />}
                    </Pressable>
                    {index !== DAYS.length - 1 && (
                      <View className="ml-4 h-0.5 w-full text-clip bg-gray-100" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className="gap-2">
            <Text className="ml-4 text-sm text-muted-foreground">TIME</Text>
            <View>
              <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
              <View className="flex-row items-center justify-between rounded-lg border-2 border-input bg-white px-4 py-3">
                <Text className="text-lg">Time</Text>
                <DateTimePicker
                  value={date}
                  mode="time"
                  display="clock"
                  minuteInterval={15}
                  onChange={(_event, selectedDate) => {
                    if (selectedDate) {
                      schedule({
                        ...trigger,
                        hour: selectedDate.getHours(),
                        minute: selectedDate.getMinutes(),
                      });
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
