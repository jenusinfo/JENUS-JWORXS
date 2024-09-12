import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import GroupsModal from "./Modal"
import { useState } from "react"
import { useGroups } from "providers/settings/GroupsProvider"
import { CSVLink } from 'react-csv'

const GroupsHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[338px]"
    }
    const { setCurIndex, setInfo, groups: data, search, setSearch } = useGroups()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex justify-between border-b border-[#DEDFEA] pb-2">
            <div className="flex flex-col gap-3">
                <Text text="Groups" size={28} weight="700" />
                <p className="text-sm">{data?.filter((each: any) => each.IsActive == true).length} Active groups</p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <input className={classes.input} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <CiSearch className="absolute left-2 top-2" size={20} />
                </div>
                <CSVLink filename="Jdocs-groups" data={data} className="text-[#2454de] bg-[#eef0fe] rounded-[4px] px-6 py-2.5 h-fit hover:bg-blue-100 transition-all duration-400">Export As</CSVLink>
				<button className="text-white bg-[#2454de] rounded-[4px] px-5 py-2.5 h-fit hover:bg-blue-600 transition-all duration-400" onClick={() => {setIsOpen(true); setInfo({}); setCurIndex(-1);}}>Create New+</button>
            </div>
            <GroupsModal isOpen={isOpen} handleClose={() => setIsOpen(false)} />
        </div>
    )
}

export default GroupsHeader