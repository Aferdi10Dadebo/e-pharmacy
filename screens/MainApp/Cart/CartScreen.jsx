import React from "react";
import {
  Box,
  Text,
  Center,
  HStack,
  Button,
  ScrollView,
  Image,
  Stack,
  useToast,
  FlatList,
  IconButton,
  Icon,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";

import { AddToCart } from "../../../redux/middleware/UserMiddleware";
import {
  addToCartSuccess,
  resetActionType,
} from "../../../redux/slices/MainReducer";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

export default function CartScreen(props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.main);
  const mainState = useSelector((state) => state.main);
  const toast = useToast();

  const [data, setData] = React.useState();

  console.log(JSON.stringify(cart, null, 2));

  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      try {
        if (
          arr[i] &&
          arr[i].hasOwnProperty(attr) &&
          arguments.length > 2 &&
          arr[i][attr] === value
        ) {
          arr?.splice(i, 1);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    return arr;
  };

  React.useEffect(() => {
    if (mainState.ACTION_TYPE === addToCartSuccess.toString()) {
      toast.show({
        description: "item removed",
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    }

    setData(cart);
  }, [mainState.ACTION_TYPE, cart]);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Cart"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1} py={5} px={2}>
        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <Center mt={hp(30)}>
              <Text>No items added to cart</Text>
            </Center>
          )}
          renderItem={({ item }) => (
            <HStack
              bg="red.100"
              alignItems="center"
              height={hp(10)}
              mb={5}
              rounded="md"
              overflow="hidden"
              space={2}
            >
              <Image
                source={{ uri: item.image }}
                height={hp(10)}
                flex={3}
                bg="white"
                resizeMode="contain"
              />

              <Stack flex={5} space={1}>
                <Text>{item.name}</Text>
                <Text fontSize="sm">
                  GHS {item.isOnSale ? item.salePrice : item.price}
                </Text>
              </Stack>

              <Stack space={1} alignItems="center">
                <Button mr={2} size={"sm"}>
                  checkout
                </Button>

                <IconButton
                  variant="solid"
                  size="sm"
                  icon={<Icon as={Feather} name="trash" />}
                  onPress={() => {
                    dispatch(AddToCart(removeByAttr(cart, "id", item?.id)));
                  }}
                />
              </Stack>
            </HStack>
          )}
        />
      </Box>
    </Box>
  );
}
