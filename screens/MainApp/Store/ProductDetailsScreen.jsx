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
} from "native-base";
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

export default function ProductDetailsScreen(props) {
  const item = props.route.params;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.main);
  const mainState = useSelector((state) => state.main);
  const toast = useToast();

  React.useEffect(() => {
    if (mainState.ACTION_TYPE === addToCartSuccess.toString()) {
      toast.show({
        description: "added to cart successfully",
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    }
  }, [mainState.ACTION_TYPE]);

  const isFound = cart.some((element) => {
    if (element.id === item.id) {
      return true;
    }
    return false;
  });

  return (
    <Box flex={1}>
      <AppHeader
        title={item?.name}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.navigate("StoreStack", { screen: "ProductsScreen" });
        }}
      />

      <ScrollView flex={1}>
        <Image
          alignSelf="center"
          source={{ uri: item?.image }}
          h={hp(28)}
          w="95%"
          m={5}
          rounded="xl"
          resizeMode="contain"
          bg="white"
        />

        <HStack justifyContent="flex-end" w="95%" my={1}>
          <Button
            size={"sm"}
            onPress={() => {
              if (isFound) {
                toast.show({
                  description: "item already in cart",
                  placement: "top",
                  duration: 2000,
                });
                return;
              }

              dispatch(AddToCart([...cart, item]));
            }}
          >
            add to cart
          </Button>
        </HStack>

        <Stack w="95%" space={3} alignSelf="center">
          <HStack justifyContent="space-between" space={5} alignItems="center">
            <Text fontSize="xl" fontFamily="medium">
              {item?.name}
            </Text>
            <Text fontSize="md" fontFamily="medium">
              GHS {item?.isOnSale ? item?.salePrice : item?.price}
            </Text>
          </HStack>

          <Box mb={5}>
            <Text color="font.500" fontSize="md">
              Description
            </Text>
            <Text py={2}>{item?.description ?? "No description provided"}</Text>
          </Box>

          <Box mb={5}>
            <Text color="font.500" fontSize="md">
              Dosage
            </Text>
            <Text py={2}>{item?.dosage ?? "No dosage provided"}</Text>
          </Box>
        </Stack>
      </ScrollView>
      <Center safeAreaBottom py={2}>
        <Button
          onPress={() =>
            props.navigation.navigate("CartStack", {
              screen: "CheckOutScreen",
              params: item,
            })
          }
        >
          CONTINUE TO CHECKOUT
        </Button>
      </Center>
    </Box>
  );
}
