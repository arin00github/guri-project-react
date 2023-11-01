import { ComponentMultiStyleConfig, ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentMultiStyleConfig = {
    parts: ["field", "addon", "element"],
    baseStyle: {
        field: {
            border: "1px solid",
            borderRadius: "2px",
        },
    },

    sizes: {
        md: {
            field: {
                borderRadius: "none",
                h: "30px",
                lineHeight: "30px",
            },
        },
    },
    variants: {
        outline: {
            field: {
                border: "1px solid",
                borderRadius: "none",
                borderColor: "whiteAlpha.500",
            },
        },
    },
};

export const InputGroup: ComponentStyleConfig = {
    baseStyle: {
        border: "1px solid",
        borderRadius: "none",
        color: "blue",
        borderColor: "red",
    },

    sizes: {
        md: {
            h: 28,
            lineHeight: 28,
        },
    },
};
