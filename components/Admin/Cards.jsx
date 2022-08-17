import {
  Pressable,
  Text,
  View,
  HStack,
  Heading,
  Image,
} from 'native-base'


export const Card = (props) => {

  const {
    title,
    value,
    onPress,
  } = props;

  return (
    <Pressable
      onPress={onPress}
    >
      <HStack
        bg='primary.100'
        borderRadius={10}
        overflow="hidden"
        m={5}
        // alignItems='center'
        space={10}

      >
        <HStack
          p={10}
          alignItems='center'
          space={10}
          flex={1}
        >
          <Heading>
            {value}
          </Heading>

          <Text>
            {title}
          </Text>
        </HStack>



        <Image
          flex={1}
          bg='white'
          source={{
            uri: props.url
          }}
          alt='image'
        />

      </HStack>

    </Pressable>
  )
}
