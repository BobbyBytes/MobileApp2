import React, { useReducer, useState } from 'react'
import {View, Text, StyleSheet, FlatList, Button } from 'react-native';

export default class Grocerybear{

   constructor(){
      this.name = "Grocerybear";
   }
    async search ()
   {
     var val = "milk";
     var val_1 = await this.searchApi(val);
     val_1 = val_1[0];
     val_1 = val_1[Object.keys(val_1)[2]];
     //console.log(val_1);
     return JSON.stringify(val_1);
     //return val_1;
   }

    async searchApi (val) {

     try {
       let response = await fetch('https://grocerybear.com/getitems', {
             body: `{\"city\":\"DC\", \"product\":\"${val}\", \"num_days\": 10}`,
             method: 'post',
             headers: {
             Accept: 'application/json',
                       'api-key': "DE4959608056068AA564EADE7F85FB49A8114A3008BD2AD81222FD5B8BECE79B",
                       'Content-Type': 'application/json',
     },
   });

       let responseJson = await response.json();
       return responseJson;
     } catch (error) {
     console.error(error);
     }

   }

}
