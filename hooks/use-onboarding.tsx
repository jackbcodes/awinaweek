import { useMMKVBoolean } from 'react-native-mmkv';

export function useOnboarding() {
  const [isComplete, setIsComplete] = useMMKVBoolean('onboarding.isComplete');

  const complete = () => {
    setIsComplete(true);
  };

  const reset = () => {
    setIsComplete(false);
  };

  return { isComplete, complete, reset };
}
