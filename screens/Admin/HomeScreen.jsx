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
import {
  GetAllDevices,
  GetAllVendors,
} from "../../redux/middleware/AdminMiddleware";

// custom components
import { AppHeader } from "../../components/AppHeader";
import { Card } from "../../components/Admin/Cards";
import { ScrollView } from "react-native";

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const { devices, deviceCount, vendors, vendorCount } = useSelector(
    (state) => state.admin
  );

  const GetPageData = React.useCallback(() => {
    dispatch(GetAllDevices());
    dispatch(GetAllVendors());
  }, [devices, vendors]);

  React.useEffect(() => {
    GetPageData();
  }, []);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Home"}
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
            value={vendorCount}
            title={"Vendors"}
            onPress={() => {
              props.navigation.navigate("VendorStack");
            }}
            url="https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhhcm1hY3l8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />

          <Card
            value={deviceCount}
            title={"Devices"}
            onPress={() => {
              props.navigation.navigate("DevicesScreen");
            }}
            url="https://images.unsplash.com/photo-1578345218746-50a229b3d0f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRldmljZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          />

          {/* <Card
            value={"0"}
            title={"Promotions"}
            onPress={() => {
              props.navigation.navigate("PromotionsScreen");
            }}
            url="https://images.unsplash.com/photo-1513757378314-e46255f6ed16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFkdmVydGlzZW1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          /> */}
        </ScrollView>
      </Box>
    </Box>
  );
}
