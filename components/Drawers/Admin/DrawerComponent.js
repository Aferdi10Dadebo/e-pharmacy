import React from "react";
import {
  View,
  Text,
  Center,
  VStack,
  Image,
  Pressable,
  Button,
  ScrollView,
  HStack,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { Linking } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
// import Logo from "../assets/Logo-White.svg";
import DrawerItem from "../DrawerItem";
import logo from "../../../assets/icon.png";

import { useDispatch, useSelector } from "react-redux";
import { LogoutMiddleware } from "../../../redux/middleware/AppAuthenticationMiddleware";

const menuData = [
  {
    icon: "home",
    name: "Home",
    screen: "HomeScreen",
    key: "1",
  },
  {
    icon: "user",
    name: "Vendors",
    screen: "VendorStack",
    key: "2",
  },

  {
    icon: "smartphone",
    name: "Devices",
    screen: "DevicesScreen",
    key: "5",
  },

  // {
  //   icon: "trending-up",
  //   name: "Promotions",
  //   screen: "PromotionsScreen",
  //   key: "6",
  // },
];

// This is the component that renders the drawer navigator.
export default function DrawerComponent(props) {
  // redux
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  return (
    <View flex={1}>
      {/* Drawer Header */}
      <VStack
        bg="primary.500"
        safeAreaTop
        h={"20%"}
        px={5}
        py={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Image
            source={logo}
            alt="logo"
            height="45"
            width="45"
            bg="primary.300"
            rounded={"50"}
          />

          <Button
            isLoading={authState.isLogoutLoading}
            isLoadingText="Logging out..."
            onPress={() => {
              dispatch(LogoutMiddleware());
            }}
          >
            Logout
          </Button>
        </HStack>

        <Text color="text.100" fontSize={"lg"} pb={2}>
          Admin
        </Text>
      </VStack>

      {/* Menu Items */}
      <FlashList
        estimatedItemSize={45}
        data={menuData}
        showsVerticalScrollIndicator={false}
        flex={6}
        renderItem={({ item }) => (
          <DrawerItem
            onPress={() => {
              props.navigation.navigate(item.screen);
            }}
            icon={item.icon}
            name={item.name}
            key={item.key}
          />
        )}
      />
    </View>
  );
}
