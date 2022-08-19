import React from 'react'
import {
  Box,
  Text,
  Center,
  Button,
  Icon,
  Input,
  HStack,
  IconButton,
  Image,
  Badge,
  Pressable,
  Stack,
  Fab,
} from 'native-base'
import { FlashList } from '@shopify/flash-list'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'

//  custom components
import { AppHeader } from '../../components/AppHeader'

// redux
import { useDispatch, useSelector } from 'react-redux'

export default function VendorScreen(props) {
  const { vendors } = useSelector((state) => state.admin)

  const [filterText, setFilterText] = React.useState('')

  // filter data and sort by date created
  const filteredData = vendors
    .filter((item) => {
      return item?.name?.toLowerCase().includes(filterText.toLowerCase())
    })
    .sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })

  return (
    <Box flex={1}>
      <AppHeader
        title={'Vendors'}
        toggleDrawer={() => props.navigation.openDrawer()}
        hasBackButton
        onBackPress={() => {
          props.navigation.goBack()
        }}
      />
      {/* search part */}
      <Center>
        {vendors && vendors?.length > 0 ? (
          <Center p={5} space="3">
            <Input
              placeholder="Search for a vendor"
              width="80%"
              variant={'rounded'}
              borderColor="primary.400"
              fontFamily={'regular'}
              InputRightElement={<Icon as={Feather} name="search" mr="5" />}
              onChangeText={(text) => setFilterText(text)}
            />
          </Center>
        ) : null}
      </Center>

      {/* vendors list */}
      <Box flex={1}>
        <FlashList
          data={filteredData}
          estimatedItemSize={100}
          ListEmptyComponent={() => {
            return (
              <Center h={hp(70)}>
                <Text color="text.400" mb={5} fontSize="lg">
                  No vendors found
                </Text>
                <Button
                  leftIcon={<Icon as={Feather} name="plus" />}
                  onPress={() => {
                    props.navigation.navigate('AddVendorScreen')
                  }}
                >
                  ADD NEW VENDOR
                </Button>
              </Center>
            )
          }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  props.navigation.navigate({
                    name: 'VendorScreen',
                    params: {
                      ...item,
                    },
                  })
                }}
              >
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  bg="white"
                  p={5}
                  borderRadius={10}
                  m={2}
                  space={5}
                >
                  <Image
                    alt={index.toString()}
                    source={{ uri: item.image }}
                    style={{ width: hp(7), height: hp(7) }}
                    rounded="full"
                    mb={2}
                  />

                  <Stack flex={7} space={2}>
                    <Text fontSize="xs" color="text.400">
                      {item?.created_at.toDate().toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                      })}
                    </Text>

                    <Text>{item.name}</Text>
                    <Text>{item.phone}</Text>
                  </Stack>
                  <Badge
                    bg="success.500"
                    variant="subtle"
                    _text={{
                      color: 'white',
                      fontSize: 'xs',
                    }}
                  >
                    {item.status}
                  </Badge>
                </HStack>
              </Pressable>
            )
          }}
        />

        <Fab
          renderInPortal={false}
          icon={<Icon as={Feather} name="plus" />}
          mb={3}
          mr={3}
          placement="bottom-right"
          onPress={() => {
            props.navigation.navigate('AddVendorScreen')
          }}
        />
      </Box>
    </Box>
  )
}
