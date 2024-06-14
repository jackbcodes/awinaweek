import { useEffect, useState } from 'react';

import { useDatabase } from '@nozbe/watermelondb/react';

import { TableName } from '~/model/schema';
import { Streak } from '~/model/streak';

export function useStreak() {
  const database = useDatabase();
  const [streaks, setStreaks] = useState<Streak[] | []>([]);

  useEffect(() => {
    const subscription = database
      .get<Streak>(TableName.Streaks)
      .query()
      .observeWithColumns(['count'])
      .subscribe(setStreaks);

    return () => subscription.unsubscribe();
  }, [database]);

  if (streaks.length > 1) {
    throw new Error('More than one streak found');
  }

  return streaks[0];
}
