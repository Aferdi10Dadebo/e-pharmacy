import React from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  Heading,
  Pressable,
  Image,
} from "native-base";
import { RefreshControl } from "react-native";

// redux
import { useDispatch, useSelector } from "react-redux";

// custom components
import { AppHeader } from "../../../components/AppHeader";
import { Card } from "../../../components/Admin/Cards";
import { ScrollView } from "react-native";
import {
  GetVendorProducts,
  GetVendorOrders,
  GetVendorMessages,
  GetVendorPromotions,
} from "../../../redux/middleware/VendorMiddleware";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    vendorProducts,
    vendorOrders,
    vendorMessages,
    vendorPromotions,
    vendorProductCount,
    vendorOrderCount,
    vendorMessageCount,
    vendorPromotionCount,
  } = useSelector((state) => state.vendor);

  const GetPageData = React.useCallback(() => {
    dispatch(GetVendorProducts(user.email));
    dispatch(GetVendorOrders(user.email));
    dispatch(GetVendorMessages(user.email));
    dispatch(GetVendorPromotions(user.email));
  }, []);

  React.useEffect(() => {
    GetPageData();
  }, []);

  return (
    <Box flex={1}>
      <AppHeader
        title={user?.name}
        toggleDrawer={() => props.navigation.openDrawer()}
      />

      <Box flex={1}>
        <ScrollView
          // refresh controls
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={GetPageData} />
          }
        >
          <Box mt={5} />

          <Card
            value={vendorProductCount}
            title={"My Products"}
            onPress={() => {
              props.navigation.navigate("ProductStack");
            }}
            url="https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhhcm1hY3l8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />

          <Card
            value={vendorOrderCount}
            title={"My Orders"}
            onPress={() => {
              props.navigation.navigate("OrderStack");
            }}
            url="https://images.unsplash.com/photo-1602665742701-389671bc40c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG9yZGVyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          />

          <Card
            value={vendorMessageCount}
            title={"My Messages"}
            onPress={() => {
              props.navigation.navigate("MessageStack");
            }}
            url="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
          />

          <Card
            value={vendorPromotionCount}
            title={"Promotions Requests"}
            onPress={() => {
              props.navigation.navigate("PromotionStack");
            }}
            url="https://images.unsplash.com/photo-1513757378314-e46255f6ed16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />
        </ScrollView>
      </Box>
    </Box>
  );
}
