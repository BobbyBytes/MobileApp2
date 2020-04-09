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
  {name: 'eggs:'},
  {name: 'milk:'},
  {name: 'bread:'},
  {name: 'coffee:'},
  {name: 'beer:'},
  {name: 'cheese:'},
  {name: 'broccoli:'},
  {name: 'rice:'},
  {name: 'carrot:'},
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
                <View style={styles.container}>
                    <Text style= {styles.textStyle}>{item.name}
                      </Text>
                  <View style={styles.buttonContainer_one}>
                    <Button onPress ={console.log("FlatList button QTY pressed")}
                    title = "QTY Increase:"/>
                    </View>
                    <View style={styles.buttonContainer_one}>
                      <Button onPress ={console.log("FlatList button QTY pressed")}
                      title = "QTY Decrease:"/>
                      </View>
                </View>
            );
        }} />

      <View style={styles.buttonContainer_two}>
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
buttonContainer_one: {
  marginRight: 250,
  margin: 20,
  justifyContent: 'flex-start'
},
buttonContainer_two: {
  margin: 30
  },
textStyle: {
  fontSize: 15,
  //marginVertical: 30
}
});

export default GroceryListScreen;
