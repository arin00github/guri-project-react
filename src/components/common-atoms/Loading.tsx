import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loading = () => {
    return (
        <Flex w="100%" h="calc(100vh - 360px)" justify="center" alignItems="center" flexDirection="column">
            <Spinner size="xl" />
            <Text textAlign="center">Loading</Text>
        </Flex>
    );
};

export default Loading;
