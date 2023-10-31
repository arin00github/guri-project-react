import { atom } from "recoil";

export const secureGuardSelectedId = atom<string | undefined>({
    key: "secure-guard-selected-id",
    default: undefined,
});

export const safetreeSelectedId = atom<string | undefined>({
    key: "safe-tree-selected-id",
    default: undefined,
});
