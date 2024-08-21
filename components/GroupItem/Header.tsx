import { useApp } from "providers/AppProvider"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/router";

const GroupItemHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[338px]"
    }
    const { push } = useRouter()
    const { group } = useApp()

    return (
        <div>
            <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => push('/groups')}>
                <FaArrowLeftLong />
                <p className="text-sm font-medium">Back</p>
            </div>
            <div className="flex justify-between border-b border-[#DEDFEA] pb-2 mt-4">
                <div className="flex flex-col gap-3">
                    <Text text={group?.Name.toUpperCase()} size={28} weight="700" />
                    <p className="text-sm">157 in Progress Workitems | Updated 12 hours ago</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <input className={classes.input} placeholder="Search" />
                        <CiSearch className="absolute left-2 top-2" size={20} />
                    </div>
                    <button className="text-[#0146C5] bg-white rounded-[5px] px-4 py-2 h-fit">Export As</button>
                    <button className="text-white bg-[#0146C5] rounded-[5px] px-4 py-2 h-fit">Start Interview Form</button>
                </div>
            </div>
        </div>
    )
}

export default GroupItemHeader