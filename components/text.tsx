import { Text as RNText, TextProps } from 'react-native';

export const Text = ({ children, ...props }: TextProps) => (
  <RNText className="font-brand-regular text-base text-stone-800" {...props}>
    {children}
  </RNText>
);
