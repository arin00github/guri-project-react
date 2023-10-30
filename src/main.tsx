import React from "react";

import router from "./router/Router";
import { baseTheme } from "./styles/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={baseTheme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
