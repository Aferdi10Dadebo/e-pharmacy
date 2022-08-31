import React from "react";
import {
  Box,
  Text,
  Center,
  Image,
  Icon,
  Stack,
  Button,
  Pressable,
  useToast,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";

//  custom components
import { AppHeader } from "../../components/AppHeader";
import { ToastRender } from "../../components/ToastRender";

// redux
import {
  deactivateVendorError,
  deactivateVendorSuccess,
  resetActionType,
} from "../../redux/slices/AdminReducer";
import {
  DeactivateVendor,
  ActivateVendor,
  GetAllDevices,
} from "../../redux/middleware/AdminMiddleware";

// firebase
import { onSnapshot, query, where, updateDoc, doc } from "@firebase/firestore";
import { usersRef, db } from "../../config/firebase-config";

export default function VendorScreen(props) {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const toast = useToast();

  // get routed params from previous page
  const [routedData, setRoutedData] = React.useState(props?.route.params);

  //   listen to snapshot of data since update is going to be realtime
  React.useEffect(() => {
    const q = query(usersRef, where("email", "==", routedData.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((d) => {
        //   details.push(d.data());
        setRoutedData(d.data());
      });

      dispatch(GetAllDevices());
    });

    return () => unsubscribe();
  }, []);

  const onDeactivateVendor = () => {
    dispatch(DeactivateVendor(routedData.email));
  };

  const onActivateVendor = () => {
    dispatch(ActivateVendor(routedData.email));
  };

  //   side effects
  React.useEffect(() => {
    if (adminState.ACTION_TYPE === deactivateVendorSuccess.toString()) {
      toast.show({
        render: () => (
          <ToastRender success message={adminState.deactivateVendorMessage} />
        ),
        placement: "top",
        duration: 1000,
      });
      dispatch(resetActionType());
    } else if (adminState.ACTION_TYPE === deactivateVendorError.toString()) {
      toast.show({
        render: () => (
          <ToastRender error message={adminState.deactivateVendorMessage} />
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
        title={routedData?.name}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1}>
        <ScrollView>
          <Center my={3}>
            <Image
              alt={"image"}
              source={{ uri: routedData?.image }}
              height={150}
              width={150}
              rounded="full"
            />
          </Center>

          <Stack space={5} mx={3}>
            <ListItems icon="user" value={routedData?.name} />

            <ListItems
              icon="phone"
              value={routedData?.phone}
              // press with linking
              onPress={() => {
                Linking.openURL(`tel:${routedData?.phone}`);
              }}
            />

            <ListItems icon="mail" value={routedData?.email} />

            <ListItems icon="flag" value={routedData?.address} />

            <ListItems
              icon="globe"
              value={routedData?.website}
              // press with linking
              onPress={() => {
                Linking.openURL(routedData?.website);
              }}
            />
          </Stack>
        </ScrollView>
      </Box>
      {/* TODOF: show only if the status is active */}
      <Center safeArea mb={2}>
        <Button
          w="50%"
          colorScheme={routedData.status === "active" ? "danger" : "success"}
          isLoading={adminState.isDeactivateVendorLoading}
          isLoadingText={
            routedData.status === "active"
              ? "Activating ..."
              : "Deactivating ..."
          }
          onPress={() => {
            if (routedData.status === "active") {
              onDeactivateVendor();
            } else {
              onActivateVendor();
            }
          }}
        >
          {routedData.status == "active" ? "DEACTIVATE" : "ACTIVATE"}
        </Button>
      </Center>
    </Box>
  );
}

export const ListItems = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Center
        px={5}
        py={2}
        bg="white"
        // rounded
        borderRadius={5}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Icon
          as={Feather}
          name={props.icon}
          size="lg"
          color="text.400"
          mb={2}
        />

        <Box mb={2}>{props.value}</Box>
      </Center>
    </Pressable>
  );
};
