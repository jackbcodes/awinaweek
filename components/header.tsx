import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { Text } from '~/components/text';
import { colors } from '~/constants/colors';

export const HeaderBack = () => (
  <Link href=".." asChild>
    <TouchableOpacity className="-ml-2 flex-row p-2">
      <ChevronLeft color={colors['brand-blue'].primary} />
      <Text className="top-0.5 font-brand-semibold text-brand-blue-primary">
        Back
      </Text>
    </TouchableOpacity>
  </Link>
);

type HeaderTitleProps = {
  children: string;
};

export const HeaderTitle = (props: HeaderTitleProps) => (
  <Text className="font-brand-bold text-lg">{props.children}</Text>
);

import { View } from 'react-native';

export const HeaderBorder = () => (
  <View className="h-0.5 w-full bg-brand-gray" />
);
