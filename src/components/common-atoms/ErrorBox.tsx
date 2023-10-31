import { Flex, Text } from "@chakra-ui/react";

const ErrorBox = () => {
    return (
        <Flex w="100%" h="calc(100vh - 360px)" justify="center" alignItems="center" flexDirection="column">
            <Text textAlign="center">Error Message</Text>
        </Flex>
    );
};
export default ErrorBox;
