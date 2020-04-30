
import React, { useReducer, useState } from 'react'
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Alert, Image } from 'react-native';
import imageDetail from '../components/imageDetail'
import Grocerybear from '../api/Grocerybear';

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

//Helper funtion to query API class for grocery data.
const get_price = async () => {
  var myInstance = new Grocerybear();
  var price_c = await myInstance.search();
  //console.log(price_c);
  var milk = await parseFloat(price_c);
  console.log(milk);
  return milk;
}

const GroceryListScreen = ({navigation}) => {
  const[state, dispatch] = useReducer(reducer, {count: 0})
  const[total, set_total] = useState(0)

  var milk = get_price();
  console.log(milk);

 //Food list array of tuples
 const food_items = [
 {name: 'eggs',      image: require('../../assets/eggs.jpg'), price: 3.25},
 {name: 'milk',      image: require ('../../assets/milk.jpg'), price: 0},
 {name: 'bread',     image: require('../../assets/bread.jpg'), price: 2.99},
 {name: 'coffee',    image: require('../../assets/coffee.jpeg'), price: 11.00},
 {name: 'beer',      image: require('../../assets/beer.jpg'), price: 10.99},
 {name: 'cheese',    image: require('../../assets/cheese.jpg'), price: 5.00},
 {name: 'broccoli',  image: require('../../assets/broccoli.jpg'), price: 2.50},
 {name: 'rice',      image: require('../../assets/rice.jpg'), price: 3.00},
 {name: 'carrot',    image: require ('../../assets/carrot.jpeg'), price: 1.50},
];

 food_items[1].price = milk;

//Array that is constructed and passed to ShowListScreen.js
const [grocery_items, set_grocery_items] = useState([])


//Helper function
const setCounter_increment = (item) => {
  dispatch({type: 'increment', payload: 1})
  Alert.alert(`${item.name} selected`)
  set_grocery_items([...grocery_items, item.name]);
  set_total(total + item.price);
  //console.log(total);

}
 return (
   <View style={styles.container_one}>
     <FlatList
       vertical
       showsVerticalScrollIndicator = {false}
       data = {food_items}
       keyExtractor={food_item => food_item.name.toString()}
       keyExtractor={food_item => food_item.image.toString()}
       keyExtractor={food_item => food_item.price.toString()}

       renderItem={({ item }) => {
           return (
             <TouchableOpacity
                onPress= {() => setCounter_increment(item)}
                >
              <View style={styles.container_two}>
                <Text style= {styles.textStyle}>{item.name}</Text>
                  <Image source={item.image} style={styles.image}/>
                 </View>
               </TouchableOpacity>
           );
       }} />

       <View style={styles.container_three}>
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
          </View>

     <View style={styles.buttonContainer_two}>
       <Button
           onPress = {() => navigation.navigate("ShowList", {id_one: grocery_items, id_two: total})}
           title = "Save List"
           />
           </View>
             <View>
                <Text style= {styles.textStyle_three}> Grocery Item Count: {state.count} </Text>
              </View>
       </View>
     );
};

const styles = StyleSheet.create({
container_one: {
 flex: 1,
 justifyContent: 'center',
},

container_two: {
 flex: 1,
 justifyContent: 'center',
 backgroundColor: "green",
 borderColor: "black",
 borderWidth: 4,
},

container_three: {
 marginRight: 250,
 margin: 20,
 justifyContent: 'flex-start',
 borderColor: "black",
 borderWidth: 4,
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
},

textStyle_two: {
 fontSize: 20,
},

textStyle_three: {
 fontSize: 15,
},

image: {
  flex: 1,
  resizeMode: 'contain',
  width: 400,
  //height: 500,
  justifyContent: 'center',
}

});

export default GroceryListScreen;
