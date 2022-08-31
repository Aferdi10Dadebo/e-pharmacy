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
  useToast,
  Icon,
  useDisclose,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

//  custom components
import { AppHeader } from "../../../components/AppHeader";
import { CustomInput, CustomTextArea } from "../../../components/Customs/Input";
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

export default function ProductDetailsScreen(props) {
  const product = props.route.params;
  const dispatch = useDispatch();
  const vendorState = useSelector((state) => state.vendor);
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclose();

  const [name, setName] = React.useState(product?.name ?? "Provide Name");
  const [description, setDescription] = React.useState(
    product?.description ?? "Provide Description"
  );
  const [dosage, setDosage] = React.useState(
    product?.dosage ?? "Provide Dosage"
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
  const [salePrice, setSalePrice] = React.useState(
    product?.salePrice ?? "Provide Sale Price"
  );

  // edit product handler
  const onEditProduct = () => {
    dispatch(
      CreateProduct(
        user.email,
        {
          image: image,
          name: name,
          id: product.id,
          price: price,
          isOnSale: isOnSale,
          isInStock: isInStock,
          qty: qty,
          qtyUnit: qtyUnit,
          salePrice: salePrice,
          productOrderCount: 0,
          updatedAt: new Date(),
        },
        {
          vendor_name: user.name,
          vendor_id: user.email,
          vendor_phone: user.phone,
          vendor_address: user.address,
        }
      )
    );
  };

  // edit sideEffects
  React.useEffect(() => {
    if (vendorState.ACTION_TYPE === createProductSuccess.toString()) {
      toast.show({
        render: () => (
          <ToastRender
            success
            title={vendorState.addProductMessage}
            message="Product updated successfully"
          />
        ),
        placement: "top",
        duration: 1000,
      });
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
        placement: "top",
        duration: 1000,
      });
    }
  }, [vendorState.ACTION_TYPE]);

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
            bg="white"
            resizeMode="contain"
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
              placeholder={price}
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

        <HStack justifyContent="center" space={5} safeAreaBottom my={2} mx={10}>
          <Button
            // isLoading={vendorState.isAddProductLoading}
            isLoadingText="UPDATING ..."
            // onPress={onEditProduct}
            colorScheme={"danger"}
            leftIcon={<Icon as={Feather} name="trash" />}
            flex={1}
          >
            DELETE
          </Button>

          <Button
            isLoading={vendorState.isAddProductLoading}
            isLoadingText="UPDATING ..."
            onPress={onEditProduct}
            colorScheme={"success"}
            leftIcon={<Icon as={Feather} name="edit" />}
            flex={1}
          >
            EDIT
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
