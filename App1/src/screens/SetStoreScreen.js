import React, { Component, useRef } from "react";
import MapView, {Circle} from "react-native-maps";
import * as Permissions from 'expo-permissions';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  AsyncStorage,
  Button
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
var myTemp;
const SetStoreScreen = () => {
  alertIfLocationDisabledAsync();
  const inputRef = useRef(null);
  console.log("Mytemp test \n " + myTemp.geometry.location);
  return (
    <View style={styles.transparentStyle}>
      <View style={styles.searchStyle}>
        <GooglePlacesInput
        />
      </View>
      <View style={styles.myFlexContainerColumn}>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: 42.551884,
              longitude: -71.103507,
              latitudeDelta: 0.562,
              longitudeDelta: 0.3221
            }}
            maptype={"hybrid"} //Allows points of interest on map
            onLongPress={e =>
              _storeData(JSON.stringify(e.nativeEvent.coordinate))
              //inputRef.center = { latitude: 48.8152937, longitude: 25.4597668 }

            }
            provider={"google"} //Force google maps for now
            showUserLocation={true}
            showsMyLocationButton={true}
            ref={mapView => {
              _mapView = mapView;
            }}
          >
          <MapView.Circle
          center={{latitude: myTemp.geometry.location.lat, longitude: myTemp.geometry.location.lng}}
          radius={20}
          strokeColor={'rgba(52, 52, 52, 0.4)'}
          strokeWidth={2}
          fillColor={'rgba(255, 52, 52, 0.2)'}
          //ref = {inputRef}
            />
          </MapView>
        </View>
        <View style={styles.buttonStyle}>
          <Button
            title="Load Data"
            backgroundColor="white"
            onPress={() => _retrieveData()}
            height="100"
          ></Button>
        </View>
      </View>
    </View>
      );
};

// Some hardcoded test locations..
const homePlace = {

  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 25.4597668 } }
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};
// One as a temp var, for testing
myTemp = {
  description: "Somewhere",
  geometry: { location: { lat: 18.8496818, lng: 75.2940881 } }
};

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search for store"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      showUserLocation={true}
      showsMyLocationButton={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        //Debug messages
        console.log(data, details)
        if (data.structured_formatting != null){
         myTemp = {
            description: data.structured_formatting.main_text,
            geometry: { location: { lat: details.geometry.location.lat, lng: details.geometry.location.lng} }
          };
        }
        else if(data.description != null){
          myTemp = {
             description: data.description,
             geometry: { location: { lat: data.geometry.location.lat, lng: data.geometry.location.lng} }
           };
        }

        console.log(
          myTemp
        );
        _mapView.animateToRegion(
          {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.012
          },
          1000
        );
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyCxfb9miMdmQuqsvDS1wWZOcznNTPfY9kA",
        language: "en", // language of the results
        types: "establishment" // default: 'geocode' this should show only stores, all we really want for this application
      }}
      styles={{
        textInputContainer: {
          width: "100%"
        },
        description: {
          fontWeight: "bold"
        },
        predefinedPlacesDescription: {
          color: "#1faadb"
        }
      }}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        type: "cafe"
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: "formatted_address",
        fields: "geometry"
      }}
      filterReverseGeocodingByTypes={["establishment"]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[myTemp]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

async function alertIfLocationDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    alert('Hey! You might want to enable your location for my app, I can\'t remind you otherwise.');
  }
}
//Store Persistant Data function
_storeData = async coordinate => {
  try {
    await AsyncStorage.setItem("TASKS", coordinate);
    myTemp = coordinate;
    alert("Location Stored");
  } catch (error) {
    // Error saving data
  }
};
//Retrieve Persistant data function
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem("TASKS");
    if (value !== null) {
      // We have data!!
      alert("Loactation Retrieved: \n\n" + value);
      console.log("Retrieve data test \n" + value);
      return value;
    }
    else{
      value ={
        description: "Work",
        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }}
        return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

//Test function
function printCoordinate(coordinate) {
  //Print test data
  alert(coordinate);
}

//STYLES
const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").height / 2)
  },
  myFlexContainerColumn: {
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  searchStyle: {
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    flex: 1,
    position: 'absolute',
    top: 0,
    width: Dimensions.get("window").width,
  },
  transparentStyle: {
    backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    flex: 1,
    width: Dimensions.get("window").width,
  }
});
export default SetStoreScreen;
