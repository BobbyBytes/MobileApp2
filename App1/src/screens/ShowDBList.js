import React from 'react'
import {View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage } from 'react-native';

const ShowDBList = ( {navigation} ) => {
  var id_one = navigation.getParam('id_one');
  var id_two = navigation.getParam('id_two');

  //https://www.dyn-web.com/javascript/strings/split.php
  var output_arr = id_one.split(',');

  //Delete key helper function
  const delete_key = () => {
    console.log("delete_key called" + id_two);
    let keys = ['@MySuperStore:key', id_two];
    AsyncStorage.multiRemove(keys, err => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
    Alert.alert("List Deleted");
    navigation.navigate("Home");
  }

return(
<View style={styles.container}>
        <View>
          <FlatList
           keyExtractor={(item) => item}
            vertical
            showsVerticalScrollIndicator = {false}
            data = {output_arr}
            renderItem={({ item }) => {
                return (
                     <Text style= {styles.textStyle}>{item}</Text>
                );
            }}
            />
           </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress = {() => delete_key()}
              title = "Delete List"
              />
             </View>
</View>

  )
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  //justifyContent: 'center',
},
textStyle: {
 fontSize: 20,
},
buttonContainer: {
  margin: 30
},

});

export default ShowDBList;
