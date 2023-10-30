import { ComponentMultiStyleConfig } from "@chakra-ui/react";

const CheckBox: ComponentMultiStyleConfig = {
    parts: ["control", "icon", "container", "label"],
    baseStyle: {
        control: {
            padding: "20px",
            borderColor: "red.500",
            bg: "red.500",
        },
    },
    sizes: {
        md: {
            control: {
                padding: "20px",
                borderColor: "red.500",
                bg: "red.500",
            },
        },
    },
};

export { CheckBox };
