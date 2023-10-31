import { ControlType } from "../../interfaces/control.interface";
import {
    daySelectArray,
    oprtModeOptions,
    oprtOptions,
    timeOptions,
    timeSelectArray,
    windStrOptions,
} from "../../utils/constant";
import { checkArrayOption } from "../../utils/control";

import { Flex, Input, Select, Switch, Text } from "@chakra-ui/react";

interface ControlFormItemProps {
    control: ControlType;
    modeState: number;
    dvcType?: string;
    handleChageModeAndInitiate: (value: number) => void;
    handleChangeValue(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        key: string,
        value?: number,
        type?: string,
    ): void;
}

const ControlFormItem = (props: ControlFormItemProps) => {
    const { control, modeState, dvcType, handleChageModeAndInitiate, handleChangeValue } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (control.type === "switch") {
            if (control.key === "auto") {
                handleChageModeAndInitiate(control.value as number);
            } else {
                handleChangeValue(e, control.key, control.value as number, control.type);
            }
        } else {
            handleChangeValue(e, control.key);
        }
    };

    if (control.type === "switch" && control.key === "auto") {
        return (
            <Flex alignItems={"center"}>
                <Switch
                    pt={1}
                    data-testid={`switch-${control.key}`}
                    isChecked={control.value === 1}
                    onChange={handleChange}
                />
                <Text pl={2} fontSize={"14px"} fontWeight={"bold"}>
                    {modeState === 1 ? "자동" : "수동"}
                </Text>
            </Flex>
        );
    }
    if (control.type === "switch" && control.key !== "auto") {
        return (
            <Switch
                pt={1}
                data-testid={`switch-${control.key}`}
                disabled={modeState === 1}
                isChecked={control.value === 1}
                onChange={handleChange}
            />
        );
    }
    if (control.type === "select" && control.key === "windSts") {
        return (
            <Select
                key="select-windSts"
                data-testid="select-windSts"
                disabled={modeState === 1}
                value={control.value as string}
                onChange={handleChange}
            >
                {windStrOptions.map(time => (
                    <option value={time.value} key={`${time.value}-select-windSts`}>
                        {time.label}
                    </option>
                ))}
            </Select>
        );
    }
    if (control.type === "select" && control.key === "oprtMode") {
        return (
            <Select
                key="select-oprtMode"
                data-testid="select-oprtMode"
                disabled={modeState === 1}
                value={control.value as string}
                onChange={handleChange}
            >
                {dvcType === "dvcATDR"
                    ? oprtModeOptions.map(opt => (
                          <option value={opt.value} key={`${opt.value}-select-oprtMode`}>
                              {opt.label}
                          </option>
                      ))
                    : oprtOptions.map(time => (
                          <option value={time.value} key={`${time.value}-select-oprtMode`}>
                              {time.label}
                          </option>
                      ))}
            </Select>
        );
    }

    if (control.type === "select" && checkArrayOption(timeSelectArray, control.key)) {
        return (
            <Select
                key={`select-${control.key}`}
                data-testid={`select-${control.key}`}
                value={control.value as string}
                disabled={modeState !== 1}
                onChange={handleChange}
            >
                {timeOptions.map(time => (
                    <option value={time.value} key={`${time.value}-select-${control.key}`}>
                        {time.label}
                    </option>
                ))}
            </Select>
        );
    }

    if (control.type === "calendar" && checkArrayOption(daySelectArray, control.key)) {
        return (
            <Input
                type="date"
                data-testid={`calendar-${control.key}`}
                disabled={modeState !== 1}
                value={control.value as string}
                onChange={handleChange}
            />
        );
    }
    if (control.type === "input" && dvcType !== "dvcFDLD") {
        return (
            <Input
                type="number"
                data-testid={`input-${control.key}`}
                disabled={control.key !== "autoTemp" && modeState === 1}
                value={control.value as number}
                onChange={handleChange}
            />
        );
    }
    if (control.type === "input" && dvcType === "dvcFDLD") {
        return (
            <Input
                type="number"
                data-testid={`input-${control.key}`}
                disabled={modeState === 1}
                value={control.value as number}
                onChange={handleChange}
            />
        );
    }
    if (!control.type) {
        return <Text>{`${control.value}`}</Text>;
    }
    return <></>;
};

export default ControlFormItem;
