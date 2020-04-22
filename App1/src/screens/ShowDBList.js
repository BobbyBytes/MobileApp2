import React from 'react'
import {View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const ShowDBList = ( {navigation} ) => {
  var id_one = navigation.getParam('id_one');

  //https://www.dyn-web.com/javascript/strings/split.php
  var output_arr = id_one.split(',');

  //Delete key helper function
  const delete_keys = () => {
    console.log("delete_keys called");
    let keys = ['@MySuperStore:key', '@MySuperStore:key1'];
    AsyncStorage.multiRemove(keys, err => {
      // keys k1 & k2 removed, if they existed
      // do most stuff after removal (if you want)
    });
  }



return(
<View>
        <View style={styles.container}>
          <FlatList
           keyExtractor={(item) => item}
            vertical
            showsVerticalScrollIndicator = {false}
            data = {output_arr}
            renderItem={({ item }) => {
                return (
                     <Text style= {styles.textStyle}>{item}</Text>
                );
            }}
            />
           </View>

</View>

  )

};

const styles = StyleSheet.create({
container: {
  //flex: 1,
  //justifyContent: 'center',
},
textStyle: {
 fontSize: 20,
},
buttonContainer: {
margin: 30
},

});

export default ShowDBList;
