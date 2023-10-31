import { CONTROL, MONITOR, SAFE_TREE, SECURE_GUARD } from "../utils/constant";

export type RouteType = {
    id: string;
    url: string;
    label: string;
};

export const constMenus: RouteType[] = [
    {
        id: "secure-guard-monitor",
        url: `/${SECURE_GUARD}/${MONITOR}`,
        label: "Secure Guard Monitor",
    },
    {
        id: "secure-guard-control",
        url: `/${SECURE_GUARD}/${CONTROL}`,
        label: "Secure Guard Control",
    },
    {
        id: "safe-tree-monitor",
        url: `/${SAFE_TREE}/${MONITOR}`,
        label: "SafeTree Monitor",
    },
    {
        id: "safe-tree-control",
        url: `/${SAFE_TREE}/${CONTROL}`,
        label: "SafeTree Control",
    },
];

//export const RouteMenu = ()
