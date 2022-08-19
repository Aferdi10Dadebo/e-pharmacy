import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFlipper } from "@react-navigation/devtools";

// pages
import HomeScreen from "../../screens/Vendor/Misc/HomeScreen";
import AccountDetailsScreen from "../../screens/Vendor/Misc/AccountDetailsScreen";
import MessageStack from "./MessageStack";
import OrderStack from "./OrderStack";
import ProductStack from "./ProductStack";
import PromotionStack from "./PromotionStack";

// custom components
import DrawerComponent from "../../components/Drawers/Vendor/DrawerComponent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function VendorNavigator() {
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
        }}
      >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen
          name="AccountDetailsScreen"
          component={AccountDetailsScreen}
        />
        <Drawer.Screen name="MessageStack" component={MessageStack} />
        <Drawer.Screen name="OrderStack" component={OrderStack} />
        <Drawer.Screen name="ProductStack" component={ProductStack} />
        <Drawer.Screen name="PromotionStack" component={PromotionStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
