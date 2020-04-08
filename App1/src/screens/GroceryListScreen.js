import React, { useReducer } from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert } from 'react-native';

const reducer = (state, action) => {
  // state === {count: number }
  // action === {type: 'increment', || 'decrement', payload: 1}
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + action.payload };
    case 'decrement':
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }

};

const GroceryListScreen = ({navigation}) => {
  const[state, dispatch] = useReducer(reducer, {count: 0})
  const food_items = [
  {name: 'Food Item #1'},
  {name: 'Food Item #2'},
  {name: 'Food Item #3'},
  {name: 'Food Item #4'},
  {name: 'Food Item #5'},
  {name: 'Food Item #6'},
  {name: 'Food Item #7'},
  {name: 'Food Item #8'},
  {name: 'Food Item #9'},
];

const setCounter_increment = (item) => {
  dispatch({type: 'increment', payload: 1})
  Alert.alert(`${item.name} pressed`)

}
  return (
    <View style={styles.container}>
      <FlatList
        vertical
        showsVerticalScrollIndicator = {false}
        data = {food_items}
        keyExtractor={food_item => food_item.name}
        renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress= {() => setCounter_increment(item)
                }
                >
                <Text style= {styles.textStyle}>{item.name}</Text>
                </TouchableOpacity>
            );
        }} />


      <View style={styles.buttonContainer}>
        <Button
            onPress = {() => navigation.navigate("Reminder")}
            title = "Set Reminder"
            />
            </View>
              <Text> Current Count: {state.count} </Text>
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

export default GroceryListScreen;
