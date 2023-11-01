import { ComponentMultiStyleConfig } from "@chakra-ui/react";

const Switch: ComponentMultiStyleConfig = {
    parts: ["container", "thumb", "track"],
    baseStyle: {
        track: {
            _checked: {
                bg: "blue.500",
            },
        },
    },
};

export { Switch };
