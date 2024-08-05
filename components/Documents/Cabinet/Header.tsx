import { useRouter } from "next/router";
import Text from "shared/core/ui/Text";
import { convertToTitleCase } from "shared/helper/common";
import { LuSearch } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";

export function DocumentCabinetHeader() {

    const { title } = useRouter().query

    return (
        <div className="flex justify-between">
            <Text text={convertToTitleCase(String(title))} size={16} weight="700" />
            <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 border border-blue-200 rounded-[4px] px-3.5 py-2.5 w-[234px]">
                    <Text text="Filter: Select Filter" size={14} />
                    <FaChevronDown size={12} />
                </div>
                <div className="border border-blue-200 rounded-[4px] px-3.5 py-2.5 w-[212px]">
                    <Text text="Search Value" size={14} />
                </div>
                <div className=""></div>
                <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-3.5 py-2.5 h-fit text-sm">+</button>
                <button className="text-white bg-[#2454de] rounded-[4px] px-3.5 py-2.5 h-fit text-sm"><LuSearch size={18} /></button>
                <button className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit text-sm">Export As</button>
                <button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit text-sm">New Document+</button>
            </div>
        </div>
    )
}