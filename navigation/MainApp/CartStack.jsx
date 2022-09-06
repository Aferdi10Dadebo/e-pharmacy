import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import CartScreen from "../../screens/MainApp/Cart/CartScreen";
import CheckOutScreen from "../../screens/MainApp/Cart/CheckOutScreen";

const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckOutScreen" component={CheckOutScreen} />
    </Stack.Navigator>
  );
}
