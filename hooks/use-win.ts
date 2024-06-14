import { useEffect, useState } from 'react';

import { useDatabase } from '@nozbe/watermelondb/react';
import { useLocalSearchParams } from 'expo-router';

import { TableName } from '~/model/schema';
import { Win } from '~/model/win';

export function useWin() {
  const database = useDatabase();
  const [win, setWin] = useState<Win | undefined>();
  const { id } = useLocalSearchParams();

  if (typeof id !== 'string') throw new Error('No win id provided');

  useEffect(() => {
    const subscription = database
      .get<Win>(TableName.Wins)
      .findAndObserve(id)
      .subscribe((data) => {
        setWin(data);
      });

    return () => subscription.unsubscribe();
  }, [database, id]);

  return win;
}
