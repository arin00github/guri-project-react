import { AssetItem } from "../../interfaces/monitor.interface";

import { Box, Flex, Text } from "@chakra-ui/react";

interface MonitorListBoxProps {
    assetItem: AssetItem;
    handleClick: () => void;
}

const MonitorListBox = (props: MonitorListBoxProps) => {
    const { assetItem, handleClick } = props;

    return (
        <Flex onClick={handleClick} w="100%" p={4} cursor={"pointer"} _hover={{ bg: "blue.500" }}>
            <Box w="36px" h="36px" borderRadius={"50%"} bg={"gray.500"}></Box>
            <Box flexBasis={"calc(100% - 42px)"} ml="6px">
                <Text fontWeight={700}>{assetItem.show_label}</Text>
                <Text fontSize={13} color={`gray.400`}>
                    LAYER NAME : {assetItem.asset_id}
                </Text>
            </Box>
        </Flex>
    );
};

export default MonitorListBox;
