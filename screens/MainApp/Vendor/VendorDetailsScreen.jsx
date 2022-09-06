import React from "react";
import {
  Box,
  Button,
  Center,
  Image,
  ScrollView,
  Stack,
  Text,
  HStack,
  Icon,
  Pressable,
  FlatList,
  Spinner,
} from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { ShopItem } from "../../../components/StoreItem";

import { GetVendorProducts } from "../../../redux/middleware/UserMiddleware";

export default function VendorDetailsScreen(props) {
  const { vendor } = props.route.params;

  console.log(props.route.params);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    setLoading(true);
    GetVendorProducts(vendor.email).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [vendor.email]);

  if (loading) {
    return (
      <Box flex={1}>
        <AppHeader
          title={vendor.name}
          toggleDrawer={() => props.navigation.openDrawer()}
          hasBackButton
          onBackPress={() => {
            props.navigation.navigate("HomeScreen");
          }}
        />

        <Center flex={1}>
          <Spinner />
        </Center>
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <AppHeader
        title={vendor.name}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.navigate("HomeScreen");
        }}
      />

      <ScrollView>
        <Image
          alignSelf="center"
          source={{ uri: vendor.image }}
          h={hp(28)}
          w="95%"
          m={5}
          rounded="xl"
        />

        <Stack w="95%" space={3} alignSelf="center">
          <Text fontSize="xl" fontFamily="medium">
            {vendor.name}
          </Text>
          <Pressable
            onPress={() => {
              Linking.openURL(`tel:${vendor?.phone}`);
            }}
          >
            <HStack space={3} alignItems="center">
              <Icon as={Feather} name="phone" />
              <Text>{vendor.phone}</Text>
            </HStack>
          </Pressable>

          <HStack space={3} alignItems="center">
            <Icon as={Feather} name="mail" />
            <Text>{vendor.email}</Text>
          </HStack>

          <HStack space={3} alignItems="center">
            <Icon as={Feather} name="flag" />
            <Text>{vendor.address}</Text>
          </HStack>

          <Pressable
            onPress={() => {
              Linking.openURL(vendor?.website);
            }}
          >
            <HStack space={3} alignItems="center">
              <Icon as={Feather} name="globe" />
              <Text>{vendor.website}</Text>
            </HStack>
          </Pressable>
        </Stack>
        <HStack
          w="95%"
          mt={10}
          mb={3}
          justifyContent="space-between"
          alignItems="center"
          alignSelf="center"
        >
          <Text fontSize="lg" fontFamily="medium">
            Vendor's Store
          </Text>

          <Pressable
            _pressed={{
              opacity: 0.3,
            }}
            onPress={() =>
              props.navigation.navigate("VendorProducts", {
                vendor,
                products,
              })
            }
          >
            <Text fontFamily="light" mr={5}>
              See All
            </Text>
          </Pressable>
        </HStack>
        <FlatList
          mx={5}
          mb={10}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={
            products.length === 0 ? [] : Object.values(products).slice(0, 5)
          }
          ListEmptyComponent={() => (
            <Box mt={10}>
              <Text>There are no products to show now</Text>
            </Box>
          )}
          renderItem={({ item }) => (
            <ShopItem
              item={item}
              onItemPress={() =>
                props.navigation.navigate("StoreStack", {
                  screen: "ProductDetailsScreen",
                  params: item,
                })
              }
            />
          )}
        />
      </ScrollView>
      <Center safeAreaBottom mb={2}>
        <Button
          onPress={() =>
            props.navigation.navigate("VendorChatSceen", {
              vendor,
            })
          }
        >
          send a message
        </Button>
      </Center>
    </Box>
  );
}
