import { ReactNode } from "react";

import { BoxProps, Heading } from "@chakra-ui/react";

interface SubTitleprops {
    children: ReactNode;
}

export const SubTitle = ({ children, ...props }: SubTitleprops & BoxProps) => {
    return (
        <Heading as="h4" size="md" pb={5} {...props}>
            {children}
        </Heading>
    );
};
