import { Container } from "@chakra-ui/react";

interface PanelProps {
    direction: "right" | "left";
    children?: React.ReactNode;
}

const Panel = (props: PanelProps) => {
    const { children, direction } = props;
    return (
        <Container
            pos="absolute"
            zIndex={100}
            top={0}
            left={direction === "left" ? 0 : "auto"}
            right={direction === "right" ? 0 : "auto"}
            w={`300px`}
            bg="gray.800"
            h="100%"
        >
            {children}
        </Container>
    );
};

export default Panel;
