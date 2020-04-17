import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import GroceryListsScreen from "./src/screens/GroceryListsScreen"
import SetStoreScreen from "./src/screens/SetStoreScreen"
import PreferencesScreen from "./src/screens/PreferencesScreen"
import GroceryListScreen from "./src/screens/GroceryListScreen"
import ReminderScreen from "./src/screens/ReminderScreen"
import ShowListScreen from "./src/screens/ShowListScreen"
import * as firebase from 'firebase';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxfb9miMdmQuqsvDS1wWZOcznNTPfY9kA",
  authDomain: "groceryhero.firebaseapp.com",
  databaseURL: "https://groceryhero.firebaseio.com",
  projectId: "groceryhero",
  storageBucket: "groceryhero.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    GroceryLists: GroceryListsScreen,
    SetStore: SetStoreScreen,
    Preferences: PreferencesScreen,
    GroceryList: GroceryListScreen,
    Reminder: ReminderScreen,
    ShowList: ShowListScreen,
    
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
    title: "App"
    }
  }
);

export default createAppContainer(navigator);
