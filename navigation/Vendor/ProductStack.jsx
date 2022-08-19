import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import ProductsScreen from "../../screens/Vendor/Products/ProductsScreen";
import ProductDetailsScreen from "../../screens/Vendor/Products/ProductDetailsScreen";
import AddProductScreen from "../../screens/Vendor/Products/AddProductScreen";
import EditProductScreen from "../../screens/Vendor/Products/EditProductScreen";

const Stack = createNativeStackNavigator();

export default function ProductStack() {
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
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
      <Stack.Screen name="EditProductScreen" component={EditProductScreen} />
    </Stack.Navigator>
  );
}
