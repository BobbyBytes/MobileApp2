import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="Press me buddy"
        color="#f194ff"
        onPress={() => Alert.alert("Hey it's an updated message Robert")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
