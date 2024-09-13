import { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Switch } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Menu, MenuItem, MenuItemBorder } from '~/components/menu';
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
    <ScrollView>
      <View className="gap-8 bg-secondary/30 px-6 py-4">
        <Menu>
          <MenuItem className="flex-row items-center justify-between">
            <Text className="text-lg">Weekly reminder</Text>
            <Switch
              onValueChange={trigger ? () => cancel() : () => schedule()}
              value={Boolean(trigger)}
            />
          </MenuItem>
        </Menu>

        {trigger && (
          <View className="gap-8">
            <Menu title="DAY">
              {DAYS.map((day, index) => (
                <Fragment key={day}>
                  <MenuItem
                    onPress={() => {
                      schedule({
                        ...trigger,
                        // Expo counts Sunday as 1, Monday as 2, etc
                        weekday: index === 6 ? 1 : index + 2,
                      });
                    }}
                    className="flex-row items-center justify-between"
                  >
                    <Text className="text-lg">{day}</Text>
                    {day ===
                      DAYS[trigger.weekday === 1 ? 6 : trigger.weekday - 2] && (
                      <Check height={20} />
                    )}
                  </MenuItem>
                  {index !== DAYS.length - 1 && <MenuItemBorder />}
                </Fragment>
              ))}
            </Menu>
            <Menu title="TIME">
              <MenuItem className="flex-row items-center justify-between">
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
              </MenuItem>
            </Menu>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
