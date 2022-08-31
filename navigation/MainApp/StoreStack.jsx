import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import ProductsScreen from "../../screens/MainApp/Store/ProductsScreen"
import ProductDetailsScreen from "../../screens/MainApp/Store/ProductDetailsScreen"

const Stack = createNativeStackNavigator();

export default function StoreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
}
