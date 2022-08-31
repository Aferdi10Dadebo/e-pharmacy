import React from "react";
import {
  Box,
  Text,
  Center,
  Icon,
  Input,
  HStack,
  Image,
  Badge,
  Pressable,
  Stack,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { RefreshControl } from "react-native";
import TimeAgo from "react-native-timeago";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
// constants
import { OrderStatus } from "../../../constants/OderStatus";

// redux
import { useDispatch, useSelector } from "react-redux";
import { GetVendorOrders } from "../../../redux/middleware/VendorMiddleware";

export default function OrdersScreen(props) {
  const dispatch = useDispatch();
  const { vendorOrders } = useSelector((state) => state.vendor);
  const { user } = useSelector((state) => state.auth);

  const [filterText, setFilterText] = React.useState("");

  // filter data and sort by date created
  const filteredData = [...Object.values(vendorOrders)]
    .filter((item) => {
      return (
        item?.order_item_name
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        item?.order_status?.toLowerCase().includes(filterText.toLowerCase())
      );
    })
    .sort((a, b) => {
      return (
        new Date(b.order_on.seconds * 1000) -
        new Date(a.order_on.seconds * 1000)
      );
    });

  const GetPageData = React.useCallback(() => {
    dispatch(GetVendorOrders(user.email));
  }, []);

  console.log(filteredData);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Orders"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      {/* search part */}
      <Center>
        {Object.values(vendorOrders) &&
        Object.values(vendorOrders).length > 0 ? (
          <HStack p={5} space="3">
            <Input
              placeholder="Search for a product ordered"
              width="80%"
              variant={"rounded"}
              borderColor="primary.400"
              fontFamily={"regular"}
              InputRightElement={<Icon as={Feather} name="search" mr="5" />}
              value={filterText}
              onChangeText={(text) => setFilterText(text)}
            />
          </HStack>
        ) : null}
      </Center>

      {/* orders */}
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
                <Text color="text.400" mb={5} fontSize="lg" px={6}>
                  No Orders Yet. You can promote products to get more attention
                  to your products
                </Text>
              </Center>
            );
          }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                props.navigation.navigate({
                  name: "OrderDetailsScreen",
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
                  alt={item.item_name}
                  source={{ uri: item.item_image }}
                  style={{
                    width: hp(10),
                    height: hp(12),
                    bg: "white",
                    resizeMode: "contain",
                  }}
                />
                <Stack flex={1} h={hp(12)} justifyContent="center">
                  <HStack
                    top={5}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text fontSize="2xs" color="text.500">
                      ORDER {item.id}
                    </Text>

                    <Text fontSize="2xs" color="text.500" mr={3}>
                      <TimeAgo time={new Date(item.order_on.seconds * 1000)} />
                    </Text>
                  </HStack>
                  <HStack
                    justifyContent="space-between"
                    flex={1}
                    alignItems="center"
                  >
                    <Box>
                      <Text>{item.item_name}</Text>
                      <Text fontSize="xs">by {item.by}</Text>
                    </Box>
                    <Badge
                      mr={2}
                      bg={
                        item.order_status === OrderStatus.PENDING_APPROVAL
                          ? "blue.300"
                          : item.order_status === OrderStatus.APPROVED
                          ? "green.400 "
                          : " red.400"
                      }
                    >
                      {item.order_status}
                    </Badge>
                  </HStack>
                </Stack>
              </HStack>
            </Pressable>
          )}
        />
      </Box>
    </Box>
  );
}
