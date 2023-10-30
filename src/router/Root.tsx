import { constMenus } from "./RouterMenu";

import { Box, Button, ButtonGroup, Container, Flex } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const Root = () => {
    const navigate = useNavigate();

    const handleClickMneu = (url: string) => {
        navigate(url);
    };

    return (
        <Container>
            <Flex w="100%" flexDir={"column"}>
                <Box h="50px">
                    <ButtonGroup>
                        {constMenus.map(menu => {
                            return (
                                <Button key={menu.id} onClick={() => handleClickMneu(menu.url)}>
                                    {menu.label}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </Box>
                <Box>
                    <Outlet />
                </Box>
            </Flex>
        </Container>
    );
};

export default Root;
