import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { Settings } from '~/components/ui/icons';
import { Text } from '~/components/ui/text';

// export const HeaderBack = () => (
//   <Link href=".." asChild>
//     <TouchableOpacity className="-ml-2 flex-row p-2">
//       <ChevronLeft className="fill-blue-400" />
//       <Text className="top-0.5 font-semibold text-blue-400">Back</Text>
//     </TouchableOpacity>
//   </Link>
// );

export const HeaderBorder = () => <View className="h-0.5 w-full bg-input" />;

export function SettingsButton() {
  return (
    <Link href="/settings" asChild>
      <TouchableOpacity>
        <View className="aspect-square pt-0.5">
          <Settings className="text-blue-400" />
        </View>
      </TouchableOpacity>
    </Link>
  );
}
