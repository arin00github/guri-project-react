import { AssetItem } from "../../interfaces/monitor.interface";
import MonitorListBox from "../common-molecules/MonitorListBox";

import { Flex } from "@chakra-ui/react";

interface MonitorListProps {
    assetList: AssetItem[];
    handleClickListBox: (item: AssetItem) => void;
}

const MonitorList = (props: MonitorListProps) => {
    const { assetList, handleClickListBox } = props;
    console.log("assetList MonitorList", assetList);
    return (
        <Flex flexDir={"column"}>
            <Flex flexDir={"column"}>
                {assetList.map(asset => {
                    return <MonitorListBox assetItem={asset} handleClick={() => handleClickListBox(asset)} />;
                })}
            </Flex>
        </Flex>
    );
};

export default MonitorList;
