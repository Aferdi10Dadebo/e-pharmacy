import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet,  Pressable } from "react-native";
import { Text, Icon, useColorModeValue, Box } from "native-base";

const DrawerItem = ({ navigation, icon, name, screenName, onPress }) => (
  <Box rounded="none" overflow="hidden">
    <Pressable
      android_ripple={{ color: "rgba(235, 28, 36, 1)", borderless: true }}
      _pressed={{ bg: Platform.OS === "ios" ? "rgba(235, 28, 36, .4)" : null }}
      style={({ pressed }) => [
        {
          backgroundColor:
            pressed && Platform.OS === "ios"
              ? "rgba(rgba(235, 28, 36, .4))"
              : null,
        },
        styles.menuItem,
      ]}
      onPress={onPress}
    >
      <Feather
        name={icon}
        size={20}
        style={{ marginHorizontal: 15, marginVertical: 15 }}
        color="#6D6E70"
      />
      <Text fontFamily="light">{name}</Text>
    </Pressable>
  </Box>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",

  },
});

export default DrawerItem;
