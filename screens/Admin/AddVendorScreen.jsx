import React from "react";
import {
  Box,
  Text,
  Stack,
  FormControl,
  Input,
  useToast,
  Center,
  Button,
  IconButton,
  Icon,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

//  custom components
import { AppHeader } from "../../components/AppHeader";
import { ToastRender } from "../../components/ToastRender";

// redux
import {
  createVendorSuccess,
  createVendorError,
  resetActionType,
} from "../../redux/slices/AdminReducer";
import {
  CreateVendor,
  GetAllVendors,
} from "../../redux/middleware/AdminMiddleware";

export default function AddVendorScreen(props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);

  const [data, setData] = React.useState({});

  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);

  // handler to submit forms
  const onSubmit = () => {
    //TODO: validation rules and if it passes validation call create vendor middleware
    if (!data.name || !data.phone || !data.email) {
      toast.show({
        description: "Please fill all required fields",
        placement: "top",
        duration: 1000,
      });
      return;
    } else if (
      data.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
    ) {
      toast.show({
        description: "Please enter a valid email",
        placement: "top",
        duration: 1000,
      });
      return;
    } else if (data.password !== data.confirmPassword) {
      toast.show({
        description: "Passwords do not match",
        placement: "top",
        duration: 1000,
      });
    }

    dispatch(CreateVendor(data));
  };

  // side effects of form submission
  React.useEffect(() => {
    if (adminState.ACTION_TYPE === createVendorSuccess?.toString()) {
      toast.show({
        render: () => (
          <ToastRender success title="Vendor created successfully" />
        ),
        placement: "top",
        duration: 1000,
      });
      setData({});
      dispatch(GetAllVendors());
      dispatch(resetActionType());
    } else if (adminState.ACTION_TYPE === createVendorError?.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            error
            title="OOPS!"
            message={adminState.createVendorMessage}
          />
        ),
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    }
  }, [adminState.ACTION_TYPE]);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Add New Vendor"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1}>
        <KeyboardAwareScrollView>
          <Stack space={5} m={5}>
            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Enter Name"
                fontFamily="regular"
                value={data.name}
                onChangeText={(text) => setData({ ...data, name: text })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Phone</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Enter Phone"
                fontFamily="regular"
                value={data.phone}
                onChangeText={(text) => setData({ ...data, phone: text })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Enter Email"
                fontFamily="regular"
                value={data.email}
                onChangeText={(text) =>
                  setData({ ...data, email: text.toLowerCase().trim() })
                }
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Address</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Enter Address"
                fontFamily="regular"
                value={data.address}
                onChangeText={(text) => setData({ ...data, address: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Website</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Enter Phone"
                fontFamily="regular"
                value={data.website}
                onChangeText={(text) => setData({ ...data, website: text })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Enter new password"
                fontFamily="regular"
                value={data.password}
                onChangeText={(text) => setData({ ...data, password: text })}
                secureTextEntry={showPassword}
                InputRightElement={
                  <IconButton
                    onPress={() => setShowPassword(!showPassword)}
                    icon={
                      <Icon
                        as={Feather}
                        name={showPassword ? "eye-off" : "eye"}
                      />
                    }
                  />
                }
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                borderColor={"primary.400"}
                placeholder="Confirm Password"
                fontFamily="regular"
                value={data.confirmPassword}
                onChangeText={(text) =>
                  setData({ ...data, confirmPassword: text })
                }
                secureTextEntry={showConfirmPassword}
                InputRightElement={
                  <IconButton
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={
                      <Icon
                        as={Feather}
                        name={showPassword ? "eye-off" : "eye"}
                      />
                    }
                  />
                }
              />
            </FormControl>
          </Stack>
        </KeyboardAwareScrollView>
      </Box>

      <Center safeArea mb={3}>
        <Button
          isLoading={adminState.isCreateVendorLoading}
          isLoadingText="CREATING..."
          onPress={() => onSubmit()}
        >
          CREATE NEW VENDOR
        </Button>
      </Center>
    </Box>
  );
}
