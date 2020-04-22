import React from 'react'
import {View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';

const ShowListScreen = ( { navigation } ) => {
  const id_one = navigation.getParam('id_one');
  const id_two = navigation.getParam('id_two');

//helper function
const save_list_func = () => {
  Alert.alert(`List saved!!`);
  //retrieveData();

  //get date and use date as key
  var full_date;
  var month = new Date().getMonth() + 1;
  //Gets day of the month
  var day = new Date().getDate();
  var year = new Date().getFullYear();
  var min = new Date().getMinutes();
  full_date = month + '/' + day + '/' + year + '/' + min;
  storeData(full_date);
  //retrieveData(full_date);
  //get_keys();
  //delete_keys();
}

const storeData = async (full_date) => {
  try {
    await AsyncStorage.setItem(full_date, JSON.stringify(id_one));
  } catch (error) {
    // Error saving data
  }
};
/*
const retrieveData = async (full_date) => {
  try {
    const value = await AsyncStorage.getItem(full_date);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
*/
const get_keys = () => {
  var keys = [];
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
        console.log(key);
        console.log(value);
      });
    });
  });
}

const delete_keys = () => {
  let keys = [];
  AsyncStorage.multiRemove(keys, err => {
    // keys k1 & k2 removed, if they existed
    // do most stuff after removal (if you want)
  });
}


return(
<View style={styles.container}>

    <View style={styles.container}>
      <FlatList
       keyExtractor={(item) => item}
        vertical
        showsVerticalScrollIndicator = {false}
        data = {id_one}
        renderItem={({ item }) => {
            return (
                 <Text style= {styles.textStyle}>{item}</Text>
            );
        }}
        />
       </View>

    <View>
        <Text style={styles.textStyle_two}> Number of items: {id_one.length}</Text>
    </View>

    <View>
        <Text style={styles.textStyle_two}> Expected Total: {id_two}</Text>
    </View>

      <View style={styles.buttonContainer}>
         <Button
           onPress = {() => save_list_func()}
           title = "Save List"
           />
        </View>

      <View style={styles.buttonContainer}>
          <Button
            onPress = {() => navigation.navigate("Reminder")}
            title = "Set Reminder"
           />
        </View>
  </View>

)
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
container_two: {
  flex: 1,
  justifyContent: 'center',
},

textStyle: {
 fontSize: 40,
},

textStyle_two: {
 fontSize: 20,
},

buttonContainer: {
  margin: 20
  },
});
export default ShowListScreen;
