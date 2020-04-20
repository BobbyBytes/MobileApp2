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
  //console.log("In showscreen");
  //console.log(id_two);
  storeData();
  //retrieveData();

}

const storeData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(id_one));
  } catch (error) {
    // Error saving data
  }
};

/*
const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
*/

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
