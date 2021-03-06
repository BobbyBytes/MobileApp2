import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

class MapInput extends React.Component {
   render () {
     return (
       <GooglePlacesAutocomplete
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
             color: '#5d5d5d',
             fontSize: 16
           },
           predefinedPlacesDescription: {
             color: '#1faadb'
           },
         }}
         currentLocation={false}
       />
     )
   }
}
