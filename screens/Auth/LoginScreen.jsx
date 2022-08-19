import React from "react";
import {
  Box,
  Text,
  Button,
  Center,
  Stack,
  Input,
  IconButton,
  Icon,
  Pressable,
  useToast,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { useDispatch, useSelector } from "react-redux";
import { LoginMiddleware } from "../../redux/middleware/AppAuthenticationMiddleware";

import {
  loginError,
  loginSuccess,
  resetActionType,
} from "../../redux/slices/AuthenticationReducer";

// custom
import { ToastRender } from "../../components/ToastRender";

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = React.useState("test@vendor.com");
  const [password, setPassword] = React.useState("123456");
  const [showPassword, setShowPassword] = React.useState(false);

  // Login sideEffects
  React.useEffect(() => {
    if (authState.ACTION_TYPE === loginSuccess.toString()) {
      toast.show({
        render: () => <ToastRender success message="Login Successful" />,
        placement: "top",
      });
      dispatch(resetActionType());
    } else if (authState.ACTION_TYPE === loginError.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            error
            title="Login Failed"
            message={authState.loginMessage}
          />
        ),
        placement: "top",
      });
      dispatch(resetActionType());
    }
  }, [authState.ACTION_TYPE]);

  return (
    <Box flex={1} safeArea p={5} justifyContent="center">
      <KeyboardAwareScrollView>
        <Center mt={10}>
          <Text
            fontSize={"4xl"}
            textAlign={"center"}
            fontFamily="medium"
            mb={5}
          >
            Hello There!
          </Text>
          <Text fontSize={"2xl"} textAlign="center" color={"text.500"}>
            Welcom to E-Pharmacy
          </Text>
        </Center>
        <Stack mt={10} mx={5} space={10}>
          <Input
            variant={"filled"}
            bg="primary.100"
            size="lg"
            borderRadius={10}
            placeholder="Enter Email"
            placeholderTextColor="white"
            p={4}
            fontFamily="regular"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Input
            variant={"filled"}
            bg="primary.100"
            size="lg"
            borderRadius={10}
            placeholder="Enter Password"
            placeholderTextColor="white"
            px={4}
            fontFamily="regular"
            secureTextEntry={!showPassword}
            InputRightElement={
              <IconButton
                variant={"solid"}
                p={4}
                icon={
                  <Icon
                    as={Feather}
                    name={showPassword ? "eye-off" : "eye"}
                    color={"white"}
                  />
                }
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Pressable
            top={-20}
            _pressed={{
              opacity: 0.3,
            }}
          >
            <Text textAlign={"right"} color="text.500">
              Recover Password
            </Text>
          </Pressable>

          <Button
            py={4}
            borderRadius={10}
            isLoading={authState.isLoginLoading}
            isLoadingText="Logging In..."
            onPress={() =>
              dispatch(LoginMiddleware(email.toLowerCase().trim(), password))
            }
          >
            LOGIN
          </Button>

          <Pressable
            _pressed={{
              opacity: 0.3,
            }}
            alignItems="center"
          >
            <Text textAlign={"right"} color="text.500">
              Not a user yet? <Text color="blue.500">Register Now</Text>
            </Text>
          </Pressable>
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
}
