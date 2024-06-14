import { Text, TextInput, View } from 'react-native';

import { Input } from '~/components/ui/input';
import { useWin } from '~/hooks/use-win';
import { cn } from '~/utils/cn';

export default function WinId() {
  const win = useWin();

  if (!win) return <Text>Loading...</Text>;

  return (
    <View className="gap-2 bg-secondary/30 p-6">
      <TextInput className="text-2xl font-bold" autoFocus />
      <Text className="text-2xl font-bold">{win.title}</Text>
      <Text>{win.description}</Text>
    </View>
  );
}
