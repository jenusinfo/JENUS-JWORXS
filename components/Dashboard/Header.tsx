import { useWorkitem } from "providers/dashboard/WorkitemProvider"
import Text from "shared/core/ui/Text"

const DashboardHeader = () => {

    const { data } = useWorkitem()

    return (
        <div className="flex flex-col gap-3 border-b border-[#DEDFEA] pb-2">
            <Text text="Dashboard" size={28} weight="700" />
            <p className="text-sm">{data?.length} in Progress Workitems</p>
        </div>
    )
}

export default DashboardHeader