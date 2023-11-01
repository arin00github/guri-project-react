import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const Select: ComponentMultiStyleConfig = {
    parts: ["field", "icon"],
    baseStyle: {
        field: {
            borderRadius: "2px",
            border: "1px solid",
            backgroudColor: "blue.100",
        },
    },
    sizes: {
        sm: {
            field: {
                borderRadius: "none",
                backgroudColor: "blue.100",
                _disabled: {
                    color: "innodep.500",
                },
            },
        },
        md: {
            field: {
                borderRadius: "none",
                h: 28,
                lineHeight: 28,
                backgroudColor: "blue.100",
                _disabled: {
                    color: "innodep.500",
                },
            },
        },
    },
    variants: {
        filled: {
            field: {
                border: "1px solid",
                borderColor: "whiteAlpha.600",
            },
        },
    },
    defaultProps: {
        size: "sm",
        variant: "filled",
    },
};
