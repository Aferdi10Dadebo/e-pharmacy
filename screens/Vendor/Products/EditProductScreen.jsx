import React from "react";
import { Box, Text } from "native-base";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

export default function EditProductScreen(props) {
  return (
    <Box flex={1}>
      <AppHeader
        title={"Edit + id"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
    </Box>
  );
}
