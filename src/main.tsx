import React from "react";

import RootWrap from "./router/RootWrap";
import { baseTheme } from "./styles/theme";

import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

async function deferRender() {
    if (process.env.NODE_ENV !== "development") {
        return;
    }
    const { worker } = await import("./mock/browser");
    return worker.start();
}

deferRender().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <RecoilRoot>
                <ChakraProvider theme={baseTheme}>
                    <RootWrap />
                </ChakraProvider>
            </RecoilRoot>
        </React.StrictMode>,
    );
});
