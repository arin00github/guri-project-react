import { printStatLabel } from "../../utils/control";

import { Box, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

interface DataStatProps {
    keyString: string;
    valueString: string;
    dvcType?: string;
    statLabel: string;
}

const DataStats = (props: DataStatProps) => {
    const { keyString, valueString, dvcType, statLabel, ...rest } = props;
    return (
        <Stat {...rest}>
            <StatLabel>{statLabel}</StatLabel>
            <StatNumber fontSize="16px">
                {keyString !== "colr" ? (
                    printStatLabel(keyString, valueString, dvcType)
                ) : (
                    <Box w={6} h={6} border={"solid 1px"} style={{ backgroundColor: `#${valueString}` }} />
                )}
            </StatNumber>
        </Stat>
    );
};

export default DataStats;
