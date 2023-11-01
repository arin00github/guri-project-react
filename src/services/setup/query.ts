/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryCache, QueryClient } from "@tanstack/react-query";

export const appQueryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            console.log("query error", error, query);
        },
        onSuccess: (data, query) => {
            if (query.queryKey[0] === "smart-secure-guard-assets") {
                console.log("query success", data, query.queryKey);
            }
            console.log(data, query.queryKey);
        },
    }),
});

interface createQueryClientParams {
    onError: (error: any, query: any) => void;
    onSuccess: (data: any, query: any) => void;
}

export const createQueryClient = ({ onError, onSuccess }: createQueryClientParams) => {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                console.log("query error", error, query);
                onError(error, query);
            },
            onSuccess: (data, query) => {
                if (query.queryKey[0] === "smart-secure-guard-assets") {
                    console.log("query success", data, query.queryKey);
                }
                console.log(data, query.queryKey);
                onSuccess(data, query);
            },
        }),
    });
};
