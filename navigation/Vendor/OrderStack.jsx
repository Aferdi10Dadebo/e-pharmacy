import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import OrderDetailsScreen from "../../screens/Vendor/Orders/OrderDetailsScreen";
import OrdersScreen from "../../screens/Vendor/Orders/OrdersScreen";

const Stack = createNativeStackNavigator();

export default function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
}
