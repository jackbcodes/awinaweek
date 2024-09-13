import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, Platform, Alert } from 'react-native';

import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

interface Trigger {
  weekday: number;
  hour: number;
  minute: number;
}

interface NotificationContextValue {
  trigger?: Trigger;
  schedule: (trigger?: Trigger) => void;
  cancel: () => void;
}

const NotificationContext = createContext<NotificationContextValue>({
  schedule: () => {},
  cancel: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [trigger, setTrigger] = useState<Trigger | undefined>();
  const [defaultTrigger, setDefaultTrigger] = useState<Trigger>({
    weekday: 5,
    hour: 15,
    minute: 0,
  });

  const checkNotificationsEnabled = async () => {
    if (!Device.isDevice) return;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    try {
      let permissions = await Notifications.getPermissionsAsync();

      if (permissions.status !== 'granted') {
        permissions = await Notifications.requestPermissionsAsync();
      }

      setIsEnabled(
        permissions.granted ||
          permissions.ios?.status ===
            Notifications.IosAuthorizationStatus.PROVISIONAL,
      );
    } catch (error) {
      console.error(
        'Error getting or requesting notification permissions',
        error,
      );
    }
  };

  const schedule: NotificationContextValue['schedule'] = async (trigger) => {
    if (!isEnabled) {
      Alert.alert(
        'Turn On Notifications',
        'Notifications have been disabled for this app. Please enable notifications in your device settings.',
        [
          {
            text: 'Settings',
            onPress: Linking.openSettings,
          },
          {
            text: 'OK',
            isPreferred: true,
          },
        ],
      );
      return;
    }

    const newTrigger = trigger ?? defaultTrigger;

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Don't lose your streak 🔥",
          body: 'Add a win this week to save your streak',
        },
        trigger: {
          ...newTrigger,
          repeats: true,
        },
      });

      setTrigger(newTrigger);
      setDefaultTrigger(newTrigger);
    } catch (error) {
      console.error('Error scheduling notification', error);
    }
  };

  const cancel: NotificationContextValue['cancel'] = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      setTrigger(undefined);
    } catch (error) {
      console.error('Error canceling notifications', error);
    }
  };

  const getNotification = async () => {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    if (!notifications.length) {
      setTrigger(undefined);
      return;
    }

    const notification = notifications[0];

    if (notification.trigger.type !== 'calendar') {
      throw new Error('Notification is not type calendar');
    }

    const { weekday, hour, minute = 0 } = notification.trigger.dateComponents;

    if (!weekday || !hour) {
      throw new Error('Notification weekday or hour is missing');
    }

    setTrigger({ weekday, hour, minute });
  };

  useEffect(() => {
    checkNotificationsEnabled();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state !== 'active') return;
      checkNotificationsEnabled();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    getNotification();
  }, [isEnabled]);

  return (
    <NotificationContext.Provider
      value={{
        trigger,
        schedule,
        cancel,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
