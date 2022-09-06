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
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from "react-native";

import {
  GetVendors,
  GetProducts,
} from "../../../redux/middleware/UserMiddleware";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { ShopItem } from "../../../components/StoreItem";

export default function ProductsScreen(props) {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const GetPageData = React.useCallback(() => {
    setLoading(true);

    GetProducts().then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    GetPageData();
  }, []);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Store"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.navigate("HomeScreen");
        }}
      />

      <React.Fragment>
        {loading ? (
          <Center flex={1}>
            <Spinner />
          </Center>
        ) : (
          <Box flex={1} p={5}>
            <FlashList
              data={products.length === 0 ? [] : Object.values(products)}
              numColumns={2}
              estimatedItemSize={100}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={GetPageData} />
              }
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              ListEmptyComponent={() => (
                <Center mt={10}>
                  <Text>There are no products to show now</Text>
                </Center>
              )}
              renderItem={({ item }) => (
                <ShopItem
                  item={item}
                  onItemPress={() =>
                    props.navigation.navigate("ProductDetailsScreen", { ...item })
                  }
                />
              )}
            />
          </Box>
        )}
      </React.Fragment>
    </Box>
  );
}
