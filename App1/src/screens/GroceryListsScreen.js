import React, { useState } from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

const GroceryListsScreen = ({navigation}) => {
  var lists = [];

  //Retrieve data helper function
  const retrieveData = async (item) => {
    try {
      const value = await AsyncStorage.getItem(item);
      if (value !== null) {
        // We have data!!
        console.log(value);
        console.log("Retrieve pressed");
        navigation.navigate("ShowDB", {id_one: value});
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  //Get keys helper function
  const get_keys = () => {
    var keys = [];
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          lists.push(key);
          //console.log("in Grocery Lists screen")
          //console.log(key);
          //console.log(value);
          console.log(lists);
        });
      });
    });
  }

  get_keys();


  return (
    <View style={styles.container}>
      <FlatList
        vertical
        showsVerticalScrollIndicator = {false}
        data = {lists}
        keyExtractor={list => list}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress= {() => retrieveData(item)
              }
              >
              <Text style= {styles.textStyle}>{item}</Text>
              </TouchableOpacity>
          );
        }}
        />
      <View style={styles.buttonContainer}>
      <Button
          onPress = {() => navigation.navigate("GroceryList")}
          title = "Make List"
          />
          </View>

        </View>
    );
};

const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: 'center',
},
  buttonContainer: {
  margin: 30
  },
  textStyle: {
  marginVertical: 30
}
});

export default GroceryListsScreen;
