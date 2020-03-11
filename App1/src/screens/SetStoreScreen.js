import React from "react";
import MapView from "react-native-maps";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

const SetStoreScreen = () => {
  return (
    <View>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 42.551884,
            longitude: -71.103507,
            latitudeDelta: 0.5622,
            longitudeDelta: 0.3221
          }}
          maptype={"hybrid"}
          //onLongPress={(e) => alert("help")}
          onLongPress={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          provider={"google"}
        ></MapView>
      </View>
    </View>
  );
};

function onLongPress({ coordinate: LatLng, position: Point }) {
  console.error("sddfdsf");
  Alert.alert("Hey it's an updated message Robert");
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
export default SetStoreScreen;
