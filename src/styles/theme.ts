import { colors } from "./colors";
import { components } from "./components";
import { styles } from "./global";

import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const baseTheme = extendTheme({ config, colors, styles, components });

export { baseTheme };
