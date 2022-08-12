import React from "react";
import { Center, Text, Button } from "native-base";

import  ChangeRoute  from "../../components/ChangeRoute";

export default function HomeScreen(props) {
  return (
    <Center flex={1} bg={"teal.100"}>
      <Text>Vendor Home Screen</Text>

      <ChangeRoute /> 
    </Center>
  );
}
