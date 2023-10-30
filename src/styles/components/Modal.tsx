import { ComponentMultiStyleConfig } from "@chakra-ui/react";

const Modal: ComponentMultiStyleConfig = {
    parts: ["body", "dialog", "overlay", "header", "footer", "closeButton", "dialogContainer"],
    baseStyle: {
        dialog: {
            bg: "innodep.800",
        },
    },

    sizes: {
        md: {
            dialog: {
                bg: "innodep.800",
            },
        },
    },
};

export { Modal };
