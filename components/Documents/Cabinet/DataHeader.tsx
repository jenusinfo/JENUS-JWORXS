import { LoadingScreen } from "components/LoadingScreen";
import { useCabinet } from "providers/documents/CabinetProvider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoRefresh } from "react-icons/io5";
import Text from "shared/core/ui/Text";

export default function DocumentDataHeader() {

    const {curPageNumber, setCurPageNumber, totalCount} = useCabinet()

    return (
        <div className="p-3 flex items-center justify-between mt-4 bg-white">
            <IoRefresh />
            <div className="flex items-center gap-2">
                <Text text={`${(curPageNumber - 1) * 50 + 1}-${curPageNumber * 50} of ${totalCount}`} />
                <IoIosArrowBack className="hover:cursor-pointer" onClick={curPageNumber > 1 ? () => setCurPageNumber(curPageNumber - 1) : () => { }} />
                <IoIosArrowForward className="hover:cursor-pointer" onClick={curPageNumber < Math.floor(totalCount/50)+1 ? () => setCurPageNumber(curPageNumber + 1) : () => {}} />
            </div>
        </div>
    )
}