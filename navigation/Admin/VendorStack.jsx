import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    NavigationContainer,
} from "@react-navigation/native";


// pages
import VendorsScreen from "../../screens/Admin/VendorsScreen";
import VendorScreen from "../../screens/Admin/VendorScreen";
import AddVendorScreen from "../../screens/Admin/AddVendorScreen";

const Stack = createNativeStackNavigator();

export default function VendorStack() {


    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="VendorsScreen" component={VendorsScreen} />
            <Stack.Screen name="VendorScreen" component={VendorScreen} />
            <Stack.Screen name="AddVendorScreen" component={AddVendorScreen} />
        </Stack.Navigator>

    );
}
