import React from "react";
import { Box, Center, FlatList, HStack, Text } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// firebase
import {
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
  collection,
} from "@firebase/firestore";
import {
  vendorMessagesRef,
  VENDOR_MESSAGES,
  USER_NOTIFICATIONS,
  userNotificationsRef,
  db,
} from "../../../config/firebase-config";
import TimeAgo from "react-native-timeago";

// redux
import { useSelector, useDispatch } from "react-redux";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { OderStatus } from "../../../constants/OderStatus";

export default function NotificationsScreen(props) {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = React.useState([]);

  // listen to realtime updates of messages
  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, USER_NOTIFICATIONS, user.email), (d) => {
      console.log(JSON.stringify(d.data(), null, 2));

      setData(d?.data() ? Object.values(d.data()) : []);
    });

    return () => unsub();
  }, []);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Notifications"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1} p={5}>
        <FlatList
          data={data.sort(
            (a, b) =>
              new Date(b.order_on.seconds * 1000) -
              new Date(a.order_on.seconds * 1000)
          )}
          ListEmptyComponent={() => (
            <Center h={hp(40)}>
              <Text>Your order notifications will be shown here</Text>
            </Center>
          )}
          renderItem={({ item }) => (
            <HStack
              bg={
                item.order_status.toString() === "Pending Approval"
                  ? "yellow.200"
                  : item.order_status === "Approved"
                  ? "green.200"
                  : item.order_status === "Rejected"
                  ? "red.200"
                  : "white"
              }
              p={5}
              rounded="md"
              mb={5}
            >
              <Text>
                Your order for {item.order_name}{" "}
                <TimeAgo time={item.order_on.seconds * 1000} /> is{" "}
                {item.order_status === "Pending Approval"
                  ? "pending approval"
                  : item.order_status === "Approved"
                  ? "approved"
                  : "rejected"}
              </Text>
            </HStack>
          )}
        />
      </Box>
    </Box>
  );
}
