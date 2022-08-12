import React from "react";
import { Center, Text, Button } from "native-base";

import ChangeRoute from "../../components/ChangeRoute";

export default function LoginScreen(props) {
  return (
    <Center flex={1} bg={"red.100"}>
      <Text>Login Screen</Text>

      <ChangeRoute />
    </Center>
  );
}
