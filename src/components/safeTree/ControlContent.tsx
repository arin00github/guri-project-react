import { useMemo } from "react";

import { useSafeTreeAssets } from "../../services/hooks/safeTree.hook";
import { safetreeSelectedId } from "../../services/recoil/controlAtom";
import ControlHeader from "../common-organisms/ControlHeader";

import { Container } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

const ControlContent = () => {
    const [selectedId, setSelectedId] = useRecoilState(safetreeSelectedId);

    const { data } = useSafeTreeAssets();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(e.target.value);
    };

    const modifiedOptions = useMemo(() => {
        if (data) {
            return data.map(dt => {
                const assetId = dt.properties.id as string;
                return { label: dt.properties.show_label as string, value: assetId.split(".")[1] };
            });
        } else {
            return [];
        }
    }, [data]);

    return (
        <Container>
            <ControlHeader
                selectedId={selectedId}
                handleSelectChange={handleSelectChange}
                selectOptions={modifiedOptions}
            />
        </Container>
    );
};

export default ControlContent;
