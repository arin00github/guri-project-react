export function editData(
  assetName: string,
  uid: string,
  mode: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
) {
  return {
    ...data,
    response: {
      ...data.response,
      name: assetName,
      uid: uid,
      auto_ctrl_yn: mode === "auto",
    },
  };
}
