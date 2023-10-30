export const SAFE_TREE = "safe-tree";
export const SECURITY_GUARD = "security-guard";
export const CONTROL = "control";
export const MONITOR = "monitor";

export type RouteType = {
  id: string;
  url: string;
  label: string;
};

export const constMenus: RouteType[] = [
  {
    id: "security-guard-monitor",
    url: `/${SECURITY_GUARD}/${MONITOR}`,
    label: "Security Guard Monitor",
  },
  {
    id: "security-guard-control",
    url: `/${SECURITY_GUARD}/${CONTROL}`,
    label: "Security Guard Control",
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
