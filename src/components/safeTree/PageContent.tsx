import { useMemo } from "react";

import { useSafeTreeAssets } from "../../services/hooks/safeTree.hook";
import { safetreeSelectedId } from "../../services/recoil/controlAtom";
import ControlHeader from "../common-organisms/ControlHeader";

import { Container } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

/**
 * @type {React.FC}
 * @name PageContent
 * @returns SafeTreeControlPage의 PageContent 컴포넌트
 */
const PageContent = () => {
    /** 선택한 자산의 아이디 */
    const [selectedId, setSelectedId] = useRecoilState(safetreeSelectedId);

    /** 자산 목록 받는 useQuery */
    const { data } = useSafeTreeAssets();

    /**
     * @name handleSelectChange
     * @description select 컴포넌트의 onChange 이벤트 핸들러
     * @param {React.ChangeEvent<HTMLSelectElement>} e 이벤트 객체
     */
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedId(e.target.value);
    };

    /**
     * @name modifiedOptions
     * @description select 컴포넌트의 options
     */
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

export default PageContent;
