import { constMenus } from "./RouterMenu";

import { Box, Button, ButtonGroup, Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <Container>
      <Flex>
        <ButtonGroup>
          {constMenus.map((menu) => {
            return <Button key={menu.id}>{menu.label}</Button>;
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
