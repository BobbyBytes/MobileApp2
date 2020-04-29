import React, { useState } from 'react'
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

const HomeScreen = ({navigation}) => {


  return <View style={styles.container}>
    <View style={styles.buttonContainer}>
      <Button
        onPress = {() => navigation.navigate("GroceryLists")}
        title = "Make List"
        />
        </View>

    <View style={styles.buttonContainer}>
        <Button
          onPress = {() => navigation.navigate("SetStore")}
          title = "Set Store"
          />
     </View>

     <View style={styles.buttonContainer}>
         <Button
           onPress = {() => navigation.navigate("Preferences")}
           title = "Preferences"
           />
      </View>

   </View>
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
  buttonContainer: {
  margin: 30
  },
});

export default HomeScreen;
