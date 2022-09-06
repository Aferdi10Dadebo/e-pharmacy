import React from "react";
import { Box, Text, HStack, Image, Pressable } from "native-base";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

export default function VendorsScreen(props) {
  // console.log(JSON.stringify(props.route.params, null, 2));

  const topVendors = props.route.params;

  console.log(props.route.params);

  return (
    <Box flex={1}>
      <AppHeader
        title={"VendorsScreen"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.navigate("HomeScreen");
        }}
      />

      <HStack space={5} flexWrap="wrap" mt={5} justifyContent="center">
        {Object.values(topVendors).map((v) => (
          <Pressable
            onPress={() =>
              props.navigation.navigate("VendorStack", {
                screen: "VendorDetailsScreen",
                params: { vendor: v, from: "allVendors" },
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
        ))}
      </HStack>
    </Box>
  );
}
