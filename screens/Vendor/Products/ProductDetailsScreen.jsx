import React from "react";
import {
  Box,
  HStack,
  Image,
  Center,
  Stack,
  Text,
  Button,
  FormControl,
  Input,
  TextArea,
} from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { CustomInput, CustomTextArea } from "../../../components/Customs/Input";

export default function ProductDetailsScreen(props) {
  const product = props.route.params;

  const [name, setName] = React.useState(product?.name ?? "Provide Name");
  const [description, setDescription] = React.useState(
    product?.description ?? "Provide Description"
  );
  const [price, setPrice] = React.useState(product?.price ?? "Provide Price");
  const [isOnSale, setIsOnSale] = React.useState(product?.isOnSale ?? false);
  const [isInStock, setIsInStock] = React.useState(product?.isInStock ?? false);
  const [qty, setQty] = React.useState(product?.qty ?? "Provide Quantity");
  const [image, setImage] = React.useState(
    product?.image ?? "Provide Image URL"
  );
  const [qtyUnit, setQtyUnit] = React.useState(
    product?.qtyUnit ?? "Provide Quantity Unit"
  );
  const [unitPrice, setUnitPrice] = React.useState(
    product?.unitPrice ?? "Provide Unit Price"
  );
  const [salePrice, setSalePrice] = React.useState(
    product?.salePrice ?? "Provide Sale Price"
  );

  return (
    <Box flex={1}>
      <AppHeader
        title={product?.name}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Box flex={1}>
        <KeyboardAwareScrollView>
          <Image
            source={{ uri: product?.image }}
            height={hp(30)}
            alt={product?.name}
          />

          <Stack p={5} space={5}>
            <CustomInput
              label="Image"
              placeholder={image}
              value={image}
              onChangeText={(text) => setImage(text)}
            />

            <CustomInput
              label="Name"
              placeholder={name}
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <CustomInput
              label="Price"
              placeholder={unitPrice}
              value={unitPrice}
              onChangeText={(text) => setUnitPrice(text)}
            />

            <CustomInput
              label="Unit Price"
              placeholder={price}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />

            <CustomTextArea
              label="Description"
              placeholder={description}
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
                  placeholder={salePrice}
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
                  placeholder={qty}
                  value={qty}
                  onChangeText={(text) => setQty(text)}
                />

                <CustomInput
                  label="Quantity Unit"
                  placeholder={qtyUnit}
                  value={qtyUnit}
                  onChangeText={(text) => setQtyUnit(text)}
                />
              </Stack>
            )}
          </Stack>
        </KeyboardAwareScrollView>

        <Center safeAreaBottom my={2}>
          <Button>EDIT PRODUCT</Button>
        </Center>
      </Box>
    </Box>
  );
}
