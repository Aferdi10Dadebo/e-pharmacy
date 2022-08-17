import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { useFlipper } from '@react-navigation/devtools'

// pages
import IntroScreen from '../../screens/Auth/IntroScreen'
import LoginScreen from '../../screens/Auth/LoginScreen'
import RegisterScreen from '../../screens/Auth/RegisterScreen'
import ForgotPasswordScreen from '../../screens/Auth/ForgotPasswordScreen'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
