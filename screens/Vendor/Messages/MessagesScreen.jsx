import React from "react";
import {
  Box,
  Center,
  Text,
  HStack,
  Image,
  Pressable,
  Badge,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { RefreshControl } from "react-native";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

// redux
import { useDispatch, useSelector } from "react-redux";
import { GetVendorMessages } from "../../../redux/middleware/VendorMiddleware";

// firebase
import { onSnapshot, query, where, updateDoc, doc } from "@firebase/firestore";
import {
  vendorMessagesRef,
  VENDOR_MESSAGES,
  db,
} from "../../../config/firebase-config";

export default function MessagesScreen(props) {
  const dispatch = useDispatch();
  const { vendorMessages } = useSelector((state) => state.vendor);
  const { user } = useSelector((state) => state.auth);

  const [messages, setMessages] = React.useState(vendorMessages);

  // update local copy of data
  const GetPageData = React.useCallback(() => {
    dispatch(GetVendorMessages(user.email));
  }, []);

  // get realtime changes to messages
  React.useEffect(() => {
    const q = query(vendorMessagesRef);

    const unsubscribe = onSnapshot(
      doc(db, VENDOR_MESSAGES, user.email),
      (d) => {
        // console.log(JSON.stringify(d.data(), null, 2))
        setMessages(d.data());
        GetPageData();
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Box flex={1}>
      <AppHeader
        title={"Messages"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1}>
        <FlashList
          data={messages ? Object.keys(messages) : []}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={GetPageData} />
          }
          ListEmptyComponent={() => {
            return (
              <Center h={hp(50)}>
                <Text>No messages to show</Text>
              </Center>
            );
          }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                props.navigation.navigate({
                  name: "ChatScreen",
                  params: {
                    state_messages: vendorMessages[item]?.chat,
                    sender: vendorMessages[item]?.name,
                    image: vendorMessages[item]?.image,
                    /*
                     *   I used the sender user's email as an object key
                     *   however objects use dot for reference so i strip
                     *   the dot com part of the email for the object key.
                     *   same is done when creating the senders first sent message
                     */
                    object_key: vendorMessages[item]?.sender_id
                      .substring(0, vendorMessages[item]?.sender_id.length - 4)
                      .replace(/\./g, ""),
                    sender_id: vendorMessages[item]?.sender_id,
                  },
                });
              }}
            >
              <HStack
                p={5}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                mt={2}
                mx={2}
                rounded="md"
              >
                <HStack space={4} alignItems="center">
                  <Image
                    source={{ uri: vendorMessages[item]?.image }}
                    alt={vendorMessages[item]?.name}
                    h={hp(7)}
                    w={hp(7)}
                    borderRadius={1000}
                    bg="white"
                  />

                  <Text>{vendorMessages[item]?.name}</Text>
                </HStack>

                <Box>
                  {!!vendorMessages[item]?.unread > 0 && (
                    <Badge
                      borderRadius={1000}
                      bg={"primary.500"}
                      _text={{ color: "white" }}
                    >
                      {"new msg"}
                    </Badge>
                  )}
                </Box>
              </HStack>
            </Pressable>
          )}
        />
      </Box>
    </Box>
  );
}
