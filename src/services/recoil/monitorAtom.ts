import { atom } from "recoil";

export const monitorSelectedId = atom<string | undefined>({
    key: "monitor-selected-id",
    default: undefined,
});
