import React from "react";
import { Stack, Text, Button } from "native-base";

import { useDispatch } from "react-redux";
import { RouteToAppropraiteStack } from "../redux/middleware/AppAuthenticationMiddleware";

export default function ChangeRoute() {
  const dispatch = useDispatch();

  return (
    <Stack space={10} mt={10}>
      <Button onPress={() => dispatch(RouteToAppropraiteStack("vendor"))}>
        go to vendor
      </Button>

      <Button onPress={() => dispatch(RouteToAppropraiteStack("admin"))}>
        go to admin
      </Button>

      <Button onPress={() => dispatch(RouteToAppropraiteStack("user"))}>
        go to user
      </Button>

      <Button onPress={() => dispatch(RouteToAppropraiteStack(""))}>
        go to login
      </Button>
    </Stack>
  );
}
