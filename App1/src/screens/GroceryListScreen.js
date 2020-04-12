
import React, { useReducer, useState } from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert, Image } from 'react-native';
import imageDetail from '../components/imageDetail'

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

 //Food list array of tuples
 const food_items = [
 {name: 'eggs:',      image: require('../../assets/eggs.jpg')},
 {name: 'milk:',      image: require ('../../assets/milk.jpg')},
 {name: 'bread:',     image: require('../../assets/eggs.jpg')},
 {name: 'coffee:',    image: require('../../assets/eggs.jpg')},
 {name: 'beer:',      image: require('../../assets/eggs.jpg')},
 {name: 'cheese:',    image: require('../../assets/eggs.jpg')},
 {name: 'broccoli:',  image: require('../../assets/eggs.jpg')},
 {name: 'rice:',      image: require('../../assets/eggs.jpg')},
 {name: 'carrot:',    image: require ('../../assets/eggs.jpg')},
];
const [grocery_items, set_grocery_items] = useState([])
console.log(grocery_items);

//Helper function
const setCounter_increment = (item) => {
  dispatch({type: 'increment', payload: 1})
  Alert.alert(`${item.name} pressed`)
  set_grocery_items([...grocery_items, item.name]);
}
 return (
   <View style={styles.container_one}>
     <FlatList
       vertical
       showsVerticalScrollIndicator = {false}
       data = {food_items}
       keyExtractor={food_item => food_item.name}
       keyExtractor={food_item => food_item.image}
       renderItem={({ item }) => {
           return (
             <TouchableOpacity
                onPress= {() => setCounter_increment(item)}
                >
              <View>
                <Text style= {styles.textStyle}>{item.name}</Text>
                  <Image source={item.image}/>
                 </View>
               </TouchableOpacity>
           );
       }} />

         <FlatList
          keyExtractor={(item) => item}
           vertical
           showsVerticalScrollIndicator = {false}
           data = {grocery_items}
           renderItem={({ item }) => {
               return (
                    <Text style= {styles.textStyle_two}>{item}</Text>
               );
           }}
           />
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
container_one: {
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
 fontSize: 40,
 backgroundColor: "green",
 borderColor: "black",
 borderWidth: 4,
},
textStyle_two: {
 fontSize: 20,
}

});

export default GroceryListScreen;
