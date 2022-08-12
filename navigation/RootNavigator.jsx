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
import AdminStack from "./Admin/AdminStack";
import VendorStack from "./Vendor/VendorStack";
import MainAppStack from "./MainApp/MainAppStack";
import AuthStack from "./Auth/AuthStack";


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
      <AdminStack />
    )
  } else if (navigation.ACTION_TYPE === goToVendor.toString()) {
    return (
      <VendorStack />
    )
  } else if (navigation.ACTION_TYPE === goToMainApp.toString()) {
    return (
      <MainAppStack />
    )
  }



  return (
    <View flex={1} bg={"amber.100"}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.amber[100]}
      />
      <AuthStack />
    </View>
  );
}
