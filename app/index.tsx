import { Button, FlatList, Pressable, Text, View } from 'react-native';

import { useDatabase } from '@nozbe/watermelondb/react';
import { Link } from 'expo-router';

import { useWins } from '~/hooks/use-wins';
import { Win } from '~/model/win';

export default function Index() {
  const database = useDatabase();
  const wins = useWins();

  async function createWin() {
    await database.write(async () => {
      try {
        await database.get<Win>('wins').create((win) => {
          win.title = 'New win';
          win.description = 'Lorem ipsum...';
        });
      } catch (error) {
        console.log('Error creating win', error);
      }
    });
  }

  async function deleteWin(id: string) {
    await database.write(async () => {
      try {
        const win = await database.get<Win>('wins').find(id);
        await win.destroyPermanently();
      } catch (error) {
        console.log('Error deleting win', error);
      }
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button title="Create win" onPress={createWin} />
      <FlatList
        data={wins}
        renderItem={({ item }) => (
          <>
            <Text>
              {item.id}, {item.id}
            </Text>
            <Text>{item.title}</Text>
            <Text style={{ marginBottom: 10 }}>{item.description}</Text>
            <Button title="Delete" onPress={() => deleteWin(item.id)} />
            <Link href={`/win/${item.id}`} asChild>
              <Pressable>
                <Text>Open win</Text>
              </Pressable>
            </Link>
          </>
        )}
      />
    </View>
  );
}
