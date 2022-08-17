import React from 'react'
import { Box, Center, Heading, HStack, Text, Button, Image } from 'native-base'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import young from '../../assets/young.png'

export default function IntroScreen(props) {
    return (
        <Box flex={1} safeArea my={5}>
            <Center bg="primary.400" borderRadius={50} h={hp(55)} mx={5}>
                <Image source={young} height={hp(55)} width={hp(55)} alt="young" />
            </Center>

            <Box my={10} px={5} flex={1}>
                <Heading textAlign={'center'} mb={5} color="text.600">
                    E-PHARMACY APP
                </Heading>

                <Text textAlign={'center'} color="text.500">
                    Your one stop shop for all your medical needs.
                </Text>
            </Box>

            <Center safeArea>
                <HStack>
                    <Button
                        borderRightRadius={0}
                        w="30%"
                        variant={'outline'}
                        borderColor="primary.500"
                    >
                        REGISTER
                    </Button>
                    <Button borderLeftRadius={0} w="30%">
                        LOGIN
                    </Button>
                </HStack>
            </Center>
        </Box>
    )
}
