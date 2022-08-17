import React from 'react';
import { Box, Text, Center, Image, Icon, Stack, Button, Pressable } from 'native-base';
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native';
import { Linking } from 'react-native';

//  custom components
import { AppHeader } from '../../components/AppHeader';


export default function VendorScreen(props) {

    // get routed params from previous page
    const routedData = props?.route.params;

    console.log({ routedData })


    return (
        <Box flex={1} >
            <AppHeader
                title={routedData?.name}
                toggleDrawer={() => props.navigation.openDrawer()}
                hasBackButton
                onBackPress={() => {
                    props.navigation.goBack()
                }}
            />

            <Box flex={1}>
                <ScrollView>
                    <Center my={3}>
                        <Image
                            alt={'image'}
                            source={{ uri: routedData?.image }}
                            height={150}
                            width={150}
                            rounded='full'
                        />
                    </Center>


                    <Stack space={5} mx={3}>
                        <ListItems
                            icon='user'
                            value={routedData.name}
                        />

                        <ListItems
                            icon='phone'
                            value={routedData.phone}
                            // press with linking
                            onPress={() => {
                                Linking.openURL(`tel:${routedData.phone}`)
                            }}
                        />

                        <ListItems
                            icon='mail'
                            value={routedData.email}
                        />

                        <ListItems
                            icon='flag'
                            value={routedData.address}
                        />


                        <ListItems
                            icon='globe'
                            value={routedData.website}
                            // press with linking
                            onPress={() => {
                                Linking.openURL(routedData.website)
                            }}
                        />




                    </Stack>



                </ScrollView>

            </Box>
            {/* TODOF: show only if the status is active */}
            <Center safeArea mb={2}>
                <Button w='50%'>
                    DEACTIVATE
                </Button>
            </Center>

        </Box>
    )
}



export const ListItems = (props) => {
    return (
        <Pressable
            onPress={props.onPress}
        >
            <Center
                px={5}
                py={2}
                bg='white'
                // rounded
                borderRadius={5}
                alignItems='center'
                justifyContent={'space-between'}
            >
                <Icon
                    as={Feather}
                    name={props.icon}
                    size='lg'
                    color='text.400'
                    mb={2}
                />

                <Box mb={2}>
                    {props.value}
                </Box>
            </Center>
        </Pressable>
    )
}