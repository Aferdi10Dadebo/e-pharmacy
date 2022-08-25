import React from "react";
import {
  Box,
  Text,
  Center,
  Button,
  Icon,
  Input,
  HStack,
  IconButton,
  Image,
  Badge,
  Pressable,
  Stack,
  Fab,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { RefreshControl } from "react-native";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

// redux
import { useDispatch, useSelector } from "react-redux";
import { GetVendorProducts } from "../../../redux/middleware/VendorMiddleware";

export default function ProductsScreen(props) {
  const dispatch = useDispatch();
  const { vendorProducts } = useSelector((state) => state.vendor);
  const { user } = useSelector((state) => state.auth);

  const [filterText, setFilterText] = React.useState("");

  // filter data and sort by date created
  const filteredData = vendorProducts
    .filter((item) => {
      return item?.name?.toLowerCase().includes(filterText.toLowerCase());
    })
    .sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const GetPageData = React.useCallback(() => {
    dispatch(GetVendorProducts(user.email));
  }, []);

  console.log(filteredData);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Products"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      {/* search part */}
      <Center>
        {vendorProducts && vendorProducts?.length > 0 ? (
          <Center p={5} space="3">
            <Input
              placeholder="Search for a product"
              width="80%"
              variant={"rounded"}
              borderColor="primary.400"
              fontFamily={"regular"}
              InputRightElement={<Icon as={Feather} name="search" mr="5" />}
              onChangeText={(text) => setFilterText(text)}
            />
          </Center>
        ) : null}
      </Center>

      {/* list of products */}

      <Box flex={1}>
        <FlashList
          data={filteredData}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={GetPageData} />
          }
          ListEmptyComponent={() => {
            return (
              <Center h={hp(70)}>
                <Text color="text.400" mb={5} fontSize="lg">
                  No Products found
                </Text>
                <Button
                  leftIcon={<Icon as={Feather} name="plus" />}
                  onPress={() => {
                    props.navigation.navigate("AddProductScreen");
                  }}
                >
                  ADD NEW VENDOR
                </Button>
              </Center>
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  props.navigation.navigate({
                    name: "ProductDetailsScreen",
                    params: {
                      ...item,
                    },
                  });
                }}
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  bg="white"
                  borderRadius={5}
                  m={2}
                  space={5}
                  overflow="hidden"
                >
                  <Image
                    alt={index.toString()}
                    source={{ uri: item.image }}
                    style={{
                      width: hp(10),
                      height: hp(10),
                      bg: "white",
                      resizeMode: "contain",
                    }}
                  />
                  <HStack flex={7} justifyContent="space-between" px={3}>
                    <Box>
                      <Text fontSize="lg" fontFamily="regular">
                        {item?.name}
                      </Text>
                      <Text fontSize="xs" fontFamily={"light"} color="text.500">
                        {item.qty} Remaining
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="lg" fontFamily="regular" color="text.500">
                        {item?.price} GHS
                      </Text>
                      <Text fontSize="xs" fontFamily="regular" color="text.500">
                        {item?.salePrice} GHS (SP)
                      </Text>
                    </Box>
                  </HStack>

                  <Badge
                    mr={2}
                    bg="green.500"
                    _text={{
                      color: "white",
                    }}
                  >
                    {item?.productOrderCount ?? 0}
                  </Badge>
                </HStack>
              </Pressable>
            );
          }}
        />
      </Box>

      <Fab
        renderInPortal={false}
        icon={<Icon as={Feather} name="plus" />}
        mb={3}
        mr={3}
        placement="bottom-right"
        onPress={() => {
          props.navigation.navigate("AddProductScreen");
        }}
      />
    </Box>
  );
}
