import React from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';

const GroceryListsScreen = ({navigation}) => {

const lists = [
{name: 'List 1'},
{name: 'List 2'},
{name: 'List 3'},
{name: 'List 4'},
{name: 'List 5'},
{name: 'List 6'},
{name: 'List 7'},
{name: 'List 8'},
{name: 'List 9'},
{name: 'List 10'},
];
  return (
    <View style={styles.container}>
      <FlatList
        vertical
        showsVerticalScrollIndicator = {false}
        data = {lists}
        keyExtractor={list => list.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress= {() => console.log(`List ${item.name} pressed`)
              }
              >
              <Text style= {styles.textStyle}>{item.name}</Text>
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
