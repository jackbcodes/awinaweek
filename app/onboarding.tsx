import React, { useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { OnboardingHero } from '~/components/onboarding-hero';
import { Text } from '~/components/ui/text';
import { useOnboarding } from '~/hooks/use-onboarding';

export default function Onboarding() {
  const router = useRouter();
  const onboarding = useOnboarding();

  useEffect(() => {
    if (onboarding.isComplete) router.replace('/');
  }, [onboarding.isComplete, router]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="m-3 rounded-2xl bg-orange-100 px-12">
        <OnboardingHero />
      </View>
      <View className="flex-1 justify-between p-6">
        <View className="px-6">
          <Text className="mb-4 text-center text-4xl font-bold">
            Track your wins, elevate your career
          </Text>
          <Text className="text-center text-lg text-muted-foreground">
            We help you remember your work achievements effortlessly—get ready
            for promotions, pay raises, and more.
          </Text>
        </View>

        <TouchableOpacity onPress={onboarding.complete}>
          <View className="items-center justify-center rounded-xl bg-[#FC943B] px-4 py-3">
            <Text className="font-semibold text-white">Get started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
