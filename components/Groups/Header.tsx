import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"

const GroupsHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[438px]"
    }

    return (
        <div className="flex justify-between border-b border-[#DEDFEA] pb-2">
            <div className="flex flex-col gap-3">
                <Text text="Work Groups" size={28} weight="700" />
                <p className="text-sm">223 Groups Availables | Updated 43 mins ago</p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <input className={classes.input} placeholder="Search" />
                    <CiSearch className="absolute left-2 top-2" size={20} />
                </div>
            </div>
        </div>
    )
}

export default GroupsHeader