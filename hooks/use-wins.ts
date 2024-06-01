import { useEffect, useState } from 'react';

import { useDatabase } from '@nozbe/watermelondb/react';

import { TableName } from '~/model/schema';
import { Win } from '~/model/win';

export function useWins() {
  const database = useDatabase();
  const [wins, setWins] = useState<Win[] | [] | undefined>([]);

  useEffect(() => {
    const subscription = database.collections
      .get<Win>(TableName.Wins)
      .query()
      .observe()
      .subscribe((data) => {
        setWins(data);
      });

    return () => subscription.unsubscribe();
  }, [database]);

  return wins;
}
