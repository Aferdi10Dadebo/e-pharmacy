import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import VendorsScreen from "../../screens/MainApp/Vendor/VendorsScreen";
import VendorDetailsScreen from "../../screens/MainApp/Vendor/VendorDetailsScreen";
import VendorProducts from "../../screens/MainApp/Vendor/VendorProducts";
import VendorProductDetailsScreen from "../../screens/MainApp/Vendor/VendorProductDetails";
import VendorChatSceen from "../../screens/MainApp/Vendor/VendorChatSceen";

const Stack = createNativeStackNavigator();

export default function VendorsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VendorsScreen" component={VendorsScreen} />
      <Stack.Screen
        name="VendorDetailsScreen"
        component={VendorDetailsScreen}
      />
      <Stack.Screen name="VendorProducts" component={VendorProducts} />
      <Stack.Screen name="VendorProductDetailsScreen" component={VendorProductDetailsScreen} />
      <Stack.Screen name="VendorChatSceen" component={VendorChatSceen} />
    </Stack.Navigator>
  );
}
