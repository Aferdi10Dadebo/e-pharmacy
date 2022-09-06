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
  USER_MESSAGES,
  db,
} from "../../../config/firebase-config";

// redux
import { useSelector, useDispatch } from "react-redux";

import { SendMessage } from "../../../redux/middleware/UserMiddleware";

//  custom components
import { AppHeader } from "../../../components/AppHeader";

export default function VendorChatSceen(props) {
  const dispatch = useDispatch();
  const { vendor } = props.route.params;
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = React.useState([]);
  const [chatData, setChatData] = React.useState({
    msg: "",
    sentAt: new Date(),
    sender_id: user.email,
  });
  const scrollViewRef = React.useRef(null);
  const [mounted, setMounted] = React.useState(false);

  //   chat parameter
  const vendor_name = vendor.name;
  const vendor_image = vendor.image;
  const sender_id = vendor.email;
  const username = `${user.firstname} ${user.othername}`;

  // object key refs
  const object_key = `${vendor.email
    ?.substring(0, vendor.email.length - 4)
    .replace(/\./g, "")}`;
  const sender_key = `${user?.email
    ?.substring(0, user.email.length - 4)
    .replace(/\./g, "")}`;
  const unreadKey = `${object_key}.unread`;

  // listen to realtime updates of messages
  React.useEffect(() => {
    setMounted(false);
    const unsub = onSnapshot(doc(db, USER_MESSAGES, user.email), (d) => {
      //   console.log("Current data: ", d.data());

      setMessages(d?.data()[object_key]?.chat ?? []);

      if (d.data()?.[object_key]?.name !== undefined) {
        updateDoc(doc(db, USER_MESSAGES, user.email), {
          [`${unreadKey}`]: 0,
        });
      }

      setMounted(true);
    });

    return () => unsub();
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
        object_key,
        sender_key,
        vendor_name,
        vendor_image,
        username,
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
        title={vendor_name}
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
            onContentSizeChange={() => {
              try {
                if (mounted) {
                  scrollViewRef.current.scrollToEnd({ animated: true });
                }
              } catch (error) {
                console.log(error.message);
              }
            }}
            contentContainerStyle={{
              paddingVertical: 15,
            }}
            renderItem={({ item, index }) => (
              <Box mb={4} mx={5}>
                {/* from message */}
                {item?.sender_id !== user?.email && (
                  <HStack w={wp(70)} space={2} alignItems="flex-end">
                    <Image
                      source={{ uri: vendor_image }}
                      h={7}
                      w={7}
                      resizeMode="cover"
                      borderRadius={5}
                      alt={vendor_name}
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
                      alt={vendor_name}
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
