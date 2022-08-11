import React from "react";
import { Center, Text } from "native-base";

import { TestFirebase } from "../redux/middleware/DeviceMiddleware";


export default function RootNavigator() {

  React.useEffect(() => {
    TestFirebase();
  })
 

  return (
    <Center flex={1} bg={"amber.100"}>
      <Text>RootNavigator</Text>
    </Center>
  );
}
