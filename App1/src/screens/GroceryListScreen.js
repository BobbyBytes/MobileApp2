import React from 'react'
import {View, Text, StyleSheet, FlatList, Button } from 'react-native';

const GroceryListScreen = ({navigation}) => {

  return <View style={styles.container}>
    <View style={styles.buttonContainer}>
      <Button
          onPress = {() => navigation.navigate("Reminder")}
          title = "Set Reminder"
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


export default GroceryListScreen;
