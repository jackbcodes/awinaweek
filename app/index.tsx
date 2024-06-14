import { useEffect } from 'react';
import { AppState, View } from 'react-native';

import { HeaderBorder } from '~/components/header';
import { StreakSection } from '~/components/streak-section';
import { WinsSection } from '~/components/wins-section';
import { useStreak } from '~/hooks/use-streak';

export default function Index() {
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

  return (
    <>
      <HeaderBorder />
      <View className="gap-8 bg-secondary/30 p-6">
        {/* <View className="gap-2">
          <Button>
            <Text>Default</Text>
          </Button>
          <Button variant="destructive">
            <Text>Destructive</Text>
          </Button>
          <Button variant="outline">
            <Text>Outline</Text>
          </Button>
          <Button variant="secondary">
            <Text>Secondary</Text>
          </Button>
          <Button variant="ghost">
            <Text>Ghost</Text>
          </Button>
          <Button variant="link">
            <Text>Link</Text>
          </Button>

          <Input
            placeholder="Write some stuff..."
            value={value}
            onChangeText={onChangeText}
            aria-labelledbyledBy="inputLabel"
            aria-errormessage="inputError"
          />

          <Textarea
            placeholder="Write some stuff..."
            value={value}
            onChangeText={setValue}
            aria-labelledby="textareaLabel"
          />
        </View> */}

        <StreakSection />
        <WinsSection />
      </View>
    </>
  );
}
