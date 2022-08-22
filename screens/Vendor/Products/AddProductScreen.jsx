import React from "react";
import { Box, HStack, Image, Center, Stack, Text, Button } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { CustomInput, CustomTextArea } from "../../../components/Customs/Input";

export default function AddProductScreen(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [isOnSale, setIsOnSale] = React.useState(false);
  const [isInStock, setIsInStock] = React.useState(true);
  const [qty, setQty] = React.useState("");
  const [image, setImage] = React.useState("");
  const [qtyUnit, setQtyUnit] = React.useState("");
  const [unitPrice, setUnitPrice] = React.useState("");
  const [salePrice, setSalePrice] = React.useState("");

  return (
    <Box flex={1}>
      <AppHeader
        title={"Add New Product"}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1}>
        <KeyboardAwareScrollView>
          <Stack p={5} space={5}>
            <CustomInput
              label="Image"
              placeholder={image}
              value={image}
              onChangeText={(text) => setImage(text)}
            />

            <CustomInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <CustomInput
              label="Price"
              value={unitPrice}
              onChangeText={(text) => setUnitPrice(text)}
            />

            <CustomInput
              label="Unit Price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />

            <CustomTextArea
              label="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <HStack alignItems={"center"} space={5}>
              <Text color="text.500">On Sale</Text>

              <Button
                colorScheme={isOnSale ? "green" : "red"}
                onPress={() => setIsOnSale(!isOnSale)}
                size="sm"
              >
                {isOnSale ? "Yes" : "No"}
              </Button>
            </HStack>

            {isOnSale && (
              <Stack space={5}>
                <CustomInput
                  label="Sale Price"
                  value={salePrice}
                  onChangeText={(text) => setSalePrice(text)}
                />
              </Stack>
            )}

            <HStack alignItems={"center"} space={5}>
              <Text color="text.500">In Stock</Text>

              <Button
                colorScheme={isInStock ? "green" : "red"}
                onPress={() => setIsInStock(!isInStock)}
                size="sm"
              >
                {isInStock ? "Yes" : "No"}
              </Button>
            </HStack>

            {isInStock && (
              <Stack space={5}>
                <CustomInput
                  label="Quantity"
                  value={qty}
                  onChangeText={(text) => setQty(text)}
                />

                <CustomInput
                  label="Quantity Unit"
                  value={qtyUnit}
                  onChangeText={(text) => setQtyUnit(text)}
                />
              </Stack>
            )}
          </Stack>
        </KeyboardAwareScrollView>
      </Box>

      <Center safeAreaBottom my={2}>
        <Button>CREATE PRODUCT</Button>
      </Center>
    </Box>
  );
}
