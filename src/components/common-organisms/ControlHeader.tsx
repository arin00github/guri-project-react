import { LabelType } from "../../interfaces/common.interface";
import { SubTitle } from "../common-atoms/SubTitle";

import { Box, Select } from "@chakra-ui/react";

interface ControlHeaderProps {
    selectedId?: string;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectOptions: LabelType[];
}

const ControlHeader = (props: ControlHeaderProps) => {
    const { selectedId, handleSelectChange, selectOptions } = props;

    return (
        <Box pb={10} pt={3}>
            <SubTitle data-testid="control-header-1">방범초소 선택</SubTitle>
            <Select w={230} data-testid="control-header-select" onChange={handleSelectChange} value={selectedId}>
                {selectOptions.map((place, idx) => (
                    <option
                        value={place.value}
                        label={place.label}
                        key={place.value}
                        data-testid={`option_${idx}`}
                    ></option>
                ))}
            </Select>
        </Box>
    );
};
export default ControlHeader;
