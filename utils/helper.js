import AsyncStorage from '@react-native-community/async-storage'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'UdaciFlashCards:notifications'


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                let trigger = new Date()
                trigger.setDate(trigger.getDate() + 1)
                trigger.setHours(9)
                trigger.setMinutes(0)
                
                Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Attempt your quiz!",
                      body: "👋 don't forget to complete at least one quiz for today!",
                      vibrate: true
                    },
                    trigger
                  });
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
