import React from "react";
import { Box, Text } from "native-base";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const ToastRender = (props) => {
  return (
    <Box
      bg={
        props.success
          ? "success.500"
          : props.error
          ? "red.500"
          : props.warn
          ? "yellow.500"
          : props.info
          ? "blue.500"
          : "gray.500"
      }
      p={5}
      borderRadius="5"
      mb={5}
      w={wp(90)}
    >
      {props.title && <Text color="white">{props.title}</Text>}
      {props.message && <Text color="white">{props.message}</Text>}
    </Box>
  );
};
