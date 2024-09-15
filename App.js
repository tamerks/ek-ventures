import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { BottomMenu } from "./src/navigation/BottomMenu";
import { Provider } from "react-redux";
import { store } from "./src/redux/config/store";

export default function App() {
  return (
    <Provider store={store()}>
      <NavigationContainer>
        <SafeAreaProvider>
          <BottomMenu />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
