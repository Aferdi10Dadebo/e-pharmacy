import React from "react";
import { Box, Text, Pressable, Image, Center } from "native-base";
import { FlashList } from "@shopify/flash-list";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import {ShopItem} from "../../../components/StoreItem";

export default function VendorProducts(props) {
  const { vendor, products } = props.route.params;

  return (
    <Box flex={1}>
      <AppHeader
        title={vendor.name}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1} p={5}>
        <FlashList
          data={products.length === 0 ? [] : Object.values(products)}
          numColumns={2}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
          ListEmptyComponent={() => (
            <Center mt={10}>
              <Text>There are no products to show now</Text>
            </Center>
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
      </Box>
    </Box>
  );
}
