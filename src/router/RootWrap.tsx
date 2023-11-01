import { appQueryClient } from "../services/setup/query";

import router from "./Router";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

const RootWrap = () => {
    const getCache = appQueryClient.getQueryCache();
    console.log("getCache", getCache);

    return (
        <QueryClientProvider client={appQueryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default RootWrap;
