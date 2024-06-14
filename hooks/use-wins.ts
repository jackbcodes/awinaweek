import { useEffect, useState } from 'react';

import { Q } from '@nozbe/watermelondb';
import { useDatabase } from '@nozbe/watermelondb/react';

import { TableName } from '~/model/schema';
import { Win } from '~/model/win';

export function useWins() {
  const database = useDatabase();
  const [wins, setWins] = useState<Win[] | []>([]);

  useEffect(() => {
    const subscription = database
      .get<Win>(TableName.Wins)
      .query(Q.sortBy('created_at', Q.desc))
      .observeWithColumns(['title', 'description', 'created_at'])
      .subscribe((data) => {
        setWins(data);
      });

    return () => subscription.unsubscribe();
  }, [database]);

  return wins;
}
