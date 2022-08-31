import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import MessagesScreen from "../../screens/MainApp/Messages/MessagesScreen";
import ChatScreen from "../../screens/MainApp/Messages/ChatScreen";

const Stack = createNativeStackNavigator();

export default function MessageStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}
