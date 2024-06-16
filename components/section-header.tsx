import { View } from 'react-native';

import { Text } from '~/components/ui/text';

interface SectionHeaderProps {
  title: string;
  headerRight: () => React.ReactNode;
}

export function SectionHeader({
  title,
  headerRight: HeaderRight,
}: SectionHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className="text-2xl font-semibold">{title}</Text>
      <HeaderRight />
    </View>
  );
}
