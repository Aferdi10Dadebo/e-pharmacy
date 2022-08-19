import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// pages
import PromotionsScreen from "../../screens/Vendor/Promotions/PromotionsScreen";
import PromotionDetailsScreen from "../../screens/Vendor/Promotions/PromotionDetailsScreen";
import PromotionRequestScreen from "../../screens/Vendor/Promotions/PromotionRequestScreen";

const Stack = createNativeStackNavigator();

export default function PromotionStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PromotionsScreen" component={PromotionsScreen} />
      <Stack.Screen
        name="PromotionDetailsScreen"
        component={PromotionDetailsScreen}
      />
      <Stack.Screen
        name="PromotionRequestScreen"
        component={PromotionRequestScreen}
      />
    </Stack.Navigator>
  );
}
