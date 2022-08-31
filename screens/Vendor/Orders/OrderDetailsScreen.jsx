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
} from "native-base";
import { ImageBackground, ScrollView } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
// constant
import { OrderStatus } from "../../../constants/OderStatus";

export default function OrderDetailsScreen(props) {
  const order = props.route.params;

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
              order.order_status === OrderStatus.PENDING_APPROVAL
                ? "blue.500"
                : order.order_status === OrderStatus.APPROVED
                ? "green.500"
                : "red.500"
            }
            _text={{
              color: "white",
            }}
          >
            {order.order_status === OrderStatus.APPROVED
              ? "SOLD"
              : order.order_status}
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
        <Button colorScheme="success" flex={1}>
          APPROVE
        </Button>

        <Button colorScheme="danger" flex={1}>
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
