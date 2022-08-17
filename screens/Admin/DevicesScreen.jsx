import React from "react";
import {
  Box,
  Text,
  Center,
  Button,
  Icon,
  Input,
  TextArea,
  HStack,
  IconButton,
  Image,
  Badge,
  Pressable,
  Stack,
  Fab,
  useDisclose,
  Actionsheet,
  Tag,
  useToast,
} from "native-base";
import { FlashList } from "@shopify/flash-list";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

//  custom components
import { AppHeader } from "../../components/AppHeader";

// redux
import { useDispatch, useSelector } from "react-redux";

export default function DevicesScreen(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [open, setOpen] = React.useState(false);
  const { devices } = useSelector((state) => state.admin);
  const [filterText, setFilterText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // filter data and sort by date created
  const filteredData = devices.filter((item) => {
    return (
      item?.deviceName?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.role?.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const onSendNotification = () => {
    if (!title || !body) {
      toast.show({
        description: "Please fill all fields",
        placement: "top",
      });
      return;
    }
    setLoading(true);
    // send an axios post request for each item in filtered data
    filteredData.forEach((item) => {
      axios
        .post(
          "https://exp.host/--/api/v2/push/send",
          {
            to: item.deviceExpoPushToken,
            title: title,
            body: body,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Host: "exp.host",
            },
          }
        )
        .then((res) => {
          //   check for error response
          if (res.data.data.status === "error") {
            toast.show({
              title: "Error sending notification",
              description: res.data.data.message,
              placement: "top",
            });
            setLoading(false);
            setOpen(false);
            setTitle("");
            setBody("");
          } else {
            toast.show({
              title: "Notification sent",
              description: "",
              placement: "top",
            });
            setLoading(false);
            setOpen(false);
            setTitle("");
            setBody("");
            setFilterText("");
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.show({
            description: err.message,
            placement: "top",
          });
          setLoading(false);
        });
    });
  };

  return (
    <Box flex={1}>
      <AppHeader
        title={"Devices"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      {/* search part */}
      <Center>
        {devices && devices.length > 0 ? (
          <HStack p={5} space="3">
            <Input
              placeholder="Search for a devices"
              width="80%"
              variant={"rounded"}
              borderColor="primary.400"
              fontFamily={"regular"}
              InputRightElement={<Icon as={Feather} name="search" mr="5" />}
              value={filterText}
              onChangeText={(text) => setFilterText(text)}
            />

            <IconButton
              icon={<Icon as={Feather} name="sliders" />}
              onPress={onOpen}
            />
          </HStack>
        ) : null}
      </Center>

      <Box flex={1}>
        <FlashList
          data={filteredData}
          estimatedItemSize={100}
          ListEmptyComponent={() => {
            return (
              <Center h={hp(70)}>
                <Text color="text.400" mb={5} fontSize="lg">
                  No downloads yet
                </Text>
              </Center>
            );
          }}
          renderItem={({ item }) => (
            <Center
              mx={2}
              my={2}
              bg="white"
              py={5}
              alignItems="center"
              borderRadius="5"
            >
              <Icon as={Feather} name="smartphone" size="3xl" />
              <Text my={2}>{item.deviceName}</Text>
              <Text mb={2}>{item?.role ?? "no role assigned"}</Text>
              <Text color="text.400">{item?.deviceExpoPushToken}</Text>
            </Center>
          )}
        />
      </Box>

      {/* action sheet  for filter*/}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Text>Sort devices by</Text>
          <Actionsheet.Item
            onPress={() => {
              setFilterText("user");
              onClose();
            }}
          >
            users
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setFilterText("vendor");
              onClose();
            }}
          >
            vendors
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      {/* action sheet for sending notifications */}
      <Actionsheet
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Actionsheet.Content>
          <HStack flexWrap={"wrap"} space={5} p={3} w="100%">
            {filteredData.map((item, index) => {
              return (
                <Box
                  key={index}
                  borderRadius={10}
                  bg="primary.300"
                  mb={2}
                  _text={{
                    fontSize: "xs",
                    px: 2,
                    py: 1,
                    color: "white",
                  }}
                >
                  {item.deviceName}
                </Box>
              );
            })}
          </HStack>

          <Input
            mt={10}
            placeholder="Enter Title"
            width="95%"
            borderColor={"primary.400"}
            fontFamily="regular"
            size="lg"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <TextArea
            my={10}
            placeholder="Enter Body"
            width="95%"
            borderColor={"primary.400"}
            fontFamily="regular"
            size="lg"
            value={body}
            onChangeText={(text) => setBody(text)}
          />

          <Button
            width="95%"
            onPress={() => {
              onSendNotification();
            }}
            isLoading={loading}
            isLoadingText="Sending..."
          >
            SEND MESSAGE
          </Button>
        </Actionsheet.Content>
      </Actionsheet>

      <Fab
        renderInPortal={false}
        icon={<Icon as={Feather} name="send" />}
        mb={3}
        mr={3}
        placement="bottom-right"
        onPress={() => {
          setOpen(true);
        }}
      />
    </Box>
  );
}
