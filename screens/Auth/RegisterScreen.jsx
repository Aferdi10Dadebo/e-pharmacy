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
import {
  SignupMiddleware,
  LoginMiddleware,
} from "../../redux/middleware/AppAuthenticationMiddleware";

import {
  signupSuccess,
  signupError,
  loginError,
  loginSuccess,
  resetActionType,
} from "../../redux/slices/AuthenticationReducer";

// custom
import { ToastRender } from "../../components/ToastRender";
import { CustomInput } from "../../components/Customs/Input";

export default function RegisterScreen(props) {
  const dispatch = useDispatch();
  const toast = useToast();
  const authState = useSelector((state) => state.auth);
  const [firstname, setFirstname] = React.useState("");
  const [othername, setOthername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

  // register sideeffects
  React.useEffect(() => {
    if (authState.ACTION_TYPE === signupSuccess.toString()) {
      toast.show({
        render: () => (
          <ToastRender success message="Account Created Successful" />
        ),
        placement: "top",
        duration: 1000,
      });
      dispatch(LoginMiddleware(email.toLowerCase().trim(), password));
      dispatch(resetActionType());
    } else if (authState.ACTION_TYPE === signupError.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            error
            title="Login Failed"
            message={authState.signupMessage}
          />
        ),
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    } else if (authState.ACTION_TYPE === loginSuccess.toString()) {
      toast.show({
        render: () => <ToastRender success message="Login Successful" />,
        placement: "top",
        duration: 1000,
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
        duration: 1000,
      });
      dispatch(resetActionType());
    }
  }, [authState.ACTION_TYPE]);

  return (
    <Box flex={1} safeArea p={5}>
      <KeyboardAwareScrollView>
        <Center>
          <Text
            fontSize={"4xl"}
            textAlign={"center"}
            fontFamily="medium"
            mb={2}
          >
            Welcome!
          </Text>
          <Text textAlign="center" color={"text.500"}>
            Create a new account and get started
          </Text>
        </Center>

        <Stack mt={10} mx={5} space={5}>
          <CustomInput
            label="First Name"
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
          />

          <CustomInput
            label="Other Names"
            value={othername}
            onChangeText={(text) => setOthername(text)}
          />

          <CustomInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase().trim())}
          />

          <CustomInput
            label="Phone"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={showPassword}
            InputRightElement={
              <IconButton
                variant={"solid"}
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
          />

          <CustomInput
            label="Other Names"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={showConfirmPassword}
            InputRightElement={
              <IconButton
                variant={"solid"}
                icon={
                  <Icon
                    as={Feather}
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    color={"white"}
                  />
                }
                onPress={() => setShowConfirmPassword(!showPassword)}
              />
            }
          />

          <Button
            mt={5}
            borderRadius={10}
            isLoading={authState.isSignupLoading}
            isLoadingText="Signing Up..."
            onPress={() => {
              // dispatch(LoginMiddleware(email.toLowerCase().trim(), password));
              if ((!firstname, !email, !phone)) {
                toast.show({
                  description: "please fill all required fields",
                  placement: "top",
                  duration: 1000,
                });
                return;
              } else if (
                email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
              ) {
                toast.show({
                  description: "Please enter a valid email",
                  placement: "top",
                });
                return;
              } else if (password !== confirmPassword) {
                toast.show({
                  description: "Passwords do not match",
                  placement: "top",
                });
                return;
              }

              dispatch(
                SignupMiddleware({
                  firstname,
                  othername,
                  email,
                  phone,
                  confirmPassword,
                })
              );
            }}
          >
            SIGN UP
          </Button>

          <Pressable
            _pressed={{
              opacity: 0.3,
            }}
            alignItems="center"
            onPress={() => {
              props.navigation.navigate("LoginScreen");
            }}
          >
            <Text textAlign={"right"} color="text.500">
              Already have an account? <Text color="blue.500">Login</Text>
            </Text>
          </Pressable>
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
}
