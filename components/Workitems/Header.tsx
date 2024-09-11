import { useRouter } from "next/router"
import { useWorkitem } from "providers/dashboard/WorkitemProvider"
import { CiSearch } from "react-icons/ci"
import Text from "shared/core/ui/Text"
import { CSVLink } from 'react-csv'

const WorkitemsHeader = () => {

    const classes = {
        input: "border border-gray-300 rounded-[4px] pl-8 py-2 focus:outline-none text-sm w-[338px]"
    }
    const { push } = useRouter()
    const { data } = useWorkitem()

    return (
        <div className="flex justify-between border-b border-[#DEDFEA] pb-2">
            <div className="flex flex-col gap-3">
                <Text text="Workitems" size={28} weight="700" />
                <p className="text-sm">{data?.length} in Progress Workitems</p>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <input className={classes.input} placeholder="Search" />
                    <CiSearch className="absolute left-2 top-2" size={20} />
                </div>
                <CSVLink filename="Jdocs-workitems" data={data} className="text-[#0146C5] bg-white rounded-[5px] px-4 py-2 h-fit">Export As</CSVLink>
                <button className="text-white bg-[#0146C5] rounded-[5px] px-4 py-2 h-fit" onClick={() => push("/workitems/interview")}>Start Interview Form</button>
            </div>
        </div>
    )
}

export default WorkitemsHeader