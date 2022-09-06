import React from "react";
import { Center, Text, Pressable, Box, Image, HStack } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const ShopItem = ({ item, onItemPress }) => {
  return (
    <Pressable
      rounded="lg"
      overflow="hidden"
      mr={5}
      bg="white"
      onPress={onItemPress}
    >
      <Image
        source={{ uri: item?.image }}
        h={hp(25)}
        w={wp(50)}
        mb={5}
        rounded="md"
        resizeMode="contain"
      />
      <Box px={5} bg="blue.200">
        <Text py={1} fontSize="md">
          {item?.name}
        </Text>
        <HStack space={2}>
          <Text
            pb={1.5}
            fontSize="xs"
            strikeThrough={item.isOnSale && true}
            color={item.isOnSale && "text.500"}
          >
            GHS {item?.price}
          </Text>
          {item.isOnSale && (
            <Text pb={1.5} fontSize="xs">
              GHS {item?.salePrice}
            </Text>
          )}
        </HStack>
      </Box>
    </Pressable>
  );
};
