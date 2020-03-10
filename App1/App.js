import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import GroceryListsScreen from "./src/screens/GroceryListsScreen"
import SetStoreScreen from "./src/screens/SetStoreScreen"
import PreferencesScreen from "./src/screens/PreferencesScreen"
import GroceryListScreen from "./src/screens/GroceryListScreen"
import ReminderScreen from "./src/screens/ReminderScreen"


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    GroceryLists: GroceryListsScreen,
    SetStore: SetStoreScreen,
    Preferences: PreferencesScreen,
    GroceryList: GroceryListScreen,
    Reminder: ReminderScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
    title: "App"
    }
  }
);

export default createAppContainer(navigator);
