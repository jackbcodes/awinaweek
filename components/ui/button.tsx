import * as React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '~/components/ui/text';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> & {
  title: string;
};

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ title, ...props }, ref) => {
  return (
    <Pressable ref={ref} role="button" {...props}>
      <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
      <View className="flex h-14 items-center justify-center rounded-lg border-2 border-input bg-white px-5 py-3 active:opacity-90">
        <Text className="text-sm font-bold text-blue-400">{title}</Text>
      </View>
    </Pressable>
  );
});
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
