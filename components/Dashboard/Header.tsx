import Text from "shared/core/ui/Text"

const DashboardHeader = () => {
    return (
        <div className="flex flex-col gap-3 border-b border-[#DEDFEA] pb-2">
            <Text text="Dashboard" size={28} weight="700" />
            <p className="text-sm">261 in Progress Workitems | 12 Applications</p>
        </div>
    )
}

export default DashboardHeader