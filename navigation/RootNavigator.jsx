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

import LoginScreen from "../screens/Auth/LoginScreen";
import AdminHomeScren from '../screens/Admin/HomeScreen';
import VendorHomeScreen from '../screens/Vendor/HomeScreen';
import MainAppScreen from '../screens/MainApp/HomeScreen';

export default function RootNavigator() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useSelector((state) => state.navigation);

  React.useEffect(() => {
    // dispatch(AuthenticateMiddleware("vendor"));
  }, [navigation.ACTION_TYPE]);


  if (navigation.ACTION_TYPE === goToLoading.toString()) {
    return (
      <Text>
        Loading...
      </Text>
    )
  } else if (navigation.ACTION_TYPE === goToAdmin.toString()) {
    return (
      <AdminHomeScren />
    )
  } else if (navigation.ACTION_TYPE === goToVendor.toString()) {
    return (
      <VendorHomeScreen />
    )
  } else if (navigation.ACTION_TYPE === goToMainApp.toString()) {
    return (
      <MainAppScreen />
    )
  }



  return (
    <View flex={1} bg={"amber.100"}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.amber[100]}
      />
      <LoginScreen />
    </View>
  );
}
