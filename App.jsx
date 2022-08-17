import React, { useState, useEffect, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NativeBaseProvider, View, StatusBar } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import FlipperAsyncStorage from "rn-flipper-async-storage-advanced";

// fonts
import {
  Poppins_300Light as light,
  Poppins_400Regular as regular,
  Poppins_500Medium as medium,
  Poppins_600SemiBold as semibold,
  Poppins_700Bold as bold,
} from "@expo-google-fonts/poppins";

// color mode manager
import { colorModeManager } from "./config/colorModeManager";

// redux
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { RegisterDevice } from "./redux/middleware/DeviceMiddleware";

// root navigator
import RootNavigator from "./navigation/RootNavigator";
// custom theme
import customTheme from "./customTheme";

// notifications
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./config/registerForPushNotificationsAsync";

// devtools
import { connectToDevTools } from "react-devtools-core";
import RNAsyncStorageFlipper from "rn-async-storage-flipper";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  LogBox.ignoreLogs([
    "Warning: Async Storage has been extracted from react-native core...",
  ]);

  // register for nofitcations
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // register for notifications
    RegisterDevice({
      deviceName: Device.deviceName,
      deviceExpoPushToken: expoPushToken ? expoPushToken : "Simulator",
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [expoPushToken]);

  // splash screen app loading
  React.useEffect(() => {
    async function prepare() {
      try {
        RNAsyncStorageFlipper(AsyncStorage);
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          regular,
          medium,
          semibold,
          bold,
          light,
        });
      } catch (e) {
        alert(e.message);
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [appIsReady]);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (__DEV__) {
    connectToDevTools({
      host: "localhost",
      port: 8097,
    });

    require("react-native-performance-flipper-reporter").setupDefaultFlipperReporter();
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider
          theme={customTheme}
          colorModeManager={colorModeManager}
        >
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <FlipperAsyncStorage />
            <RootNavigator />
          </View>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
