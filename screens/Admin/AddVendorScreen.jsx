import React from 'react';
import { Box, Text, Stack, FormControl, Input, useToast, Center, Button } from 'native-base';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//  custom components
import { AppHeader } from '../../components/AppHeader';


export default function AddVendorScreen(props) {
    const toast = useToast();

    const [data, setData] = React.useState({})


    // handler to submit forms 
    const onSubmit = (data) => {
        //TODO: validation rules and if it passes validation call create vendor middleware
        if (!data.name || !data.phone || !data.email) {
            toast.show({
                description: "Please fill all required fields",
                placement: 'top'
            })
            return;
        } else if (data.email
            && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            toast.show({
                description: "Please enter a valid email",
                placement: 'top'
            })
            return;
        }


        alert('create vendor')

    }


    console.log(data)

    // side effects of form submission
    React.useEffect(() => { }, [])


    return (
        <Box flex={1} >
            <AppHeader
                title={"Add New Vendor"}
                toggleDrawer={() => props.navigation.openDrawer()}
                hasBackButton
                onBackPress={() => {
                    props.navigation.goBack()
                }}
            />

            <Box flex={1}>
                <KeyboardAwareScrollView>

                    <Stack space={5} m={5}>
                        <FormControl isRequired>
                            <FormControl.Label>
                                Name
                            </FormControl.Label>
                            <Input
                                borderColor={'primary.400'}
                                placeholder="Enter Name"
                                fontFamily='regular'
                                value={data.name}
                                onChangeText={(text) => setData({ ...data, name: text })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>
                                Phone
                            </FormControl.Label>
                            <Input
                                borderColor={'primary.400'}
                                placeholder="Enter Phone"
                                fontFamily='regular'
                                value={data.phone}
                                onChangeText={(text) => setData({ ...data, phone: text })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>
                                Email
                            </FormControl.Label>
                            <Input
                                borderColor={'primary.400'}
                                placeholder="Enter Email"
                                fontFamily='regular'
                                value={data.email}
                                onChangeText={(text) => setData({ ...data, email: text })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>
                                Address
                            </FormControl.Label>
                            <Input
                                borderColor={'primary.400'}
                                placeholder="Enter Address"
                                fontFamily='regular'
                                value={data.address}
                                onChangeText={(text) => setData({ ...data, address: text })}
                            />
                        </FormControl>

                        <FormControl >
                            <FormControl.Label>
                                Website
                            </FormControl.Label>
                            <Input
                                borderColor={'primary.400'}
                                placeholder="Enter Phone"
                                fontFamily='regular'
                                value={data.website}
                                onChangeText={(text) => setData({ ...data, website: text })}
                            />
                        </FormControl>


                    </Stack>

                </KeyboardAwareScrollView>
            </Box>


            <Center safeArea mb={3}>
                <Button
                    onPress={() => onSubmit(data)}
                >
                    CREATE NEW VENDOR
                </Button>
            </Center>

        </Box>
    )
}