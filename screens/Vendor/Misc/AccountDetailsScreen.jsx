import React from "react";
import {
  Box,
  Text,
  Center,
  Button,
  ScrollView,
  Image,
  Stack,
  useDisclose,
  Actionsheet,
  useToast,
  IconButton,
  Icon,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { CustomInput } from "../../../components/Customs/Input";
import { ToastRender } from "../../../components/ToastRender";

import {
  updateUserSuccess,
  updateUserError,
  updatePasswordSuccess,
  resetActionType,
} from "../../../redux/slices/AuthenticationReducer";

import {
  UpdateUser,
  ChangePassword,
} from "../../../redux/middleware/AppAuthenticationMiddleware";

export default function AccountDetailsScreen(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const authState = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();

  const [data, setData] = React.useState(user);

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [snp, setSnp] = React.useState(true);
  const [sop, setSop] = React.useState(true);
  const [scp, setScp] = React.useState(true);

  // updateUser
  const onUpdate = () => {
    dispatch(UpdateUser(data));
  };

  // change password
  const onChangePassword = () => {
    dispatch(ChangePassword(oldPassword, confirmPassword));
  };

  // sideEffects
  React.useEffect(() => {
    if (authState.ACTION_TYPE === updateUserSuccess.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            success
            title="Success"
            message={authState.updateUserMessage}
          />
        ),
        placement: "top",
        duration: 1000,
      });
      onClose();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(resetActionType());
    } else if (authState.ACTION_TYPE === updatePasswordSuccess.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            success
            title="Success"
            message={authState.updateUserMessage}
          />
        ),
        placement: "top",
        duration: 1000,
      });
      onClose();
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(resetActionType());
    } else if (authState.ACTION_TYPE === updateUserError.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            error
            title="OPPS!"
            message={authState.updateUserMessage}
          />
        ),
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    }
  }, [authState.ACTION_TYPE]);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Account Details"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <ScrollView
        flex={1}
        contentContainerStyle={{ alignItems: "center", paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          rounded="full"
          alt={user.name}
          source={{ uri: user.image }}
          height={hp(15)}
          width={hp(15)}
          bg="red.300"
        />

        <Stack space={5} w="90%">
          <CustomInput
            label="Profile Image Link"
            value={data.image}
            onChangeText={(text) => setData({ ...data, image: text })}
          />

          <CustomInput
            label="Name"
            value={data.name}
            onChangeText={(text) => setData({ ...data, name: text })}
          />

          <CustomInput
            label="Email"
            value={data.email}
            onChangeText={(text) => setData({ ...data, email: text })}
          />

          <CustomInput
            label="Phone Number"
            value={data.phone}
            onChangeText={(text) => setData({ ...data, phone: text })}
          />

          <CustomInput
            label="Address"
            value={data.address}
            onChangeText={(text) => setData({ ...data, address: text })}
          />

          <CustomInput
            label="Website"
            value={data.website}
            onChangeText={(text) => setData({ ...data, website: text })}
          />

          <CustomInput
            label="Password"
            value={"change password"}
            secureTextEntry={true}
            editable={false}
            onChangeText={(text) => setData({ ...data, website: text })}
            InputRightElement={<Button onPress={onOpen}>change</Button>}
          />
        </Stack>
      </ScrollView>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bg="gray.200">
          <Stack w="90%" space={5}>
            <Text>CHANGE PASSWORD</Text>

            <CustomInput
              label="Old Password"
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              secureTextEntry={sop}
              InputRightElement={
                <IconButton
                  onPress={() => setSop(!sop)}
                  icon={<Icon as={Feather} name={sop ? "eye-off" : "eye"} />}
                />
              }
            />

            <CustomInput
              label="New Password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={snp}
              InputRightElement={
                <IconButton
                  onPress={() => setSnp(!snp)}
                  icon={<Icon as={Feather} name={snp ? "eye-off" : "eye"} />}
                />
              }
            />

            <CustomInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={scp}
              InputRightElement={
                <IconButton
                  onPress={() => setScp(!scp)}
                  icon={<Icon as={Feather} name={scp ? "eye-off" : "eye"} />}
                />
              }
            />

            <Button
              my={5}
              onPress={onChangePassword}
              isLoading={authState.isUpdateUserLoading}
              isLoadingText="UPDATING..."
            >
              CHANGE PASSWORD
            </Button>
          </Stack>
        </Actionsheet.Content>
      </Actionsheet>

      <Center safeAreaBottom py={3}>
        <Button
          w="50%"
          onPress={onUpdate}
          isLoading={authState.isUpdateUserLoading}
          isLoadingText="UPDATING..."
        >
          EDIT PROFILE
        </Button>
      </Center>
    </Box>
  );
}
