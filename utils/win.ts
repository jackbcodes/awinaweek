import { Alert } from 'react-native';

export function showDeleteWinAlert(onDelete: () => void) {
  Alert.alert(
    'Delete win?',
    'This will delete this win permanently. You cannot undo this action.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
        style: 'destructive',
      },
    ],
    { cancelable: true },
  );
}
