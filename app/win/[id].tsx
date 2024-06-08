import { Text } from 'react-native';

import { useWin } from '~/hooks/use-win';

export default function WinId() {
  const win = useWin();

  if (!win) return <Text>Loading...</Text>;

  return (
    <>
      <Text>{win.id}</Text>
      <Text>{win.title}</Text>
      <Text>{win.description}</Text>
      <Text>{win.localCreatedAtDate}</Text>
    </>
  );
}
