import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import VendorsScreen from "../../screens/MainApp/Vendor/VendorsScreen";
import VendorDetailsScreen from "../../screens/MainApp/Vendor/VendorDetailsScreen";

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
    </Stack.Navigator>
  );
}
