import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useFlipper } from '@react-navigation/devtools'

// pages
import HomeScreen from '../../screens/Admin/HomeScreen'
import PromotionsScreen from '../../screens/Admin/PromotionsScreen'
import VendorStack from './VendorStack'
import DevicesScreen from '../../screens/Admin/DevicesScreen'

// custom components
import DrawerComponent from '../../components/Drawers/Admin/DrawerComponent'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

export default function AdminNavigator() {
  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerComponent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
        }}
      >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="VendorStack" component={VendorStack} />
        <Drawer.Screen name="DevicesScreen" component={DevicesScreen} />
        <Drawer.Screen name="PromotionsScreen" component={PromotionsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
