import React from "react";
import MapView from "react-native-maps";
import { View, Text, StyleSheet, FlatList, Dimensions, AsyncStorage, Button } from "react-native";


const SetStoreScreen = () => {
  return (
    <View style={styles.myFlexContainerColumn}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 42.551884,
            longitude: -71.103507,
            latitudeDelta: 0.5622,
            longitudeDelta: 0.3221
          }}
          maptype={"hybrid"} //Allows points of interest on map
          onLongPress={(e) => _storeData(JSON.stringify(e.nativeEvent.coordinate))}
          provider={"google"} //Force google maps for now
        ></MapView>
      </View>
      <View style={styles.buttonStyle}>
        <Button
        title = "StoreData"
        backgroundColor = "white"
        onPress = {() => _storeData()}
        height = "100"
        ></Button>
        <Button
        title = "LoadData"
        backgroundColor = "white"
        onPress = {() => _retrieveData()}
        height = "100"
        ></Button>
      </View>
    </View>
  );
};
//Store Persistant Data function
_storeData = async (coordinate) => {
  try {
    await AsyncStorage.setItem('TASKS', coordinate);
    alert("Location Stored")
  } catch (error) {
    // Error saving data
  }
};
//Retrieve Persistant data function
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // We have data!!
      alert("Saved Loactation: \n\n" + value);
    }
  } catch (error) {
    // Error retrieving data
  }
};
//Test function
function printCoordinate(coordinate){
  //Print test data
  alert(coordinate);
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
myFlexContainerColumn: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center'
},
buttonStyle: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  height: 1,
  justifyContent: "center"
}
});
export default SetStoreScreen;
