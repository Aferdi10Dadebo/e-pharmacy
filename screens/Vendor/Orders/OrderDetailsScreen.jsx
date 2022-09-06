import React from "react";
import {
  Box,
  Text,
  Image,
  Stack,
  HStack,
  Center,
  useDisclose,
  Badge,
  Button,
  useToast,
} from "native-base";
import { ImageBackground, ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { useSelector, useDispatch } from "react-redux";
import {
  ApproveOrder,
  DeclineOrder,
  GetVendorOrders,
} from "../../../redux/middleware/VendorMiddleware";
import {
  approveOrderSuccess,
  approveOrderError,
  declineOrderSuccess,
  declineOrderError,
  resetActionType,
} from "../../../redux/slices/VendorReducer";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
// constant
import { OrderStatus } from "../../../constants/OderStatus";

export default function OrderDetailsScreen(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const vendorState = useSelector((state) => state.vendor);
  const toast = useToast();

  const order = props.route.params;
  const rand = Math.floor(100000 + Math.random() * 900000);
  const notification_key = rand;

  React.useEffect(() => {
    if (vendorState.ACTION_TYPE === approveOrderSuccess.toString()) {
      toast.show({
        description: vendorState.orderMessage,
        placement: "top",
        duration: 1000,
      });
      dispatch(GetVendorOrders());
      dispatch(resetActionType());
    } else if (vendorState.ACTION_TYPE === approveOrderError.toString()) {
      toast.show({
        description: vendorState.orderMessage,
        placement: "top",
      });
      dispatch(resetActionType());
    } else if (vendorState.ACTION_TYPE === declineOrderSuccess.toString()) {
      toast.show({
        description: vendorState.orderMessage,
        placement: "top",
        duration: 1000,
      });
      dispatch(GetVendorOrders());
      dispatch(resetActionType());
    } else if (vendorState.ACTION_TYPE === declineOrderError.toString()) {
      toast.show({
        description: vendorState.orderMessage,
        placement: "top",
      });
      dispatch(resetActionType());
    }
  }, [vendorState.ACTION_TYPE]);

  return (
    <Box flex={1}>
      <AppHeader
        title={order.id}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <ScrollView>
        {/* order status */}
        <Image
          alt={order.item_name}
          source={{ uri: order.item_image }}
          style={{
            height: hp(30),
            width: "100%",
          }}
        />

        <Stack space={5} px={7}>
          <Badge
            w="50%"
            mt={5}
            alignSelf={"center"}
            rounded="sm"
            bg={
              order.order_status === "Pending Approval"
                ? "blue.500"
                : order.order_status === "Approved"
                ? "green.500"
                : "red.500"
            }
            _text={{
              color: "white",
            }}
          >
            {order.order_status === "Approved" ? "SOLD" : order.order_status}
          </Badge>

          <Text fontSize="lg" color="text.700">
            Order Details
          </Text>
          <OrderItem
            label="Date Ordered"
            value={`${new Date(
              order.order_on.seconds * 1000
            ).toLocaleDateString()}`}
          />
          <OrderItem label="Order ID" value={order.id} />
          <OrderItem label="Item Ordered" value={order.item_name} />
          <OrderItem
            label="Quantity"
            value={`${order.item_qty} ${order.item_qty_unit}`}
          />
          <OrderItem
            label="Cost Price"
            value={`${
              parseInt(order.item_qty) * parseInt(order.item_price)
            } GHS`}
          />
          <OrderItem label="Ordered By" value={order.by} />
        </Stack>
      </ScrollView>

      <HStack space={5} justifyContent="center" py={4} safeAreaBottom px={5}>
        <Button
          colorScheme="success"
          flex={1}
          isLoading={vendorState.isApproveOrderLoading}
          isLoadingText="APPROVING..."
          onPress={() => {
            if (order.order_status === "Approved") {
              toast.show({
                description: "already approved",
                placement: "top",
                duration: 1000,
              });
              return;
            } else if (order.order_status === "Rejected") {
              toast.show({
                description: "already declined",
                placement: "top",
                duration: 1000,
              });
              return;
            }

            dispatch(
              ApproveOrder(user.email, order.id, notification_key, order)
            );
          }}
        >
          APPROVE
        </Button>

        <Button
          colorScheme="danger"
          flex={1}
          isLoading={vendorState.isADelcineOrderLoading}
          isLoadingText="DECLINING..."
          // onPress={decline}
          onPress={() => {
            if (order.order_status === "Approved") {
              toast.show({
                description: "already approved",
                placement: "top",
                duration: 1000,
              });
              return;
            } else if (order.order_status === "Rejected") {
              toast.show({
                description: "already declined",
                placement: "top",
                duration: 1000,
              });
              return;
            }
            dispatch(
              DeclineOrder(user.email, order.id, notification_key, order)
            );
          }}
        >
          DECLINE
        </Button>
      </HStack>
    </Box>
  );
}

const OrderItem = ({ label, value }) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" space={5}>
      <Text color="text.500">{label}</Text>

      <Text>{value}</Text>
    </HStack>
  );
};
