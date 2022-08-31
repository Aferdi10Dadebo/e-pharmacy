import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFlipper } from "@react-navigation/devtools";

// pages
import HomeScreen from "../../screens/MainApp/Misc/HomeScreen";
import NotificationsScreen from "../../screens/MainApp/Misc/NotificationsScreen";
import AccountDetailsScreen from "../../screens/MainApp/Misc/AccountDetailsScreen";
import MessageStack from "./MessageStack";
import VendorStack from "./VendorStack";
import StoreStack from "./StoreStack";
// import OrderStack from "./OrderStack";
// import ProductStack from "./ProductStack";
// import PromotionStack from "./PromotionStack";

// custom components
import DrawerComponent from "../../components/Drawers/MainApp/DrawerComponent";

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
          name="NotificationsScreen"
          component={NotificationsScreen}
        />
        <Drawer.Screen name="MessageStack" component={MessageStack} />
        <Drawer.Screen
          name="AccountDetailsScreen"
          component={AccountDetailsScreen}
        />
        <Drawer.Screen name="VendorStack" component={VendorStack} />
        <Drawer.Screen name="StoreStack" component={StoreStack} />
        {/*
       

        
        <Drawer.Screen name="PromotionStack" component={PromotionStack} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
