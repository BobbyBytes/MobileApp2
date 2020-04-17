import React from 'react'
import {View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { Notifications } from 'expo';
import { Permissions } from 'expo-permissions';
import Constants from 'expo-constants';




const ReminderScreen = () => {
  return (
<View style={styles.buttonContainer}>
  <View style={styles.buttonContainer}>
    <Button
      onPress = {() => scheduleNotification_One() }
      title = "Constant Reminder"
      />
      </View>

  <View style={styles.buttonContainer}>
    <Button
      onPress = {() => scheduleNotification_Two() }
      title = "Remind me in 15 minutes"
       />
     </View>

    <View style={styles.buttonContainer}>
      <Button
        onPress = {() => scheduleNotification_Three() }
        title = "Remind me in 30 minutes"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress = {() => scheduleNotification_Four() }
          title = "Remind me in an hour"
          />
        </View>


    <View style={styles.buttonContainer}>
      <Button
         onPress = {() =>  cancelAllScheduledNotifications()}
        title = "Cancel Notifications"

        />
          </View>
      </View>
    );
};

//https://fyndx.io/react/local-notifications-in-expo/ code for permission and notifications from this website.
const scheduleNotification_One = async () => {
  //this.alertIfRemoteNotificationsDisabledAsync();
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Bring Grocery Bags!!!!",
      body: 'Did you remember your grocery bags???',
    },
    {
      repeat: 'minute',
      time: new Date().getTime() + (1 * 1000),
    },
  );
  Alert.alert("Notification Set")
};

const scheduleNotification_Two = async () => {
  //this.alertIfRemoteNotificationsDisabledAsync();
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Bring Grocery Bags!!!!",
      body: 'Did you remember your grocery bags???',
    },
    {
      repeat: 'minute',
      time: new Date().getTime() + (900 * 1000),
    },
  );
  Alert.alert("Notification Set")
};

const scheduleNotification_Three = async () => {
  //this.alertIfRemoteNotificationsDisabledAsync();
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Bring Grocery Bags!!!!",
      body: 'Did you remember your grocery bags???',
    },
    {
      repeat: 'minute',
      time: new Date().getTime() + (1800 * 1000),
    },
  );
  Alert.alert("Notification Set")
};

const scheduleNotification_Four = async () => {
  //this.alertIfRemoteNotificationsDisabledAsync();
  let notificationId = Notifications.scheduleLocalNotificationAsync(
    {
      title: "Bring Grocery Bags!!!!",
      body: 'Did you remember your grocery bags???',
    },
    {
      repeat: 'minute',
      time: new Date().getTime() + (3600 * 1000),
    },
  );
  Alert.alert("Notification Set")
};


//https://docs.expo.io/versions/latest/sdk/permissions/
 async function alertIfRemoteNotificationsDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Hey! You might want to enable notifications for my app, they are good.');
  }
}


//Turn off notifications
const cancelAllScheduledNotifications = async  () => {
  let notificationId = Notifications.cancelAllScheduledNotificationsAsync()

  Alert.alert("Cancel Notifications")
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
  buttonContainer: {
  margin: 30
  },
});
export default ReminderScreen;
