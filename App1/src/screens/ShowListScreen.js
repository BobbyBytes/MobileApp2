import React from 'react'
import {View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'

const ShowListScreen = ( { navigation } ) => {
  const id_one = navigation.getParam('id_one');
  const id_two = navigation.getParam('id_two');

return(
<View style={styles.container}>

    <View style={styles.container}>
      <FlatList
       keyExtractor={(item) => item}
        vertical
        showsVerticalScrollIndicator = {false}
        data = {id_one}
        renderItem={({ item }) => {
            return (
                 <Text style= {styles.textStyle}>{item}</Text>
            );
        }}
        />
       </View>

    <View style={styles.buttonContainer}>
       <Button
         onPress = {() => navigation.navigate("Reminder")}
         title = "Set Reminder"
         />
      </View>
  </View>

)
 //console.log("ShowListScreen:");
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},

textStyle: {
 fontSize: 40,
},

buttonContainer: {
  margin: 30
  },
});
export default ShowListScreen;
