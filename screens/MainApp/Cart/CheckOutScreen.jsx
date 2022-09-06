import React from "react";
import {
  Box,
  Text,
  Image,
  Stack,
  HStack,
  Button,
  IconButton,
  Icon,
  Center,
  useToast,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";

import { CheckOut } from "../../../redux/middleware/UserMiddleware";
import {
  checkOutError,
  checkOutSuccess,
  resetActionType,
} from "../../../redux/slices/MainReducer";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

export default function CheckOutScreen(props) {
  const item = props.route.params;
  const dispatch = useDispatch();
  const toast = useToast();

  const mainState = useSelector((state) => state.main);
  const { user } = useSelector((state) => state.auth);

  const [qty, setQty] = React.useState(1);

  const rand = Math.floor(100000 + Math.random() * 900000);
  const order_key = `order${rand}`;
  const notification_key = rand;
  const v_id = item.vendor_id;
  const u_id = user.email;
  const name = `${user.firstname} ${user.othername}`;



  // function to generate 5 random numbers ?

  const placeOrder = () => {
    dispatch(
      CheckOut(v_id, u_id, order_key, notification_key, {
        by: name,
        by_id: user.email,
        id: order_key,
        item_id: item.id,
        item_name: item.name,
        item_image: item.image,
        item_price: (item.isOnSale ? item.salePrice : item.price) * qty,
        item_qty: qty,
        item_qty_unit: item.qtyUnit,
        order_on: new Date(),
        order_status: "Pending Approval",
      })
    );
  };

  // side effects
  React.useEffect(() => {
    if (mainState.ACTION_TYPE === checkOutSuccess.toString()) {
      toast.show({
        description: mainState.checkOutMessage,
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    } else if (mainState.ACTION_TYPE === checkOutError.toString()) {
      toast.show({
        description: mainState.checkOutMessage,
        placement: "top",
      });
      dispatch(resetActionType());
    }
  }, [mainState.ACTION_TYPE]);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Check Out"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1} p={5}>
        <Image
          source={{ uri: item.image }}
          height={hp(30)}
          bg="white"
          resizeMode="contain"
          rounded="md"
        />

        <Stack alignItems="center" my={10} space={10}>
          <Text fontSize={"lg"} fontFamily="medium">
            {item.name}
          </Text>

          <Text fontSize={"lg"} fontFamily="medium">
            GHS {(item.isOnSale ? item.salePrice : item.price) * qty}
          </Text>

          <HStack justifyContent="center">
            <IconButton
              variant="solid"
              icon={<Icon as={Feather} name="chevron-left" />}
              borderRightRadius={0}
              onPress={() => {
                if (qty > 2) {
                  setQty(qty - 1);
                  return;
                } else if (qty === 2) {
                  setQty(qty - 1);
                  return;
                }
              }}
            />
            <Center px={10} py={3} bg="white">
              {qty}
            </Center>

            <IconButton
              variant="solid"
              icon={<Icon as={Feather} name="chevron-right" />}
              borderLeftRadius={0}
              onPress={() => {
                setQty(qty + 1);
              }}
            />
          </HStack>

          <Text color="text.400">
            Payment method is strictly pay on delivery
          </Text>

          <Button
            size="lg"
            w="50%"
            isLoading={mainState.isCheckOutLoading}
            isLoadingText="PLACING ORDER..."
            onPress={placeOrder}
          >
            PLACE ORDER
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
