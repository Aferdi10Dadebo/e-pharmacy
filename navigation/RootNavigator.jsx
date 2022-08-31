import React from "react";
import { View, Text, useTheme, StatusBar } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  goToAdmin,
  goToVendor,
  goToMainApp,
  goToAuth,
  goToLoading,
} from "../redux/slices/NavigationReducer";
import { AuthenticateMiddleware } from "../redux/middleware/AppAuthenticationMiddleware";

// navigators
import AdminNavigator from "./Admin/AdminNavigator";
import VendorNavigator from "./Vendor/VendorNavigator";
import MainAppNavigator from "./MainApp/MainAppNavigator";
import AuthStack from "./Auth/AuthStack";


export default function RootNavigator() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.navigation);



  if (navigation.ACTION_TYPE === goToLoading.toString()) {
    return (
      <Text>
        Loading...
      </Text>
    )
  } else if (navigation.ACTION_TYPE === goToAdmin.toString()) {
    return (
      <AdminNavigator />
    )
  } else if (navigation.ACTION_TYPE === goToVendor.toString()) {
    return (
      <VendorNavigator />
    )
  } else if (navigation.ACTION_TYPE === goToMainApp.toString()) {
    return (
      <MainAppNavigator />
    )
  }



  return (
    <View flex={1} bg={"amber.100"}>
      
      <AuthStack />
    </View>
  );
}
