import SafeTreeControlPage from "../pages/safeTree/ControlPage";
import SafeTreeMonitorPage from "../pages/safeTree/MonitorPage";
import SecureGuardControlPage from "../pages/secureGuard/ControlPage";
import SecureGaurdMonitorPage from "../pages/secureGuard/MonitorPage";
import { CONTROL, MONITOR, SAFE_TREE, SECURE_GUARD } from "../utils/constant";

import Root from "./Root";

import { Navigate, createBrowserRouter } from "react-router-dom";

const base_url = import.meta.env.VITE_BASE_URL;

export const pagesArray = [
    {
        path: `/${SECURE_GUARD}/${MONITOR}`,
        element: <SecureGaurdMonitorPage />,
    },
    {
        path: `/${SECURE_GUARD}/${CONTROL}`,
        element: <SecureGuardControlPage />,
    },
    { path: `/${SAFE_TREE}/${MONITOR}`, element: <SafeTreeMonitorPage /> },
    { path: `/${SAFE_TREE}/${CONTROL}`, element: <SafeTreeControlPage /> },
];

const router = createBrowserRouter(
    [
        { element: <Root />, children: pagesArray },
        {
            path: "/",
            element: <Navigate replace to={`/${SECURE_GUARD}/${CONTROL}`} />,
        },
        {
            path: "*",
            element: <Navigate replace to={`/${SECURE_GUARD}/${CONTROL}`} />,
        },
    ],
    { basename: base_url },
);

export default router;
