import React from "react";
import { HStack, Text, useTheme, StatusBar, IconButton, Icon } from "native-base";
import { Feather } from '@expo/vector-icons'

export const AppHeader = (props) => {
    const {
        hasBackButton = false,
        onBackPress,
        toggleDrawer
    } = props;
    const theme = useTheme();

    return (
        <React.Fragment>
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.colors.primary[500]}
            />
            <HStack
                bg={"primary.500"}
                px={5}
                py={2}
                safeAreaTop
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <HStack
                    alignItems={"center"}
                >
                    {/* show a back button if i want an appheader to have a back button */}
                    {hasBackButton && (
                        <IconButton
                            variant="ghost"
                            icon={<Icon size="lg" as={Feather} name="chevron-left" color="white" />}
                            onPress={onBackPress}
                        />
                    )}


                    <Text fontSize={"lg"} color="text.100">
                        {props.title}
                    </Text>
                </HStack>

                <IconButton
                    variant="ghost"
                    icon={<Icon size="lg" as={Feather} name="menu" color="white" />}
                    onPress={toggleDrawer}
                />
            </HStack>
        </React.Fragment>
    );
};
