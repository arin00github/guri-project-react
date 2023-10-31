import { atom } from "recoil";

export const securityGuardSelectedId = atom<string | undefined>({
    key: "security-guard-selected-id",
    default: undefined,
});

export const safetreeSelectedId = atom<string | undefined>({
    key: "safe-tree-selected-id",
    default: undefined,
});
