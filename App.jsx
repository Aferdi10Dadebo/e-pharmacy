import React, { useState, useEffect, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NativeBaseProvider, View, } from "native-base";

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

// root navigator
import RootNavigator from "./navigation/RootNavigator";
// custom theme
import customTheme from "./customTheme";

// notifications
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./config/registerForPushNotificationsAsync";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const EXPO_ID = Constants.manifest.id;

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  console.log(Device.deviceName, expoPushToken);

  // register for nofitcations
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

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
  }, []);

  // splash screen app loading
  React.useEffect(() => {
    async function prepare() {
      try {
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
          <View
            onLayout={onLayoutRootView}
            style={{ flex: 1}}
          >
            <RootNavigator /> 
          </View>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
