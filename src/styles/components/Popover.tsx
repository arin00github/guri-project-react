import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const Popover: ComponentMultiStyleConfig = {
    parts: ["body", "content"],
    baseStyle: {
        content: {
            bg: "innodep.800",
            borderRadius: "0px",
            borderColor: "innodep.300",
        },
    },
};
