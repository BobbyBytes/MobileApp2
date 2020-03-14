import React from "react";
import MapView from "react-native-maps";
import { View, Text, StyleSheet, FlatList, Dimensions, AsyncStorage, Button } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const SetStoreScreen = () => {
  return (
    <View style={styles.myFlexContainerColumn}>
    <View style={styles.searchStyle}>
    <GooglePlacesInput
placeholder='Enter Location'
minLength={2}
autoFocus={false}
returnKeyType={'default'}
fetchDetails={true}
styles={{
textInputContainer: {
  backgroundColor: 'rgba(0,0,0,0)',
  borderTopWidth: 0,
  borderBottomWidth:0
},
textInput: {
  marginLeft: 0,
  marginRight: 0,
  height: 38,
  color: '#5d565d',
  fontSize: 16
},
predefinedPlacesDescription: {
  color: '#1faadb'
},
}}
currentLocation={true}
/>
    </View>
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
          showUserLocation={true}
          showsMyLocationButton={true}
          ref = {(mapView) => { _mapView = mapView; }}
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

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        //Debug messages
        console.log(data, details);
        console.log("\n Hey it's the latitude \n" + details.geometry.location.lat);
        console.log("\n Hey it's the longitude \n" + details.geometry.location.lng);
        _mapView.animateToRegion({
       latitude: details.geometry.location.lat,
       longitude: details.geometry.location.lng,
       latitudeDelta: .01,
       longitudeDelta: .012
     }, 1000)
        }
      }

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyCxfb9miMdmQuqsvDS1wWZOcznNTPfY9kA',
        language: 'en', // language of the results
        types: 'establishment' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}

      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
        fields: 'geometry',
      }}

      filterReverseGeocodingByTypes={['establishment']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //renderLeftButton={()  => <Text>Something</Text>}
      renderRightButton={() => <Text>Search for store</Text>}
    />
  );
}

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
    height: Dimensions.get("window").width
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
  justifyContent: "center"
},
searchStyle: {
  flex: 4,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center"
}
});
export default SetStoreScreen;
