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
  Box,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { Linking } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
// import Logo from "../assets/Logo-White.svg";
import DrawerItem from "../DrawerItem";
import logo from "../../../assets/icon.png";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
    name: "Account Details",
    screen: "AccountDetailsScreen",
    key: "2",
  },

  {
    icon: "briefcase",
    name: "Products",
    screen: "ProductStack",
    key: "3",
  },

  // {
  //   icon: "trending-up",
  //   name: "Promotion Request",
  //   screen: "PromotionStack",
  //   key: "5",
  // },

  {
    icon: "shopping-cart",
    name: "My Orders",
    screen: "OrderStack",
    key: "6",
  },

  {
    icon: "mail",
    name: "Messages",
    screen: "MessageStack",
    key: "7",
  },
];

// This is the component that renders the drawer navigator.
export default function DrawerComponent(props) {
  // redux
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  return (
    <View flex={1}>
      {/* Drawer Header */}
      <Center bg="primary.500" safeAreaTop h={hp(20)} px={5} py={2} >
        <Image
          source={{ uri: user?.image }}
          alt="logo"
          height={hp(8)}
          width={hp(8)}
          bg="primary.300"
          rounded={"sm"}
          mb={2}
        />

        <Text color="white" fontSize={'lg'}>{user?.name}</Text>
      </Center>

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

      {/* Footer */}
      <HStack safeArea p={5}>
        <Button
          isLoading={authState.isLogoutLoading}
          isLoadingText="Logging out..."
          onPress={() => {
            dispatch(LogoutMiddleware());
          }}
          w="90%"
        >
          Logout
        </Button>
      </HStack>
    </View>
  );
}
