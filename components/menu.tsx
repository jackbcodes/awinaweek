import { forwardRef } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

import { cn } from '~/utils/cn';

interface MenuProps {
  title?: string;
  children: React.ReactNode;
}

export function Menu({ title, children }: MenuProps) {
  return (
    <View>
      {title && (
        <Text className="mb-2 ml-4 text-sm text-muted-foreground">{title}</Text>
      )}
      <View>
        <View className="absolute left-[2px] top-[2px] size-full rounded-lg bg-input" />
        <View className="overflow-hidden rounded-lg border-2 border-input bg-white">
          {children}
        </View>
      </View>
    </View>
  );
}

export const MenuItem = forwardRef<
  React.ElementRef<typeof Pressable>,
  PressableProps
>(({ className, onPress, ...props }, ref) => {
  return (
    <Pressable
      className={cn('px-4 py-3', onPress && 'active:bg-gray-100', className)}
      onPress={onPress}
      ref={ref}
      {...props}
    />
  );
});
MenuItem.displayName = 'MenuItem';

export function MenuItemBorder() {
  return <View className="ml-4 h-0.5 w-full bg-gray-100" />;
}
