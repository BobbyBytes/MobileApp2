import React from 'react'
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

const GroceryListsScreen = ({navigation}) => {

  return <View style={styles.container}>
    <View style={styles.buttonContainer}>
      <Button
          onPress = {() => navigation.navigate("GroceryList")}
          title = "Make List"
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

export default GroceryListsScreen;
