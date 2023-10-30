import SafeTreeControlPage from "../pages/safeTree/ControlPage";
import SafeTreeMonitorPage from "../pages/safeTree/MonitorPage";
import SecurityGuardControlPage from "../pages/securityGuard/ControlPage";
import SecurityGaurdMonitorPage from "../pages/securityGuard/MonitorPage";

import Root from "./Root";
import { CONTROL, MONITOR, SAFE_TREE, SECURITY_GUARD } from "./RouterMenu";

import { Navigate, createBrowserRouter } from "react-router-dom";

const base_url = import.meta.env.VITE_BASE_URL;

export const pagesArray = [
  {
    path: `/${SECURITY_GUARD}/${MONITOR}`,
    element: <SecurityGaurdMonitorPage />,
  },
  {
    path: `/${SECURITY_GUARD}/${CONTROL}`,
    element: <SecurityGuardControlPage />,
  },
  { path: `/${SAFE_TREE}/${MONITOR}`, element: <SafeTreeMonitorPage /> },
  { path: `/${SAFE_TREE}/${CONTROL}`, element: <SafeTreeControlPage /> },
];

const router = createBrowserRouter(
  [
    { element: <Root />, children: pagesArray },
    {
      path: "/",
      element: <Navigate replace to={`/${SECURITY_GUARD}/${CONTROL}`} />,
    },
    {
      path: "*",
      element: <Navigate replace to={`/${SECURITY_GUARD}/${CONTROL}`} />,
    },
  ],
  { basename: base_url },
);

export default router;
