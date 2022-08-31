import React from "react";
import {
  Box,
  HStack,
  Center,
  Stack,
  Text,
  Button,
  useToast,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { CustomInput } from "../../../components/Customs/Input";
import { ToastRender } from "../../../components/ToastRender";

// redux
import {
  createProductSuccess,
  createProductError,
  resetActionType,
} from "../../../redux/slices/VendorReducer";
import {
  CreateProduct,
  GetVendorProducts,
} from "../../../redux/middleware/VendorMiddleware";

export default function AddProductScreen(props) {
  const dispatch = useDispatch();
  const vendorState = useSelector((state) => state.vendor);
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [isOnSale, setIsOnSale] = React.useState(false);
  const [isInStock, setIsInStock] = React.useState(true);
  const [qty, setQty] = React.useState("");
  const [image, setImage] = React.useState("");
  const [qtyUnit, setQtyUnit] = React.useState("");
  const [salePrice, setSalePrice] = React.useState("");
  const [dosage, setDosage] = React.useState("");

  const toast = useToast();

  // create product handler
  const onCreateProduct = () => {
    if ((!name, !price, !qty, !qtyUnit)) {
      toast.show({
        render: () => (
          <ToastRender warn title="Please fill in all required fields" />
        ),
        placement: "top",
      });
      return;
    }

    dispatch(
      CreateProduct(user.email, {
        image: image,
        name: name,
        id:
          name.toLowerCase().replace(/\s/g, "") +
          (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000),
        description: description,
        dosage: dosage,
        price: price,
        isOnSale: isOnSale,
        isInStock: isInStock,
        qty: qty,
        qtyUnit: qtyUnit,
        salePrice: salePrice,
        productOrderCount: 0,
        updatedAt: new Date(),
      })
    );
  };

  // clear inputs
  const clearInputs = () => {
    setName("");
    setImage("");
    setDescription("");
    setPrice("");
    setQty("");
    setQtyUnit("");
    setSalePrice("");
  };

  // side effects handle
  React.useEffect(() => {
    if (vendorState.ACTION_TYPE === createProductSuccess.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            success
            title={vendorState.addProductMessage}
            message="Added product successfully"
          />
        ),
        placement: "top",
      });
      clearInputs();
      dispatch(GetVendorProducts(user.email));
      dispatch(resetActionType());
    } else if (vendorState.ACTION_TYPE === createProductError.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            error
            title="OPPS!"
            message={vendorState.addProductMessage}
          />
        ),
      });
    }
  }, [vendorState.ACTION_TYPE]);

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
              isRequired
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <CustomInput
              label="Price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />

            <CustomInput
              label="Description"
              placeholder={description}
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
            />

            <CustomInput
              label="Dosage"
              placeholder={dosage}
              value={dosage}
              onChangeText={(text) => setDosage(text)}
              multiline
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
                  isRequired
                  label="Quantity"
                  value={qty}
                  onChangeText={(text) => setQty(text)}
                />

                <CustomInput
                  isRequired
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
        <Button
          isLoading={vendorState.isAddProductLoading}
          isLoadingText="CREATING ..."
          onPress={() => onCreateProduct()}
        >
          CREATE PRODUCT
        </Button>
      </Center>
    </Box>
  );
}
