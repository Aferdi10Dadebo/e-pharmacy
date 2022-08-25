import React from "react";
import { Box, Text, HStack, Input, Icon, IconButton, Image } from "native-base";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FlashList } from "@shopify/flash-list";

// firebase
import { onSnapshot, query, where, updateDoc, doc } from "@firebase/firestore";
import {
  vendorMessagesRef,
  VENDOR_MESSAGES,
  db,
} from "../../../config/firebase-config";

// redux
import { useSelector, useDispatch } from "react-redux"; // firebase
import {
  GetVendorMessages,
  SendMessage,
} from "../../../redux/middleware/VendorMiddleware";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

export default function ChatScreen(props) {
  const dispatch = useDispatch();
  const { sender, image, sender_id, object_key, state_messages } =
    props.route.params;
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = React.useState(state_messages);
  const [chatData, setChatData] = React.useState({
    msg: "",
    sentAt: new Date(),
    sender_id: user.email,
  });
  const scrollViewRef = React.useRef(null);

  //object key refs
  const unreadKey = `${object_key}.unread`;
  const user_key = `${object_key}`;
  const vendor_key = `${user.email.substring(0, user.email.length - 4)}`;

  // update local copy of data
  const GetPageData = React.useCallback(() => {
    dispatch(GetVendorMessages(user.email));
  }, []);

  // listen to realtime updates of messages
  React.useEffect(() => {
    const q = query(
      vendorMessagesRef,
      where(`${object_key}.sender_id`, "==", sender_id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((d) => {
        newMessages.push(...d.data()[object_key].chat);
      });
      setMessages(newMessages);
      GetPageData();

      // update read reciept
      updateDoc(doc(db, VENDOR_MESSAGES, user.email), {
        [`${unreadKey}`]: 0,
      });
    });

    return () => unsubscribe();
  }, []);

  // send message
  const onSendMessage = () => {
    if (!chatData.msg) {
      return;
    }

    dispatch(
      SendMessage(
        user.email,
        sender_id,
        vendor_key,
        user_key,
        user.name,
        user.image,
        chatData
      )
    );

    setChatData({
      ...chatData,
      msg: "",
    });
  };

  return (
    <Box flex={1}>
      <AppHeader
        title={sender}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "android" ? null : "padding"}
          keyboardVerticalOffset={70}
        >
          <FlashList
            data={messages}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            contentContainerStyle={{
              paddingVertical: 15,
            }}
            renderItem={({ item, index }) => (
              <Box mb={4} mx={5}>
                {/* from message */}
                {item?.sender_id !== user?.email && (
                  <HStack w={wp(70)} space={2} alignItems="flex-end">
                    <Image
                      source={{ uri: image }}
                      h={7}
                      w={7}
                      resizeMode="cover"
                      borderRadius={5}
                      alt={sender}
                    />
                    <Box p={3} py={5} bg="white" rounded="md" flex={1}>
                      {item?.msg}
                      <Text fontSize={"2xs"} color="text.500" top={3}>
                        {new Date(item?.sentAt?.seconds * 1000).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </Text>
                    </Box>
                  </HStack>
                )}
                {/* to message */}
                {item?.sender_id === user?.email && (
                  <HStack
                    w={wp(70)}
                    space={2}
                    alignItems="flex-end"
                    alignSelf="flex-end"
                  >
                    <Box px={3} py={5} bg="white" rounded="md" flex={1}>
                      {item?.msg}
                      <Text fontSize={"2xs"} color="text.500" top={3}>
                        {new Date(item?.sentAt?.seconds * 1000).toLocaleString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                        )}
                      </Text>
                    </Box>
                    <Image
                      source={{ uri: user.image }}
                      h={7}
                      w={7}
                      resizeMode="cover"
                      borderRadius={5}
                      alt={sender}
                    />
                  </HStack>
                )}
              </Box>
            )}
          />
          {/* send message */}
          <HStack
            alignItems={"flex-end"}
            space={1}
            safeAreaBottom
            px={2}
            pt={2}
            pb={5}
          >
            <Input
              variant="filled"
              bg="white"
              borderRadius="10"
              size="xl"
              fontFamily="regular"
              placeholder="message"
              placeholderTextColor="text.400"
              flex={9}
              multiline
              maxHeight={hp(40)}
              scrollEnabled={true}
              value={chatData.msg}
              onChangeText={(text) =>
                setChatData({
                  ...chatData,
                  msg: text,
                  sentAt: new Date(),
                })
              }
            />

            <IconButton
              variant="solid"
              bg="primary.500"
              icon={<Icon as={Feather} name="send" />}
              bottom={0.5}
              borderRadius="10"
              onPress={() => onSendMessage()}
            />
          </HStack>
        </KeyboardAvoidingView>
      </Box>
    </Box>
  );
}
