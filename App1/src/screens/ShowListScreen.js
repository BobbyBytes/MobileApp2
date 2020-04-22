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

  //get date and use date as key
  var full_date;
  var month = new Date().getMonth() + 1;
  //Gets day of the month
  var day = new Date().getDate();
  var year = new Date().getFullYear();
  var min = new Date().getMinutes();
  full_date = month + '/' + day + '/' + year + '/' + min;
  storeData(full_date);
}

const storeData = async (full_date) => {
  try {
    await AsyncStorage.setItem(full_date, JSON.stringify(id_one));
  } catch (error) {
    // Error saving data
    console.log("Error saving data")
  }
};


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
