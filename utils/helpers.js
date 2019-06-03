import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY } from '../constants/StorageKeys';
import { Permissions, Notifications } from 'react-native';

export function newDeck(title) {
  return {
    title,
    questions: [],
  };
}

export async function askAndSetForLocalNotifications(addDay) {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus === 'granted') {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + addDay);
    currentDate.setHours(20);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);

    Notifications.scheduleLocalNotificationAsync(
      {
        title: "Mobile Flashcards",
        body: 'We missed you today, solve a quiz everyday to sharpen your knowledge.',
      },
      {
        repeat: "day",
        time: currentDate,
      },
    );
  }
}

export async function cancelTodaysNotification() {
  Notifications.dismissAllNotificationsAsync();
  askAndSetForLocalNotifications(1);
}
