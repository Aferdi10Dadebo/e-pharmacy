import React from "react";
import {
  Box,
  Text,
  Image,
  HStack,
  Center,
  Button,
  Pressable,
  ScrollView,
  FlatList,
  Spinner,
} from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import image from "../../../assets/pharmacist.jpg";
import { useDispatch, useSelector } from "react-redux";

import {
  GetVendors,
  GetProducts,
} from "../../../redux/middleware/UserMiddleware";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { ShopItem } from "../../../components/StoreItem";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const [topVendors, setTopVendors] = React.useState([]);
  const [topProducts, setTopProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const GetPageData = React.useCallback(() => {
    setLoading(true);
    GetVendors().then((vendors) => {
      setTopVendors(vendors);
    });
    GetProducts().then((products) => {
      setTopProducts(products);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    GetPageData();
  }, []);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Home"}
        toggleDrawer={() => props.navigation.openDrawer()}
        showBell
        openBell={() => props.navigation.navigate("NotificationsScreen")}
        showBadge
      />

      <>
        {loading ? (
          <Center flex={1}>
            <Spinner />
          </Center>
        ) : (
          <ScrollView flex={1} p={5}>
            {/* chat with pharmacist  */}
            <HStack
              h={hp(25)}
              w="100%"
              bg="primary.200"
              rounded="xl"
              overflow="hidden"
            >
              <Center flex={1} style={{ backgroundColor: "#CEEBEF" }} px={3}>
                <Text fontFamily="semibold" fontSize={"lg"}>
                  Experts are available to help
                </Text>

                <Button
                  size="sm"
                  mt="5"
                  alignSelf="flex-start"
                  mx={3}
                  onPress={() =>
                    props.navigation.navigate("VendorStack", {
                      screen: "VendorsScreen",
                      params: topVendors,
                    })
                  }
                >
                  start a conversiton
                </Button>
              </Center>
              <Image source={image} flex={1} h={hp(25)} w="100%" />
            </HStack>

            {/* top pharmacies */}
            <Box mt={10}>
              <HStack justifyContent="space-between" alignItems="center" mb={5}>
                <Text fontSize="lg">Pharmacies</Text>

                <Pressable
                  _pressed={{
                    opacity: 0.3,
                  }}
                  onPress={() =>
                    props.navigation.navigate("VendorStack", {
                      screen: "VendorsScreen",
                      params: topVendors,
                    })
                  }
                >
                  <Text color="text.500">See All</Text>
                </Pressable>
              </HStack>

              <HStack space={5} flexWrap="wrap">
                {topVendors.length > 0
                  ? topVendors.slice(0, 5).map((v) => (
                      <Pressable
                        onPress={() =>
                          props.navigation.navigate("VendorStack", {
                            screen: "VendorDetailsScreen",
                            params: {
                              vendor: v,
                              from: "home",
                            },
                          })
                        }
                      >
                        <Image
                          source={{ uri: v.image }}
                          h={100}
                          w={100}
                          mb={5}
                          rounded="md"
                        />
                      </Pressable>
                    ))
                  : null}
              </HStack>
            </Box>

            {/* top drugs */}
            <Box my={10}>
              <HStack justifyContent="space-between" alignItems="center" mb={5}>
                <Text fontSize="lg">Medication Store</Text>

                <Pressable
                  _pressed={{
                    opacity: 0.3,
                  }}
                  onPress={() => props.navigation.navigate("StoreStack")}
                >
                  <Text color="text.500">See All</Text>
                </Pressable>
              </HStack>
              <FlatList
                data={topProducts}
                estimatedItemSize={100}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginBottom: 20,
                }}
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
          </ScrollView>
        )}
      </>
    </Box>
  );
}
