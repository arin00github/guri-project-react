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
      <Flex>
        <ButtonGroup>
          {constMenus.map((menu) => {
            return (
              <Button key={menu.id} onClick={() => handleClickMneu(menu.url)}>
                {menu.label}
              </Button>
            );
          })}
        </ButtonGroup>
        <Box>
          <Outlet />
        </Box>
      </Flex>
    </Container>
  );
};

export default Root;
