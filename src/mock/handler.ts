import SFAssetList from "../data/assetListSF.json";
import SGAssetList from "../data/assetListSG.json";
import { editData } from "../data/dataTransfer";
import safeTreeData from "../data/safeTreeData.json";
import securityGuardData from "../data/securityGuardData.json";
import { ControlDeviceType, SafeTreeDetailParams, SecurityGuardDetailParams } from "../interfaces/control.interface";
import { ASSET_API_URL, SAFE_TREE_API_URL, SECURE_GUARD_API_URL } from "../utils/constant";

import { http, HttpResponse } from "msw";

export const handlers = [
    http.post(SECURE_GUARD_API_URL.DetailInfo_Test, async ({ request }) => {
        const reqObject = (await request.json()) as SecurityGuardDetailParams;

        const editedData = editData(`방범초소${reqObject.uid.slice(0, 3)}`, reqObject.uid, "auto", securityGuardData);
        return HttpResponse.json(editedData);
    }),
    http.post(SECURE_GUARD_API_URL.ControlChange_Test, async ({ request }) => {
        const reqObject = (await request.json()) as ControlDeviceType;
        if (!reqObject) {
            return HttpResponse.error();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { device_id, ...rest } = reqObject as ControlDeviceType;
            return HttpResponse.json({
                response: rest,
                code: 200,
                message: "success",
                responseTime: "2021-08-31T09:00:00.000Z",
            });
        }
    }),
    http.post(SAFE_TREE_API_URL.DetailInfo_Test, async ({ request }) => {
        const reqObject = (await request.json()) as SafeTreeDetailParams;
        const editedData = editData(`스마트트리${reqObject.uid.slice(0, 3)}`, reqObject.uid, "auto", safeTreeData);
        return HttpResponse.json(editedData);
    }),
    http.post(SAFE_TREE_API_URL.ControlChange_Test, async ({ request }) => {
        const reqObject = (await request.json()) as ControlDeviceType;
        if (!reqObject) {
            return HttpResponse.error();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { device_id, ...rest } = reqObject as ControlDeviceType;
            return HttpResponse.json({
                response: rest,
                code: 200,
                message: "success",
                responseTime: "2021-08-31T09:00:00.000Z",
            });
        }
    }),
    http.post(ASSET_API_URL.AssetInfo_Test, async ({ request }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const reqObject = (await request.json()) as any;
        const typeName = reqObject.layerId;
        if (typeName === "safe-tree") {
            return HttpResponse.json([{ features: SFAssetList }]);
        } else {
            return HttpResponse.json([{ features: SGAssetList }]);
        }
    }),
];
